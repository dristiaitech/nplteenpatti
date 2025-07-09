import React from 'react'
import { ChevronDown, UserPlus, Crown, User } from 'lucide-react'
import { Player } from '../types/game'

interface PlayerSwitcherProps {
  players: Player[]
  selectedPlayerId: string | null
  onPlayerSelect: (playerId: string) => void
  onAddPlayer: () => void
}

export const PlayerSwitcher: React.FC<PlayerSwitcherProps> = ({
  players,
  selectedPlayerId,
  onPlayerSelect,
  onAddPlayer
}) => {
  const selectedPlayer = players.find(p => p.id === selectedPlayerId)

  return (
    <div className="flex items-center space-x-3">
      {/* Player Selector */}
      <div className="relative">
        <select
          value={selectedPlayerId || ''}
          onChange={(e) => onPlayerSelect(e.target.value)}
          className="appearance-none bg-white/10 backdrop-blur-xl border border-white/20 text-white pl-4 pr-10 py-3 rounded-xl focus:ring-2 focus:ring-amber-400 focus:border-transparent transition-all min-w-[180px] font-medium"
        >
          <option value="" className="bg-gray-800 text-white">Select Player...</option>
          {players.map(player => (
            <option key={player.id} value={player.id} className="bg-gray-800 text-white">
              {player.nickname} {player.isAdmin ? '(Admin)' : ''} - ₹{player.balance}
            </option>
          ))}
        </select>
        <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-white/60 pointer-events-none" />
      </div>

      {/* Selected Player Info */}
      {selectedPlayer && (
        <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-xl border border-white/20 px-4 py-3 rounded-xl">
          <div className={`p-1.5 rounded-full ${selectedPlayer.isAdmin ? 'bg-amber-500' : 'bg-green-500'}`}>
            {selectedPlayer.isAdmin ? (
              <Crown className="w-3 h-3 text-white" />
            ) : (
              <User className="w-3 h-3 text-white" />
            )}
          </div>
          <div className="text-white">
            <div className="font-medium text-sm">{selectedPlayer.nickname}</div>
            <div className="text-xs text-white/70">₹{selectedPlayer.balance}</div>
          </div>
        </div>
      )}

      {/* Add Player Button */}
      {players.length < 5 && (
        <button
          onClick={onAddPlayer}
          className="flex items-center space-x-2 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-4 py-3 rounded-xl font-medium transition-all duration-200 transform hover:scale-105"
        >
          <UserPlus className="w-4 h-4" />
          <span>Add Player</span>
        </button>
      )}
    </div>
  )
}