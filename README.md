
# nplteenpatti

A modern, real-time multiplayer Teen Patti table built with React, TypeScript, and Tailwind CSS. Play anonymously with friends, manage bets, and enjoy a seamless digital card table experience.

## Features

- **Multiplayer Table:** Up to 5 players per table, with one player as Admin.
- **Admin Controls:** Distribute balances, declare winners, start new rounds, and manage players.
- **Betting System:** Players can place bets of Rs. 5, Rs. 10, or Rs. 20 per round.
- **Session Persistence:** Player and game state are saved in localStorage for seamless reloads.
- **Modern UI:** Beautiful, responsive design using Tailwind CSS and Lucide React icons.
- **Anonymous Play:** No login required; sessions are managed locally.
- **Supabase Integration (optional):** SQL migration for player management and cleanup.

## Project Structure

```
src/
  App.tsx                # Main app logic and routing
  main.tsx               # React root rendering
  index.css              # Tailwind CSS imports
  components/            # UI components (AdminPanel, BettingPanel, GameTable, etc.)
  hooks/                 # Custom React hooks for game logic and state
  types/                 # TypeScript type definitions
supabase/
  migrations/            # SQL for optional Supabase backend
public/
  index.html             # App entry point
```

## Key Components

- **App.tsx:** Orchestrates the game, player switching, and main UI layout.
- **PlayerSetup:** Handles player creation and joining the table.
- **GameTable:** Displays all players, their bets, and the current pot.
- **BettingPanel:** Allows players to place bets and view their balance.
- **AdminPanel:** Special controls for the Admin to manage the game.
- **PlayerSwitcher:** Switch between active players for local multiplayer.

## Custom Hooks

- **useGameSession:** Manages the shared game state, player list, bets, and admin actions.
- **usePlayer:** Handles individual player session, balance, and betting logic.
- **useLocalGame:** (For local-only play) Manages a simplified game state in localStorage.

## Types

Defined in `src/types/game.ts`:
- `Player`, `GameSession`, `PlayerSession`, `GameState` for strong typing across the app.

## Styling

- **Tailwind CSS:** Utility-first styling for rapid, responsive UI.
- **Lucide React:** Icon set for a modern, playful look.

## Supabase Integration

- SQL migration in `supabase/migrations/` for optional backend player management, including RLS policies and cleanup functions.

## Getting Started

1. **Install dependencies:**
   ```sh
   npm install
   ```
2. **Start the development server:**
   ```sh
   npm run dev
   ```
3. **Open in browser:**  
   Visit [http://localhost:5173](http://localhost:5173)

## Usage

- The first player joins as Admin and distributes Rs. 1000 to all players.
- Players join, select their names, and place bets.
- Admin declares the winner and distributes the pot.
- Start new rounds, add/remove players, and repeat!

## Scripts

- `npm run dev` – Start development server
- `npm run build` – Build for production
- `npm run preview` – Preview production build
- `npm run lint` – Lint code with ESLint

## Contributing

We welcome contributions from everyone! To keep the project stable and organized, we use the following branching strategy:

- **main**: Production-ready code only. This branch is always deployable.
- **dev**: Active development branch. All new features and bug fixes are merged here after initial testing.
- **test**: All external or experimental contributions go here first. Used for integration, code review, and initial testing of PRs from contributors.

### How to Contribute

1. **Fork** this repository and clone it to your machine.
2. **Create a new branch** from `test` for your feature or fix:
   ```sh
   git checkout test
   git checkout -b feature/your-feature-name
   ```
3. **Make your changes** and commit them with clear messages.
4. **Push** your branch to your fork and open a **pull request** to the `test` branch.
5. Your changes will be reviewed and tested. If accepted, they will be merged into `dev` for further integration, and finally into `main` for deployment.

#### Tips
- Keep pull requests focused and descriptive.
- Write clear commit messages.
- If you are unsure, open a draft PR or ask a question in the issues.

Thank you for helping improve this project!
