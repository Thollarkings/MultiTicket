import React from 'react'

function TicketList({ tickets, onEdit, onDelete }) {
  const getStatusDisplay = (status) => {
    const statusMap = {
      open: { label: 'Open', class: 'status-open' },
      in_progress: { label: 'In Progress', class: 'status-in_progress' },
      closed: { label: 'Closed', class: 'status-closed' }
    }
    return statusMap[status] || statusMap.open
  }

  const getPriorityColor = (priority) => {
    const priorityMap = {
      low: 'var(--success-color)',
      medium: 'var(--warning-color)',
      high: 'var(--error-color)'
    }
    return priorityMap[priority] || 'var(--gray-500)'
  }

  if (tickets.length === 0) {
    return (
      <div className="card" style={{ textAlign: 'center', padding: '3rem' }}>
        <h3>No tickets found</h3>
        <p>Create your first ticket to get started!</p>
      </div>
    )
  }

  return (
    <div>
      {tickets.map(ticket => {
        const statusInfo = getStatusDisplay(ticket.status)
        return (
          <div key={ticket.id} className="card ticket-card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
              <div style={{ flex: 1 }}>
                <h4 style={{ marginBottom: '0.5rem' }}>{ticket.title}</h4>
                {ticket.description && (
                  <p style={{ color: 'var(--gray-600)', marginBottom: '0.5rem' }}>
                    {ticket.description}
                  </p>
                )}
                <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap' }}>
                  <span className={`status-tag ${statusInfo.class}`}>
                    {statusInfo.label}
                  </span>
                  <span style={{ 
                    fontSize: '0.875rem', 
                    color: 'var(--gray-600)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.25rem'
                  }}>
                    <span style={{
                      width: '8px',
                      height: '8px',
                      borderRadius: '50%',
                      backgroundColor: getPriorityColor(ticket.priority),
                      display: 'inline-block'
                    }}></span>
                    {ticket.priority} priority
                  </span>
                  <span style={{ fontSize: '0.875rem', color: 'var(--gray-500)' }}>
                    #{ticket.id}
                  </span>
                </div>
              </div>
            </div>
            
            <div className="ticket-actions">
              <button 
                onClick={() => onEdit(ticket)}
                className="btn btn-secondary"
                style={{ padding: '0.5rem 1rem' }}
              >
                Edit
              </button>
              <button 
                onClick={() => {
                  if (window.confirm('Are you sure you want to delete this ticket?')) {
                    onDelete(ticket.id)
                  }
                }}
                className="btn btn-danger"
                style={{ padding: '0.5rem 1rem' }}
              >
                Delete
              </button>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default TicketList