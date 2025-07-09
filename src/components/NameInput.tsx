import React, { useState } from 'react'
import { User, Play } from 'lucide-react'

interface NameInputProps {
  onCreateSession: (nickname: string) => void
}

export const NameInput: React.FC<NameInputProps> = ({ onCreateSession }) => {
  const [nickname, setNickname] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    const trimmedName = nickname.trim()
    
    if (!trimmedName) {
      setError('Please enter your name')
      return
    }
    
    if (trimmedName.length < 2) {
      setError('Name must be at least 2 characters')
      return
    }
    
    if (trimmedName.length > 20) {
      setError('Name must be less than 20 characters')
      return
    }
    
    onCreateSession(trimmedName)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-green-100 to-emerald-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl p-8 shadow-2xl border border-gray-100 w-full max-w-md">
        <div className="text-center mb-8">
          <div className="bg-gradient-to-br from-green-500 to-green-600 p-4 rounded-full w-16 h-16 mx-auto mb-4">
            <User className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Join Teen Patti Table</h1>
          <p className="text-gray-600">Enter your name to start playing with ₹1000</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="nickname" className="block text-sm font-medium text-gray-700 mb-2">
              Your Name
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
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
              maxLength={20}
              autoFocus
            />
            {error && (
              <p className="text-red-500 text-sm mt-2">{error}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={!nickname.trim()}
            className="w-full flex items-center justify-center space-x-2 py-3 px-4 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 disabled:from-gray-300 disabled:to-gray-400 text-white rounded-xl font-bold transition-all duration-200 transform hover:scale-105 disabled:scale-100 disabled:cursor-not-allowed"
          >
            <Play className="w-5 h-5" />
            <span>Join Game</span>
          </button>
        </form>

        <div className="mt-8 p-4 bg-blue-50 rounded-xl">
          <h3 className="font-semibold text-blue-900 mb-2">Game Rules</h3>
          <ul className="text-sm text-blue-700 space-y-1">
            <li>• Maximum 5 players per table</li>
            <li>• Everyone starts with ₹1000</li>
            <li>• Bet ₹5, ₹10, or ₹20 per round</li>
            <li>• Share this page with friends to play together</li>
          </ul>
        </div>
      </div>
    </div>
  )
}