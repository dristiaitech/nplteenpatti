import { useState, useEffect, useCallback } from 'react'
import { Player, GameSession } from '../types/game'

const MAX_PLAYERS = 5
const INITIAL_BALANCE = 1000

export const useGameSession = () => {
  const [gameSession, setGameSession] = useState<GameSession>({
    id: 'shared-table',
    players: [],
    totalPot: 0,
    roundActive: false,
    maxPlayers: MAX_PLAYERS,
    adminId: null
  })

  // Load game session from localStorage on mount
  useEffect(() => {
    const savedSession = localStorage.getItem('tinpatti-game-session')
    if (savedSession) {
      try {
        const session = JSON.parse(savedSession)
        setGameSession(session)
      } catch (error) {
        console.error('Failed to load saved session:', error)
      }
    }
  }, [])

  // Save game session to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('tinpatti-game-session', JSON.stringify(gameSession))
  }, [gameSession])

  // Add player to the game
  const addPlayer = useCallback((nickname: string, isAdmin: boolean = false): string => {
    const playerId = crypto.randomUUID()
    
    setGameSession(prevSession => {
      if (prevSession.players.length >= MAX_PLAYERS) {
        return prevSession
      }

      const newPlayer: Player = {
        id: playerId,
        nickname: nickname.trim(),
        currentBet: 0,
        balance: 0, // Admin will distribute balance
        isAdmin
      }

      const updatedPlayers = [...prevSession.players, newPlayer]
      
      return {
        ...prevSession,
        players: updatedPlayers,
        adminId: isAdmin ? playerId : prevSession.adminId
      }
    })

    return playerId
  }, [])

  // Remove player from the game
  const removePlayer = useCallback((playerId: string) => {
    setGameSession(prevSession => {
      const updatedPlayers = prevSession.players.filter(p => p.id !== playerId)
      const wasAdmin = prevSession.adminId === playerId
      
      return {
        ...prevSession,
        players: updatedPlayers,
        adminId: wasAdmin ? null : prevSession.adminId,
        totalPot: updatedPlayers.reduce((sum, p) => sum + p.currentBet, 0)
      }
    })
  }, [])

  // Distribute initial balance (admin only)
  const distributeInitialBalance = useCallback(() => {
    setGameSession(prevSession => {
      const updatedPlayers = prevSession.players.map(player => ({
        ...player,
        balance: INITIAL_BALANCE,
        currentBet: 0
      }))

      return {
        ...prevSession,
        players: updatedPlayers,
        totalPot: 0
      }
    })
  }, [])

  // Distribute custom amount to all players (admin only)
  const distributeCustomAmount = useCallback((amount: number) => {
    setGameSession(prevSession => {
      const updatedPlayers = prevSession.players.map(player => ({
        ...player,
        balance: player.balance + amount
      }))

      return {
        ...prevSession,
        players: updatedPlayers
      }
    })
  }, [])

  // Give custom amount to individual player (admin only)
  const giveCustomAmountToPlayer = useCallback((playerId: string, amount: number) => {
    setGameSession(prevSession => {
      const updatedPlayers = prevSession.players.map(player => 
        player.id === playerId 
          ? { ...player, balance: player.balance + amount }
          : player
      )

      return {
        ...prevSession,
        players: updatedPlayers
      }
    })
  }, [])

  // Place bet
  const placeBet = useCallback((playerId: string, amount: number): boolean => {
    let success = false
    
    setGameSession(prevSession => {
      const playerIndex = prevSession.players.findIndex(p => p.id === playerId)
      
      if (playerIndex === -1) return prevSession
      
      const player = prevSession.players[playerIndex]
      
      if (player.balance < amount) return prevSession
      
      const updatedPlayers = [...prevSession.players]
      updatedPlayers[playerIndex] = {
        ...player,
        balance: player.balance - amount,
        currentBet: player.currentBet + amount
      }
      
      success = true
      
      return {
        ...prevSession,
        players: updatedPlayers,
        totalPot: updatedPlayers.reduce((sum, p) => sum + p.currentBet, 0)
      }
    })
    
    return success
  }, [])

  // Clear all bets (new round)
  const clearAllBets = useCallback(() => {
    setGameSession(prevSession => ({
      ...prevSession,
      players: prevSession.players.map(player => ({
        ...player,
        currentBet: 0
      })),
      totalPot: 0,
      roundActive: false
    }))
  }, [])

  // Distribute winnings (admin only)
  const distributeWinnings = useCallback((winnerId: string) => {
    setGameSession(prevSession => {
      const winnerIndex = prevSession.players.findIndex(p => p.id === winnerId)
      
      if (winnerIndex === -1 || prevSession.totalPot === 0) return prevSession
      
      const updatedPlayers = [...prevSession.players]
      updatedPlayers[winnerIndex] = {
        ...updatedPlayers[winnerIndex],
        balance: updatedPlayers[winnerIndex].balance + prevSession.totalPot
      }
      
      // Clear all bets after distributing winnings
      const finalPlayers = updatedPlayers.map(player => ({
        ...player,
        currentBet: 0
      }))
      
      return {
        ...prevSession,
        players: finalPlayers,
        totalPot: 0,
        roundActive: false
      }
    })
  }, [])

  // Exit lobby (admin only)
  const exitLobby = useCallback(() => {
    localStorage.removeItem('tinpatti-game-session')
    setGameSession({
      id: 'shared-table',
      players: [],
      totalPot: 0,
      roundActive: false,
      maxPlayers: MAX_PLAYERS,
      adminId: null
    })
  }, [])

  const currentAdmin = gameSession.players.find(p => p.id === gameSession.adminId)

  return {
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
    isAdminSet: !!gameSession.adminId
  }
}