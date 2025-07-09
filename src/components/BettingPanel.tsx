import React from 'react'
import { IndianRupee, Zap, TrendingUp } from 'lucide-react'
import { Player } from '../types/game'

interface BettingPanelProps {
  currentPlayer: Player | null
  totalPot: number
  onPlaceBet: (amount: number) => Promise<boolean>
  playerCount: number
  maxPlayers: number
}

export const BettingPanel: React.FC<BettingPanelProps> = ({
  currentPlayer,
  totalPot,
  onPlaceBet,
  playerCount,
  maxPlayers
}) => {
  const betAmounts = [
    { amount: 5, color: 'from-green-500 to-green-600', hoverColor: 'from-green-600 to-green-700' },
    { amount: 10, color: 'from-blue-500 to-blue-600', hoverColor: 'from-blue-600 to-blue-700' },
    { amount: 20, color: 'from-purple-500 to-purple-600', hoverColor: 'from-purple-600 to-purple-700' }
  ]

  const handleBet = async (amount: number) => {
    if (!currentPlayer || currentPlayer.balance < amount) return
    await onPlaceBet(amount)
  }

  if (!currentPlayer) return null

  return (
    <div className="space-y-6">
      {/* Player Info Card */}
      <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/20 shadow-xl">
        <div className="flex items-center space-x-3 mb-4">
          <div className={`p-3 rounded-2xl ${currentPlayer.isAdmin ? 'bg-gradient-to-r from-amber-400 to-amber-600' : 'bg-gradient-to-r from-blue-500 to-purple-600'}`}>
            <Zap className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">
              {currentPlayer.nickname}
            </h2>
            {currentPlayer.isAdmin && (
              <span className="bg-amber-400/20 text-amber-200 px-2 py-1 rounded-full text-xs font-medium border border-amber-400/30">
                Game Admin
              </span>
            )}
          </div>
        </div>
        
        <div className="bg-black/20 rounded-xl p-4 mb-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white/70 text-sm">Available Balance</p>
              <div className="flex items-center space-x-2 text-3xl font-bold text-white">
                <IndianRupee className="w-8 h-8 text-green-400" />
                <span>{currentPlayer.balance}</span>
              </div>
            </div>
            {currentPlayer.currentBet > 0 && (
              <div className="text-right">
                <p className="text-amber-200 text-sm">Current Bet</p>
                <div className="flex items-center space-x-1 text-xl font-bold text-amber-400">
                  <IndianRupee className="w-5 h-5" />
                  <span>{currentPlayer.currentBet}</span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Betting Buttons */}
        <div className="space-y-3">
          <h3 className="font-semibold text-white mb-3 flex items-center space-x-2">
            <TrendingUp className="w-5 h-5 text-green-400" />
            <span>Place Your Bet</span>
          </h3>
          
          <div className="grid grid-cols-1 gap-3">
            {betAmounts.map(({ amount, color, hoverColor }) => (
              <button
                key={amount}
                onClick={() => handleBet(amount)}
                disabled={currentPlayer.balance < amount}
                className={`
                  flex items-center justify-center space-x-3 py-4 px-6 rounded-xl font-bold text-lg transition-all duration-200 transform hover:scale-105 shadow-lg
                  ${currentPlayer.balance >= amount
                    ? `bg-gradient-to-r ${color} hover:${hoverColor} text-white hover:shadow-xl`
                    : 'bg-gray-600/50 text-gray-400 cursor-not-allowed hover:scale-100'
                  }
                `}
              >
                <IndianRupee className="w-5 h-5" />
                <span>{amount}</span>
                <div className="text-sm opacity-80">
                  {amount === 5 ? 'Small' : amount === 10 ? 'Medium' : 'Big'}
                </div>
              </button>
            ))}
          </div>
          
          <div className="text-xs text-white/50 text-center mt-4 bg-black/20 rounded-lg p-3">
            💡 Choose your bet amount wisely • Higher bets = bigger wins!
          </div>
        </div>
      </div>

      {/* Game Stats */}
      <div className="bg-gradient-to-br from-black/30 to-black/20 backdrop-blur-xl rounded-2xl p-6 border border-white/20">
        <h4 className="font-semibold text-white mb-4 flex items-center space-x-2">
          <TrendingUp className="w-5 h-5 text-blue-400" />
          <span>Game Stats</span>
        </h4>
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center bg-white/10 rounded-xl p-3">
            <div className="text-2xl font-bold text-white">{playerCount}/{maxPlayers}</div>
            <div className="text-white/70 text-sm">Players</div>
          </div>
          <div className="text-center bg-white/10 rounded-xl p-3">
            <div className="text-2xl font-bold text-amber-400">₹{totalPot}</div>
            <div className="text-white/70 text-sm">Total Pot</div>
          </div>
        </div>
      </div>
    </div>
  )
}