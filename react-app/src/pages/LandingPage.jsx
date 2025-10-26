import React from 'react'
import { Link } from 'react-router-dom'

function LandingPage() {
  return (
    <div>
      {/* Hero Section */}
      <section className="hero">
        <div className="circle circle-large"></div>
        <div className="circle circle-small"></div>
        <div className="wave-container">
          <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" fill="white"></path>
          </svg>
        </div>
        <div className="container">
          <div style={{ position: 'relative', zIndex: 10, textAlign: 'center', width: '100%' }}>
            <h1 style={{ fontSize: '3rem', marginBottom: '1rem', fontWeight: 'bold' }}>TicketFlow</h1>
            <p style={{ fontSize: '1.25rem', marginBottom: '2rem', maxWidth: '600px', margin: '0 auto 2rem', opacity: 0.9 }}>
              Streamline your support process with our powerful ticket management system
            </p>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link to="/auth/login" className="btn btn-secondary">Login</Link>
              <Link to="/auth/signup" className="btn btn-primary">Get Started</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section style={{ padding: '4rem 0' }}>
        <div className="container">
          <h2 style={{ textAlign: 'center', marginBottom: '3rem', fontSize: '2.5rem' }}>Why Choose TicketFlow?</h2>
          <div className="grid grid-cols-3">
            <div className="card">
              <h3 style={{ marginBottom: '1rem', color: 'var(--primary-color)' }}>Easy Ticket Management</h3>
              <p>Create, track, and resolve tickets with our intuitive interface.</p>
            </div>
            <div className="card">
              <h3 style={{ marginBottom: '1rem', color: 'var(--primary-color)' }}>Real-time Updates</h3>
              <p>Stay informed with live status updates and notifications.</p>
            </div>
            <div className="card">
              <h3 style={{ marginBottom: '1rem', color: 'var(--primary-color)' }}>Team Collaboration</h3>
              <p>Work together seamlessly with your support team.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ background: 'var(--gray-100)', padding: '2rem 0', marginTop: '4rem' }}>
        <div className="container">
          <p style={{ textAlign: 'center', color: 'var(--gray-700)' }}>
            &copy; 2024 TicketFlow. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}

export default LandingPage