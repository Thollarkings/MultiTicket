import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

function Layout({ children }) {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <div>
      <nav className="nav">
        <div className="container">
          <div className="nav-content">
            <Link to="/dashboard" className="nav-link" style={{ fontSize: '1.25rem', fontWeight: 'bold' }}>
              TicketFlow
            </Link>
            <div className="nav-links">
              <Link to="/dashboard" className="nav-link">Dashboard</Link>
              <Link to="/tickets" className="nav-link">Tickets</Link>
              <span className="nav-link">Welcome, {user?.name}</span>
              <button onClick={handleLogout} className="btn btn-secondary" style={{ padding: '0.5rem 1rem' }}>
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>
      <main>
        {children}
      </main>
    </div>
  )
}

export default Layout