import React from 'react'
import { Users, Trophy, Sparkles } from 'lucide-react'
import { Player } from '../types/game'
import { PlayerCard } from './PlayerCard'

interface GameTableProps {
  players: Player[]
  totalPot: number
  maxPlayers: number
  onRemovePlayer?: (playerId: string) => void
  currentAdmin?: Player | null
  selectedPlayerId?: string | null
}

export const GameTable: React.FC<GameTableProps> = ({
  players,
  totalPot,
  maxPlayers,
  onRemovePlayer,
  currentAdmin,
  selectedPlayerId
}) => {
  return (
    <div className="bg-black/30 backdrop-blur-xl rounded-3xl p-8 border border-white/20 shadow-2xl">
      {/* Table Header */}
      <div className="text-center mb-8">
        <div className="flex items-center justify-center space-x-3 mb-4">
          <div className="bg-gradient-to-r from-amber-400 to-amber-600 p-3 rounded-2xl">
            <Sparkles className="w-8 h-8 text-black" />
          </div>
          <div>
            <h2 className="text-3xl font-bold text-white">Game Table</h2>
            <p className="text-white/70">
              {players.length}/{maxPlayers} players joined
            </p>
          </div>
        </div>

        {/* Pot Display */}
        {totalPot > 0 && (
          <div className="bg-gradient-to-r from-amber-500/20 to-yellow-500/20 backdrop-blur-xl rounded-2xl p-6 border border-amber-400/30">
            <div className="flex items-center justify-center space-x-3 mb-2">
              <Trophy className="w-8 h-8 text-amber-400" />
              <h3 className="text-xl font-semibold text-white">Current Pot</h3>
            </div>
            <div className="text-4xl font-bold text-amber-400">₹{totalPot}</div>
            <p className="text-amber-200 text-sm mt-1">Winner takes all!</p>
          </div>
        )}
      </div>

      {/* Players Grid */}
      <div className="space-y-4">
        {players.length === 0 ? (
          <div className="text-center py-12">
            <div className="bg-white/10 rounded-full p-6 w-24 h-24 mx-auto mb-6 flex items-center justify-center">
              <Users className="w-12 h-12 text-white/60" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">No Players Yet</h3>
            <p className="text-white/70">Add players to start the game!</p>
          </div>
        ) : (
          <>
            {players.map((player) => (
              <PlayerCard
                key={player.id}
                player={player}
                onRemovePlayer={onRemovePlayer}
                showRemoveButton={true}
                isCurrentAdmin={!!currentAdmin}
                isSelected={selectedPlayerId === player.id}
              />
            ))}
            
            {/* Empty slots */}
            {Array.from({ length: maxPlayers - players.length }).map((_, index) => (
              <div
                key={`empty-${index}`}
                className="p-6 rounded-2xl border-2 border-dashed border-white/20 bg-white/5 hover:bg-white/10 transition-all duration-200"
              >
                <div className="text-center text-white/50">
                  <div className="bg-white/10 rounded-full p-3 w-12 h-12 mx-auto mb-3 flex items-center justify-center">
                    <Users className="w-6 h-6" />
                  </div>
                  <p className="text-sm font-medium">Empty Slot</p>
                  <p className="text-xs text-white/30 mt-1">Waiting for player...</p>
                </div>
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  )
}