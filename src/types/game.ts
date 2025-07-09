export interface Player {
  id: string
  nickname: string
  currentBet: number
  balance: number
  isAdmin: boolean
}

export interface GameSession {
  id: string
  players: Player[]
  totalPot: number
  roundActive: boolean
  maxPlayers: number
  adminId: string | null
}

export interface PlayerSession {
  id: string
  nickname: string
  balance: number
}

export interface GameState {
  players: Player[]
  totalPot: number
  roundActive: boolean
  maxPlayers: number
}