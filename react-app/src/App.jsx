import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider, useAuth } from './contexts/AuthContext'
import LandingPage from './pages/LandingPage'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Dashboard from './pages/Dashboard'
import TicketManagement from './pages/TicketManagement'
import Layout from './components/Layout'

// Add debug component
function DebugTest() {
  return (
    <div style={{ padding: '2rem', background: 'red', color: 'white' }}>
      <h1>DEBUG: React is working!</h1>
      <p>If you see this, React is rendering but components might have issues</p>
    </div>
  )
}

function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAuth()
  return isAuthenticated ? children : <Navigate to="/auth/login" />
}

function App() {
  console.log('App component rendering') 
  
  return (
    <AuthProvider>
      <Routes>
        
        <Route path="/debug" element={<DebugTest />} />
        
        <Route path="/" element={<LandingPage />} />
        <Route path="/auth/login" element={<Login />} />
        <Route path="/auth/signup" element={<Signup />} />
        <Route path="/dashboard" element={
          <ProtectedRoute>
            <Layout>
              <Dashboard />
            </Layout>
          </ProtectedRoute>
        } />
        <Route path="/tickets" element={
          <ProtectedRoute>
            <Layout>
              <TicketManagement />
            </Layout>
          </ProtectedRoute>
        } />
      </Routes>
    </AuthProvider>
  )
}

export default App