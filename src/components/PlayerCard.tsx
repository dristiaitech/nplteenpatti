import React from 'react'
import { User, IndianRupee, Crown, X, Zap } from 'lucide-react'
import { Player } from '../types/game'

interface PlayerCardProps {
  player: Player
  onRemovePlayer?: (playerId: string) => void
  showRemoveButton?: boolean
  isCurrentAdmin?: boolean
  isSelected?: boolean
}

export const PlayerCard: React.FC<PlayerCardProps> = ({ 
  player, 
  onRemovePlayer,
  showRemoveButton = false,
  isCurrentAdmin = false,
  isSelected = false
}) => {
  return (
    <div className={`
      relative p-6 rounded-2xl border-2 transition-all duration-300 transform hover:scale-[1.02]
      ${isSelected 
        ? 'bg-gradient-to-r from-blue-500/20 to-purple-500/20 border-blue-400 shadow-lg shadow-blue-500/25' 
        : player.isAdmin 
          ? 'bg-gradient-to-r from-amber-500/20 to-yellow-500/20 border-amber-400/50 shadow-lg shadow-amber-500/25' 
          : 'bg-white/10 backdrop-blur-xl border-white/20 hover:border-white/40 hover:bg-white/15'
      }
    `}>
      {/* Admin Badge */}
      {player.isAdmin && (
        <div className="absolute -top-3 -right-3 bg-gradient-to-r from-amber-400 to-amber-600 text-black text-xs px-3 py-1.5 rounded-full font-bold flex items-center space-x-1 shadow-lg">
          <Crown className="w-3 h-3" />
          <span>ADMIN</span>
        </div>
      )}

      {/* Selected Badge */}
      {isSelected && !player.isAdmin && (
        <div className="absolute -top-3 -right-3 bg-gradient-to-r from-blue-400 to-purple-500 text-white text-xs px-3 py-1.5 rounded-full font-bold flex items-center space-x-1 shadow-lg">
          <Zap className="w-3 h-3" />
          <span>ACTIVE</span>
        </div>
      )}

      {/* Remove Button */}
      {showRemoveButton && !player.isAdmin && onRemovePlayer && isCurrentAdmin && (
        <button
          onClick={() => onRemovePlayer(player.id)}
          className="absolute -top-2 -left-2 bg-red-500 hover:bg-red-600 text-white rounded-full p-2 transition-all duration-200 transform hover:scale-110 shadow-lg"
          title="Remove player"
        >
          <X className="w-3 h-3" />
        </button>
      )}
      
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className={`
            p-3 rounded-2xl shadow-lg
            ${player.isAdmin 
              ? 'bg-gradient-to-r from-amber-400 to-amber-600' 
              : isSelected 
                ? 'bg-gradient-to-r from-blue-500 to-purple-600'
                : 'bg-gradient-to-r from-green-500 to-green-600'
            }
          `}>
            {player.isAdmin ? (
              <Crown className="w-5 h-5 text-white" />
            ) : (
              <User className="w-5 h-5 text-white" />
            )}
          </div>
          <div>
            <h3 className="text-lg font-bold text-white">{player.nickname}</h3>
            <div className="flex items-center space-x-2 text-white/80">
              <IndianRupee className="w-4 h-4" />
              <span className="font-semibold">₹{player.balance}</span>
            </div>
          </div>
        </div>
        
        {/* Current Bet Display */}
        {player.currentBet > 0 && (
          <div className="bg-gradient-to-r from-amber-400 to-amber-600 text-black px-4 py-2 rounded-xl shadow-lg">
            <div className="flex items-center space-x-1">
              <IndianRupee className="w-4 h-4" />
              <span className="font-bold text-lg">{player.currentBet}</span>
            </div>
            <div className="text-xs font-medium opacity-80">Current Bet</div>
          </div>
        )}
      </div>
    </div>
  )
}