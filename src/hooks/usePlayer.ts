import { useState, useEffect } from 'react'
import { PlayerSession } from '../types/game'

const INITIAL_BALANCE = 1000

export const usePlayer = () => {
  const [player, setPlayer] = useState<PlayerSession | null>(null)
  const [showNameInput, setShowNameInput] = useState<boolean>(false)

  useEffect(() => {
    // Try to load existing session from localStorage
    const savedSession = localStorage.getItem('tinpatti-session')
    
    if (savedSession) {
      try {
        const session = JSON.parse(savedSession)
        setPlayer(session)
      } catch (error) {
        console.error('Failed to parse saved session:', error)
        setShowNameInput(true)
      }
    } else {
      setShowNameInput(true)
    }
  }, [])

  const createSession = (nickname: string) => {
    const sessionId = crypto.randomUUID()
    
    const newSession: PlayerSession = {
      id: sessionId,
      nickname: nickname.trim(),
      balance: INITIAL_BALANCE
    }
    
    localStorage.setItem('tinpatti-session', JSON.stringify(newSession))
    setPlayer(newSession)
    setShowNameInput(false)
  }

  const updateBalance = (newBalance: number) => {
    if (!player) return
    
    const updatedPlayer = { ...player, balance: newBalance }
    setPlayer(updatedPlayer)
    localStorage.setItem('tinpatti-session', JSON.stringify(updatedPlayer))
  }

  const resetBalance = () => {
    if (!player) return
    updateBalance(INITIAL_BALANCE)
  }

  const placeBet = (amount: number): boolean => {
    if (!player || player.balance < amount) return false
    
    updateBalance(player.balance - amount)
    return true
  }

  const resetSession = () => {
    localStorage.removeItem('tinpatti-session')
    setPlayer(null)
    setShowNameInput(true)
  }

  return {
    player,
    showNameInput,
    createSession,
    updateBalance,
    resetBalance,
    placeBet,
    resetSession
  }
}