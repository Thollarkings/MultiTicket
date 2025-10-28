// Dashboard.jsx
import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import StatsCard from '../components/StatsCard'

function Dashboard() {
  const [stats, setStats] = useState({
    total: 0,
    open: 0,
    inProgress: 0,
    closed: 0
  })

  useEffect(() => {
    // 1. Get tickets from localStorage
    const storedTickets = localStorage.getItem('ticketapp_tickets')
    let tickets = []
    if (storedTickets) {
      try {
        tickets = JSON.parse(storedTickets)
      } catch (error) {
        console.error('Error parsing stored tickets:', error)
      }
    }

    // 2. Calculate statistics
    const newStats = {
      total: tickets.length,
      open: tickets.filter(t => t.status === 'open').length,
      inProgress: tickets.filter(t => t.status === 'in_progress').length,
      closed: tickets.filter(t => t.status === 'closed').length
    }
    
    setStats(newStats)
  }, []) // Runs once on mount to get the latest stats

  return (
    <div className="container" style={{ padding: '2rem 0' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h1>Dashboard</h1>
        <Link to="/tickets" className="btn btn-primary">
          Manage Tickets
        </Link>
      </div>
      
      <div className="stats-grid">
        <StatsCard 
          title="Total Tickets" 
          value={stats.total} 
          description="All tickets in the system"
          color="primary"
        />
        <StatsCard 
          title="Open Tickets" 
          value={stats.open} 
          description="Tickets waiting for action"
          color="warning"
        />
        <StatsCard 
          title="In Progress" 
          value={stats.inProgress} 
          description="Tickets being worked on"
          color="success"
        />
        <StatsCard 
          title="Closed" 
          value={stats.closed} 
          description="Resolved tickets"
          color="gray"
        />
      </div>

      <div className="card" style={{ marginTop: '2rem' }}>
        <h3 style={{ marginBottom: '1rem' }}>Quick Actions</h3>
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          <Link to="/tickets?create=new" className="btn btn-primary">
            Create New Ticket
          </Link>
          <Link to="/tickets?status=open" className="btn btn-secondary">
            View Open Tickets
          </Link>
          <Link to="/tickets?status=in_progress" className="btn btn-secondary">
            View In Progress
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Dashboard