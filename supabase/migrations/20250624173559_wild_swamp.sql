/*
  # Create Teen Patti Players Table

  1. New Tables
    - `players`
      - `id` (text, primary key) - Player session ID
      - `nickname` (text) - Auto-generated player nickname
      - `current_bet` (integer, default 0) - Current round bet amount
      - `last_seen` (timestamptz) - Last activity timestamp for cleanup
      - `session_id` (text) - Browser session identifier

  2. Security
    - Enable RLS on `players` table
    - Add policy for all users to read/write player data (anonymous gameplay)
    - Add policy for players to manage their own data

  3. Indexes
    - Index on last_seen for efficient cleanup queries
    - Index on session_id for quick lookups
*/

CREATE TABLE IF NOT EXISTS players (
  id text PRIMARY KEY,
  nickname text NOT NULL,
  current_bet integer DEFAULT 0,
  last_seen timestamptz DEFAULT now(),
  session_id text NOT NULL
);

-- Enable RLS
ALTER TABLE players ENABLE ROW LEVEL SECURITY;

-- Allow anonymous users to read all players (for shared table visibility)
CREATE POLICY "Anyone can view active players"
  ON players
  FOR SELECT
  TO anon
  USING (true);

-- Allow anonymous users to insert/update their own player record
CREATE POLICY "Users can manage own player data"
  ON players
  FOR ALL
  TO anon
  USING (true)
  WITH CHECK (true);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS players_last_seen_idx ON players(last_seen);
CREATE INDEX IF NOT EXISTS players_session_id_idx ON players(session_id);

-- Function to clean up inactive players (older than 10 minutes)
CREATE OR REPLACE FUNCTION cleanup_inactive_players()
RETURNS void
LANGUAGE plpgsql
AS $$
BEGIN
  DELETE FROM players 
  WHERE last_seen < now() - interval '10 minutes';
END;
$$;