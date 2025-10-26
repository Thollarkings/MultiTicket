import React from 'react'

function StatsCard({ title, value, description, color = 'primary' }) {
  const colorClasses = {
    primary: 'var(--primary-color)',
    success: 'var(--success-color)',
    warning: 'var(--warning-color)',
    gray: 'var(--gray-700)'
  }

  return (
    <div className="card stat-card">
      <span className="stat-number" style={{ color: colorClasses[color] }}>
        {value}
      </span>
      <div className="stat-label">{title}</div>
      {description && (
        <p style={{ marginTop: '0.5rem', fontSize: '0.875rem', color: 'var(--gray-600)' }}>
          {description}
        </p>
      )}
    </div>
  )
}

export default StatsCard