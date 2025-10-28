import React, { createContext, useContext, useState, useEffect } from 'react'

const AuthContext = createContext()

export function useAuth() {
  return useContext(AuthContext)
}

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const session = localStorage.getItem('ticketapp_session')
    if (session) {
      try {
        const userData = JSON.parse(session)
        setIsAuthenticated(true)
        setUser(userData)
      } catch (error) {
        localStorage.removeItem('ticketapp_session')
      }
    }
    setLoading(false)
  }, [])

  const login = async (email, password) => {
    // Mock authentication
    if (email && password) {
      const userData = {
        id: 1,
        email,
        name: email.split('@')[0]
      }
      localStorage.setItem('ticketapp_session', JSON.stringify(userData))
      setIsAuthenticated(true)
      setUser(userData)
      return { success: true }
    }
    return { success: false, error: 'Invalid credentials' }
  }

  const signup = async (email, password, name) => {
    // Mock signup
    if (email && password && name) {
      const userData = {
        id: Date.now(),
        email,
        name
      }
      localStorage.setItem('ticketapp_session', JSON.stringify(userData))
      setIsAuthenticated(true)
      setUser(userData)
      return { success: true }
    }
    return { success: false, error: 'Please fill all fields' }
  }

  const logout = () => {
    localStorage.removeItem('ticketapp_session')
    setIsAuthenticated(false)
    setUser(null)
  }

  const value = {
    isAuthenticated,
    user,
    login,
    signup,
    logout,
    loading
  }

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  )
}