import { useState, useEffect, useCallback } from 'react'
import { Player, PlayerSession, GameState } from '../types/game'

const MAX_PLAYERS = 5

export const useLocalGame = (player: PlayerSession | null) => {
  const [gameState, setGameState] = useState<GameState>({
    players: [],
    totalPot: 0,
    roundActive: false,
    maxPlayers: MAX_PLAYERS
  })
  const [currentBet, setCurrentBet] = useState<number>(0)
  const [isConnected] = useState<boolean>(true)

  // Load players from localStorage on mount
  useEffect(() => {
    const savedPlayers = localStorage.getItem('tinpatti-all-players')
    if (savedPlayers) {
      try {
        const players = JSON.parse(savedPlayers)
        setGameState(prevState => ({
          ...prevState,
          players: players.map((p: any) => ({
            ...p,
            lastSeen: new Date(p.lastSeen)
          })),
          totalPot: players.reduce((sum: number, p: any) => sum + p.currentBet, 0)
        }))
      } catch (error) {
        console.error('Failed to load saved players:', error)
      }
    }
  }, [])

  // Save players to localStorage whenever gameState changes
  useEffect(() => {
    if (gameState.players.length > 0) {
      localStorage.setItem('tinpatti-all-players', JSON.stringify(gameState.players))
    }
  }, [gameState.players])

  // Add or update current player in game
  useEffect(() => {
    if (!player) return

    setGameState(prevState => {
      const existingPlayerIndex = prevState.players.findIndex(p => p.id === player.id)
      let newPlayers = [...prevState.players]

      const currentPlayerData: Player = {
        id: player.id,
        nickname: player.nickname,
        currentBet: currentBet,
        lastSeen: new Date(),
        balance: player.balance
      }

      if (existingPlayerIndex >= 0) {
        newPlayers[existingPlayerIndex] = currentPlayerData
      } else if (newPlayers.length < MAX_PLAYERS) {
        newPlayers.push(currentPlayerData)
      }

      return {
        ...prevState,
        players: newPlayers,
        totalPot: newPlayers.reduce((sum, p) => sum + p.currentBet, 0)
      }
    })
  }, [player, currentBet])

  // Place bet function
  const placeBet = useCallback(async (amount: number): Promise<boolean> => {
    if (!player) return false

    setCurrentBet(amount)
    return true
  }, [player])

  // Clear bet function
  const clearBet = useCallback(async () => {
    setCurrentBet(0)
  }, [])

  // Clear all bets (new round)
  const clearAllBets = useCallback(() => {
    setGameState(prevState => ({
      ...prevState,
      players: prevState.players.map(p => ({
        ...p,
        currentBet: 0,
        lastSeen: new Date()
      })),
      totalPot: 0
    }))
    setCurrentBet(0)
  }, [])

  // Remove a player from the game
  const removePlayer = useCallback((playerId: string) => {
    setGameState(prevState => {
      const newPlayers = prevState.players.filter(p => p.id !== playerId)
      return {
        ...prevState,
        players: newPlayers,
        totalPot: newPlayers.reduce((sum, p) => sum + p.currentBet, 0)
      }
    })
  }, [])

  return {
    activePlayers: gameState.players,
    currentBet,
    isConnected,
    totalPot: gameState.totalPot,
    maxPlayers: MAX_PLAYERS,
    placeBet,
    clearBet,
    clearAllBets,
    removePlayer
  }
}