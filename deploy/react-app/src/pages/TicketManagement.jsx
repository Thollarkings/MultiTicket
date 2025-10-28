import React, { useState, useEffect } from 'react'
import TicketForm from '../components/TicketForm'
import TicketList from '../components/TicketList'

function TicketManagement() {
  const [tickets, setTickets] = useState([])
  const [editingTicket, setEditingTicket] = useState(null)
  const [showForm, setShowForm] = useState(false)
  const [toast, setToast] = useState(null)

  // Load tickets from localStorage on component mount
  useEffect(() => {
    const storedTickets = localStorage.getItem('ticketapp_tickets')
    if (storedTickets) {
      try {
        setTickets(JSON.parse(storedTickets))
      } catch (error) {
        console.error('Error parsing stored tickets:', error)
      }
    }
  }, [])

  // Save tickets to localStorage whenever tickets change
  useEffect(() => {
    localStorage.setItem('ticketapp_tickets', JSON.stringify(tickets))
  }, [tickets])

  const showToast = (message, type = 'success') => {
    setToast({ message, type })
    setTimeout(() => setToast(null), 3000)
  }

  const handleCreateTicket = (ticketData) => {
    const newTicket = {
      ...ticketData,
      id: Date.now(), // Simple ID generation
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
    
    setTickets(prev => [newTicket, ...prev])
    setShowForm(false)
    showToast('Ticket created successfully!')
  }

  const handleUpdateTicket = (ticketData) => {
    setTickets(prev => 
      prev.map(ticket => 
        ticket.id === editingTicket.id 
          ? { ...ticketData, id: ticket.id, updatedAt: new Date().toISOString() }
          : ticket
      )
    )
    setEditingTicket(null)
    setShowForm(false)
    showToast('Ticket updated successfully!')
  }

  const handleDeleteTicket = (ticketId) => {
    setTickets(prev => prev.filter(ticket => ticket.id !== ticketId))
    showToast('Ticket deleted successfully!')
  }

  const handleEdit = (ticket) => {
    setEditingTicket(ticket)
    setShowForm(true)
  }

  const handleCancel = () => {
    setEditingTicket(null)
    setShowForm(false)
  }

  const handleSubmit = (ticketData) => {
    if (editingTicket) {
      handleUpdateTicket(ticketData)
    } else {
      handleCreateTicket(ticketData)
    }
  }

  return (
    <div className="container" style={{ padding: '2rem 0' }}>
      {/* Toast Notification */}
      {toast && (
        <div className={`toast ${toast.type}`}>
          {toast.message}
        </div>
      )}

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h1>Ticket Management</h1>
        {!showForm && (
          <button 
            onClick={() => setShowForm(true)}
            className="btn btn-primary"
          >
            Create New Ticket
          </button>
        )}
      </div>

      {showForm ? (
        <TicketForm 
          ticket={editingTicket}
          onSubmit={handleSubmit}
          onCancel={handleCancel}
        />
      ) : (
        <TicketList 
          tickets={tickets}
          onEdit={handleEdit}
          onDelete={handleDeleteTicket}
        />
      )}
    </div>
  )
}

export default TicketManagement