import React, { useState } from 'react'
import { Crown, DollarSign, RotateCcw, LogOut, Trophy, Sparkles, Gift, Plus, IndianRupee } from 'lucide-react'
import { Player } from '../types/game'

interface AdminPanelProps {
  players: Player[]
  totalPot: number
  onDistributeBalance: () => void
  onClearAllBets: () => void
  onDistributeWinnings: (winnerId: string) => void
  onExitLobby: () => void
  onDistributeCustomAmount: (amount: number) => void
  onGiveCustomAmountToPlayer: (playerId: string, amount: number) => void
  isAdmin: boolean
}

export const AdminPanel: React.FC<AdminPanelProps> = ({
  players,
  totalPot,
  onDistributeBalance,
  onClearAllBets,
  onDistributeWinnings,
  onExitLobby,
  onDistributeCustomAmount,
  onGiveCustomAmountToPlayer,
  isAdmin
}) => {
  const [selectedWinner, setSelectedWinner] = useState<string>('')
  const [customAmount, setCustomAmount] = useState<string>('')
  const [selectedPlayerId, setSelectedPlayerId] = useState<string>('')
  const [individualAmount, setIndividualAmount] = useState<string>('')
  const [showCustomDistribution, setShowCustomDistribution] = useState<boolean>(false)
  const [showIndividualGift, setShowIndividualGift] = useState<boolean>(false)

  const handleDistributeWinnings = () => {
    if (selectedWinner && totalPot > 0) {
      onDistributeWinnings(selectedWinner)
      setSelectedWinner('')
    }
  }

  const handleCustomDistribution = () => {
    const amount = parseInt(customAmount)
    if (amount > 0) {
      onDistributeCustomAmount(amount)
      setCustomAmount('')
      setShowCustomDistribution(false)
    }
  }

  const handleIndividualGift = () => {
    const amount = parseInt(individualAmount)
    if (selectedPlayerId && amount > 0) {
      onGiveCustomAmountToPlayer(selectedPlayerId, amount)
      setIndividualAmount('')
      setSelectedPlayerId('')
      setShowIndividualGift(false)
    }
  }

  if (!isAdmin) return null

  const playersWithBets = players.filter(p => p.currentBet > 0)

  return (
    <div className="bg-gradient-to-br from-amber-500/20 to-yellow-500/20 backdrop-blur-xl rounded-2xl p-6 border border-amber-400/30 shadow-xl">
      <div className="flex items-center space-x-3 mb-6">
        <div className="bg-gradient-to-r from-amber-400 to-amber-600 p-3 rounded-2xl shadow-lg">
          <Crown className="w-6 h-6 text-black" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-white">Admin Controls</h2>
          <p className="text-amber-200 text-sm">Manage the game and distribute amounts</p>
        </div>
      </div>

      <div className="space-y-4">
        {/* Quick Distribute ₹1000 */}
        <button
          onClick={onDistributeBalance}
          className="w-full flex items-center justify-center space-x-3 py-4 px-4 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white rounded-xl font-bold transition-all duration-200 transform hover:scale-105 shadow-lg"
        >
          <Gift className="w-5 h-5" />
          <span>Give ₹1000 to All Players</span>
          <Sparkles className="w-4 h-4" />
        </button>

        {/* Custom Amount Distribution */}
        <div className="space-y-3">
          <button
            onClick={() => setShowCustomDistribution(!showCustomDistribution)}
            className="w-full flex items-center justify-center space-x-3 py-3 px-4 bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white rounded-xl font-medium transition-all duration-200 transform hover:scale-105 shadow-lg"
          >
            <DollarSign className="w-5 h-5" />
            <span>Custom Amount to All</span>
            <Plus className="w-4 h-4" />
          </button>

          {showCustomDistribution && (
            <div className="bg-black/20 backdrop-blur-xl rounded-xl p-4 border border-purple-400/20">
              <div className="flex items-center space-x-2 mb-3">
                <IndianRupee className="w-5 h-5 text-purple-400" />
                <span className="font-semibold text-white">Amount for All Players</span>
              </div>
              <div className="flex space-x-3">
                <input
                  type="number"
                  value={customAmount}
                  onChange={(e) => setCustomAmount(e.target.value)}
                  placeholder="Enter amount..."
                  className="flex-1 px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:ring-2 focus:ring-purple-400 focus:border-transparent backdrop-blur-xl"
                  min="1"
                  max="10000"
                />
                <button
                  onClick={handleCustomDistribution}
                  disabled={!customAmount || parseInt(customAmount) <= 0}
                  className="px-6 py-3 bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 disabled:from-gray-600 disabled:to-gray-700 text-white rounded-xl font-bold transition-all duration-200 transform hover:scale-105 disabled:scale-100 disabled:cursor-not-allowed"
                >
                  Give
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Individual Player Gift */}
        <div className="space-y-3">
          <button
            onClick={() => setShowIndividualGift(!showIndividualGift)}
            className="w-full flex items-center justify-center space-x-3 py-3 px-4 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-xl font-medium transition-all duration-200 transform hover:scale-105 shadow-lg"
          >
            <Gift className="w-5 h-5" />
            <span>Give to Individual Player</span>
            <Plus className="w-4 h-4" />
          </button>

          {showIndividualGift && (
            <div className="bg-black/20 backdrop-blur-xl rounded-xl p-4 border border-blue-400/20">
              <div className="flex items-center space-x-2 mb-3">
                <Gift className="w-5 h-5 text-blue-400" />
                <span className="font-semibold text-white">Gift to Player</span>
              </div>
              <div className="space-y-3">
                <select
                  value={selectedPlayerId}
                  onChange={(e) => setSelectedPlayerId(e.target.value)}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:ring-2 focus:ring-blue-400 focus:border-transparent backdrop-blur-xl"
                >
                  <option value="" className="bg-gray-800">Select player...</option>
                  {players.filter(p => !p.isAdmin).map(player => (
                    <option key={player.id} value={player.id} className="bg-gray-800">
                      {player.nickname} (₹{player.balance})
                    </option>
                  ))}
                </select>
                <div className="flex space-x-3">
                  <input
                    type="number"
                    value={individualAmount}
                    onChange={(e) => setIndividualAmount(e.target.value)}
                    placeholder="Enter amount..."
                    className="flex-1 px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:ring-2 focus:ring-blue-400 focus:border-transparent backdrop-blur-xl"
                    min="1"
                    max="10000"
                  />
                  <button
                    onClick={handleIndividualGift}
                    disabled={!selectedPlayerId || !individualAmount || parseInt(individualAmount) <= 0}
                    className="px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 disabled:from-gray-600 disabled:to-gray-700 text-white rounded-xl font-bold transition-all duration-200 transform hover:scale-105 disabled:scale-100 disabled:cursor-not-allowed"
                  >
                    Give
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* New Round */}
        <button
          onClick={onClearAllBets}
          className="w-full flex items-center justify-center space-x-3 py-4 px-4 bg-gradient-to-r from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700 text-white rounded-xl font-bold transition-all duration-200 transform hover:scale-105 shadow-lg"
        >
          <RotateCcw className="w-5 h-5" />
          <span>Start New Round</span>
        </button>

        {/* Winner Selection */}
        {totalPot > 0 && playersWithBets.length > 0 && (
          <div className="bg-black/20 backdrop-blur-xl rounded-xl p-4 border border-amber-400/20">
            <div className="flex items-center space-x-2 mb-4">
              <Trophy className="w-5 h-5 text-amber-400" />
              <span className="font-semibold text-white">Declare Winner</span>
            </div>
            
            <div className="space-y-3">
              <select
                value={selectedWinner}
                onChange={(e) => setSelectedWinner(e.target.value)}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:ring-2 focus:ring-amber-400 focus:border-transparent backdrop-blur-xl"
              >
                <option value="" className="bg-gray-800">Select winner...</option>
                {playersWithBets.map(player => (
                  <option key={player.id} value={player.id} className="bg-gray-800">
                    {player.nickname} (Bet: ₹{player.currentBet})
                  </option>
                ))}
              </select>
              
              {selectedWinner && (
                <button
                  onClick={handleDistributeWinnings}
                  className="w-full flex items-center justify-center space-x-3 py-3 px-4 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-black rounded-xl font-bold transition-all duration-200 transform hover:scale-105 shadow-lg"
                >
                  <Trophy className="w-5 h-5" />
                  <span>Award ₹{totalPot} to Winner</span>
                  <Sparkles className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        )}

        {/* Exit Lobby */}
        <button
          onClick={onExitLobby}
          className="w-full flex items-center justify-center space-x-3 py-4 px-4 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white rounded-xl font-bold transition-all duration-200 transform hover:scale-105 shadow-lg"
        >
          <LogOut className="w-5 h-5" />
          <span>Exit & Reset Game</span>
        </button>
      </div>

      {/* Quick Stats */}
      <div className="mt-6 pt-4 border-t border-amber-400/20">
        <div className="grid grid-cols-3 gap-3 text-center">
          <div className="bg-black/20 rounded-xl p-3">
            <div className="font-bold text-white text-lg">{players.length}</div>
            <div className="text-amber-200 text-xs">Players</div>
          </div>
          <div className="bg-black/20 rounded-xl p-3">
            <div className="font-bold text-amber-400 text-lg">₹{totalPot}</div>
            <div className="text-amber-200 text-xs">Total Pot</div>
          </div>
          <div className="bg-black/20 rounded-xl p-3">
            <div className="font-bold text-white text-lg">{playersWithBets.length}</div>
            <div className="text-amber-200 text-xs">Active Bets</div>
          </div>
        </div>
      </div>
    </div>
  )
}