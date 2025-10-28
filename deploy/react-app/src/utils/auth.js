// Utility functions for authentication
export const getStoredUser = () => {
  try {
    const session = localStorage.getItem('ticketapp_session')
    return session ? JSON.parse(session) : null
  } catch (error) {
    console.error('Error parsing stored user:', error)
    return null
  }
}

export const isAuthenticated = () => {
  return !!getStoredUser()
}

export const clearSession = () => {
  localStorage.removeItem('ticketapp_session')
}

export const storeSession = (userData) => {
  localStorage.setItem('ticketapp_session', JSON.stringify(userData))
}