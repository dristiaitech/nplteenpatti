import React, { useState } from 'react'
import { Spade, Users, Crown } from 'lucide-react'
import { useGameSession } from './hooks/useGameSession'
import { GameTable } from './components/GameTable'
import { BettingPanel } from './components/BettingPanel'
import { AdminPanel } from './components/AdminPanel'
import { PlayerSetup } from './components/PlayerSetup'
import { PlayerSwitcher } from './components/PlayerSwitcher'

function App() {
  const {
    gameSession,
    addPlayer,
    removePlayer,
    distributeInitialBalance,
    distributeCustomAmount,
    giveCustomAmountToPlayer,
    placeBet,
    clearAllBets,
    distributeWinnings,
    exitLobby,
    currentAdmin,
    isAdminSet
  } = useGameSession()

  const [selectedPlayerId, setSelectedPlayerId] = useState<string | null>(null)
  const [showAddPlayer, setShowAddPlayer] = useState<boolean>(false)

  // Show player setup if no players exist OR if explicitly requested
  const showPlayerSetup = gameSession.players.length === 0 || showAddPlayer

  const currentPlayer = gameSession.players.find(p => p.id === selectedPlayerId)

  const handlePlayerSelect = (playerId: string) => {
    setSelectedPlayerId(playerId)
    setShowAddPlayer(false) // Hide add player form when selecting existing player
  }

  const handleAddPlayer = () => {
    setShowAddPlayer(true)
    setSelectedPlayerId(null)
  }

  const handlePlayerAdded = (nickname: string, isAdmin: boolean) => {
    const playerId = addPlayer(nickname, isAdmin)
    setSelectedPlayerId(playerId)
    setShowAddPlayer(false) // Hide the add player form after adding
  }

  const handlePlaceBet = async (amount: number): Promise<boolean> => {
    if (!selectedPlayerId) return false
    return placeBet(selectedPlayerId, amount)
  }

  if (showPlayerSetup) {
    return (
      <PlayerSetup
        players={gameSession.players}
        maxPlayers={gameSession.maxPlayers}
        onAddPlayer={handlePlayerAdded}
        isAdminSet={isAdminSet}
      />
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-900 via-green-800 to-teal-900">
      {/* Header */}
      <header className="bg-black/20 backdrop-blur-xl border-b border-white/10 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="bg-gradient-to-br from-amber-400 to-amber-600 p-3 rounded-2xl shadow-lg">
                <Spade className="w-8 h-8 text-black" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">Teen Patti Table</h1>
                <div className="flex items-center space-x-2 text-emerald-200">
                  <Users className="w-4 h-4" />
                  <span className="text-sm">{gameSession.players.length}/5 Players</span>
                  {currentAdmin && (
                    <>
                      <span className="text-white/40">•</span>
                      <Crown className="w-4 h-4 text-amber-400" />
                      <span className="text-sm text-amber-200">{currentAdmin.nickname}</span>
                    </>
                  )}
                </div>
              </div>
            </div>
            
            <PlayerSwitcher
              players={gameSession.players}
              selectedPlayerId={selectedPlayerId}
              onPlayerSelect={handlePlayerSelect}
              onAddPlayer={handleAddPlayer}
            />
          </div>
        </div>
      </header>

      {/* Main Game Area */}
      <main className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid lg:grid-cols-4 gap-6">
          {/* Game Table - Takes most space */}
          <div className="lg:col-span-3">
            <GameTable
              players={gameSession.players}
              totalPot={gameSession.totalPot}
              maxPlayers={gameSession.maxPlayers}
              onRemovePlayer={removePlayer}
              currentAdmin={currentAdmin}
              selectedPlayerId={selectedPlayerId}
            />
          </div>

          {/* Side Panel */}
          <div className="lg:col-span-1 space-y-6">
            {/* Admin Panel - Only show if current player is admin */}
            {currentPlayer?.isAdmin && (
              <AdminPanel
                players={gameSession.players}
                totalPot={gameSession.totalPot}
                onDistributeBalance={distributeInitialBalance}
                onDistributeCustomAmount={distributeCustomAmount}
                onGiveCustomAmountToPlayer={giveCustomAmountToPlayer}
                onClearAllBets={clearAllBets}
                onDistributeWinnings={distributeWinnings}
                onExitLobby={exitLobby}
                isAdmin={true}
              />
            )}

            {/* Betting Panel - Only show if player is selected */}
            {currentPlayer && (
              <BettingPanel
                currentPlayer={currentPlayer}
                totalPot={gameSession.totalPot}
                onPlaceBet={handlePlaceBet}
                playerCount={gameSession.players.length}
                maxPlayers={gameSession.maxPlayers}
              />
            )}

            {/* Quick Actions for non-selected state */}
            {!currentPlayer && gameSession.players.length > 0 && (
              <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20">
                <div className="text-center">
                  <Users className="w-12 h-12 text-white/60 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-white mb-2">Select a Player</h3>
                  <p className="text-white/70 text-sm mb-4">Choose a player from the header to start betting</p>
                  <button
                    onClick={handleAddPlayer}
                    className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white py-3 px-4 rounded-xl font-medium transition-all duration-200 transform hover:scale-105"
                  >
                    Add New Player
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Game Instructions - Compact and elegant */}
        <div className="mt-8 bg-black/20 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
          <div className="grid md:grid-cols-3 gap-6 text-sm">
            <div className="flex items-start space-x-3">
              <div className="bg-gradient-to-r from-amber-400 to-amber-500 text-black rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm flex-shrink-0">1</div>
              <div>
                <h4 className="font-semibold text-white mb-1">Setup Game</h4>
                <p className="text-white/70">First player joins as Admin and distributes custom amounts to players</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="bg-gradient-to-r from-green-400 to-green-500 text-black rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm flex-shrink-0">2</div>
              <div>
                <h4 className="font-semibold text-white mb-1">Place Bets</h4>
                <p className="text-white/70">Switch between players and bet ₹5, ₹10, or ₹20 per round</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="bg-gradient-to-r from-purple-400 to-purple-500 text-black rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm flex-shrink-0">3</div>
              <div>
                <h4 className="font-semibold text-white mb-1">Win & Repeat</h4>
                <p className="text-white/70">Admin declares winner, distributes pot, and can add more funds anytime</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default App