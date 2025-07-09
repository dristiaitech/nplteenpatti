import React, { useState } from 'react'
import { Users, Crown, UserPlus, Sparkles, Play } from 'lucide-react'

interface PlayerSetupProps {
  players: any[]
  maxPlayers: number
  onAddPlayer: (nickname: string, isAdmin: boolean) => void
  isAdminSet: boolean
}

export const PlayerSetup: React.FC<PlayerSetupProps> = ({
  players,
  maxPlayers,
  onAddPlayer,
  isAdminSet
}) => {
  const [nickname, setNickname] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = (e: React.FormEvent, asAdmin: boolean = false) => {
    e.preventDefault()
    
    const trimmedName = nickname.trim()
    
    if (!trimmedName) {
      setError('Please enter a name')
      return
    }
    
    if (trimmedName.length < 2) {
      setError('Name must be at least 2 characters')
      return
    }
    
    if (trimmedName.length > 15) {
      setError('Name must be less than 15 characters')
      return
    }

    if (players.some(p => p.nickname.toLowerCase() === trimmedName.toLowerCase())) {
      setError('This name is already taken')
      return
    }
    
    onAddPlayer(trimmedName, asAdmin)
    setNickname('')
    setError('')
  }

  const canAddPlayers = players.length < maxPlayers

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-900 via-green-800 to-teal-900 flex items-center justify-center p-4">
      <div className="bg-black/30 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/20 w-full max-w-2xl">
        <div className="text-center mb-8">
          <div className="bg-gradient-to-r from-amber-400 to-amber-600 p-4 rounded-2xl w-20 h-20 mx-auto mb-6 flex items-center justify-center shadow-xl">
            <Sparkles className="w-10 h-10 text-black" />
          </div>
          <h1 className="text-4xl font-bold text-white mb-3">Teen Patti Table</h1>
          <p className="text-white/70 text-lg">Create your shared gaming experience</p>
        </div>

        {/* Current Players */}
        {players.length > 0 && (
          <div className="mb-8">
            <h3 className="font-bold text-white mb-4 flex items-center space-x-2">
              <Users className="w-5 h-5 text-green-400" />
              <span>Players Joined ({players.length}/{maxPlayers})</span>
            </h3>
            <div className="space-y-3">
              {players.map((player) => (
                <div key={player.id} className="flex items-center justify-between p-4 bg-white/10 backdrop-blur-xl rounded-xl border border-white/20">
                  <div className="flex items-center space-x-3">
                    <div className={`p-2 rounded-xl ${player.isAdmin ? 'bg-gradient-to-r from-amber-400 to-amber-600' : 'bg-gradient-to-r from-green-500 to-green-600'}`}>
                      {player.isAdmin ? (
                        <Crown className="w-5 h-5 text-white" />
                      ) : (
                        <Users className="w-5 h-5 text-white" />
                      )}
                    </div>
                    <div>
                      <span className="font-bold text-white text-lg">{player.nickname}</span>
                      {player.isAdmin && (
                        <span className="ml-3 bg-amber-400/20 text-amber-200 px-2 py-1 rounded-full text-xs font-medium border border-amber-400/30">
                          Game Admin
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-green-400 font-bold">₹{player.balance}</div>
                    <div className="text-white/50 text-sm">Balance</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Add Player Form */}
        {canAddPlayers && (
          <form onSubmit={(e) => handleSubmit(e, false)} className="space-y-6">
            <div>
              <label htmlFor="nickname" className="block text-lg font-semibold text-white mb-3">
                Player Name
              </label>
              <input
                type="text"
                id="nickname"
                value={nickname}
                onChange={(e) => {
                  setNickname(e.target.value)
                  setError('')
                }}
                placeholder="Enter your name..."
                className="w-full px-6 py-4 bg-white/10 backdrop-blur-xl border border-white/20 text-white placeholder-white/50 rounded-xl focus:ring-2 focus:ring-amber-400 focus:border-transparent transition-all text-lg"
                maxLength={15}
                autoFocus
              />
              {error && (
                <p className="text-red-400 text-sm mt-2 bg-red-500/10 p-2 rounded-lg border border-red-500/20">{error}</p>
              )}
            </div>

            <div className="grid grid-cols-1 gap-4">
              {!isAdminSet && (
                <button
                  type="button"
                  onClick={(e) => handleSubmit(e, true)}
                  disabled={!nickname.trim()}
                  className="flex items-center justify-center space-x-3 py-4 px-6 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 disabled:from-gray-600 disabled:to-gray-700 text-white rounded-xl font-bold text-lg transition-all duration-200 transform hover:scale-105 disabled:scale-100 disabled:cursor-not-allowed shadow-xl"
                >
                  <Crown className="w-6 h-6" />
                  <span>Join as Game Admin</span>
                  <Sparkles className="w-5 h-5" />
                </button>
              )}
              
              <button
                type="submit"
                disabled={!nickname.trim()}
                className="flex items-center justify-center space-x-3 py-4 px-6 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 disabled:from-gray-600 disabled:to-gray-700 text-white rounded-xl font-bold text-lg transition-all duration-200 transform hover:scale-105 disabled:scale-100 disabled:cursor-not-allowed shadow-xl"
              >
                <UserPlus className="w-6 h-6" />
                <span>Join as Player</span>
                <Play className="w-5 h-5" />
              </button>
            </div>
          </form>
        )}

        {!canAddPlayers && (
          <div className="text-center p-6 bg-red-500/20 rounded-xl border border-red-500/30">
            <p className="text-red-300 font-bold text-lg">Table Full!</p>
            <p className="text-red-200 text-sm mt-1">Maximum 5 players reached</p>
          </div>
        )}

        {/* Game Rules */}
        <div className="mt-8 bg-blue-500/10 backdrop-blur-xl rounded-2xl p-6 border border-blue-500/20">
          <h3 className="font-bold text-blue-200 mb-4 flex items-center space-x-2">
            <Play className="w-5 h-5" />
            <span>How to Play</span>
          </h3>
          <div className="grid md:grid-cols-2 gap-4 text-sm text-blue-100">
            <div className="space-y-2">
              <div className="flex items-start space-x-2">
                <div className="bg-blue-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">1</div>
                <p>First player joins as Admin to control the game</p>
              </div>
              <div className="flex items-start space-x-2">
                <div className="bg-blue-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">2</div>
                <p>Admin distributes ₹1000 to all players</p>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-start space-x-2">
                <div className="bg-blue-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">3</div>
                <p>Players bet ₹5, ₹10, or ₹20 per round</p>
              </div>
              <div className="flex items-start space-x-2">
                <div className="bg-blue-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">4</div>
                <p>Admin declares winner and distributes pot</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}