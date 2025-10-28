import React from 'react'
import { Link } from 'react-router-dom'

function LandingPage() {
  // Define the external URL for the main multi-app page
  const mainAppUrl = "https://multi-ticket.vercel.app/" 
    
  return (
    <div>
      {/* Hero Section */}
      <section className="hero">
        <div className="circle circle-large"></div>
        <div className="circle circle-small"></div>
        
        <div className="container">
          <div style={{ 
            position: 'relative', 
            zIndex: 10, 
            textAlign: 'center', 
            width: '100%',
            // Container for the title and the new button
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}>
            {/* NEW: Back to Main Apps Button */}
            <a 
              href={mainAppUrl} 
              className="btn btn-tertiary" 
              style={{
                position: 'absolute',
                top: '-30px', // Position it above the main content
                right: '0',
                fontSize: '0.9rem',
                padding: '0.5rem 1rem',
                textDecoration: 'none',
                backgroundColor: 'rgba(255, 255, 255, 0.2)',
                color: 'white',
                border: '1px solid rgba(255, 255, 255, 0.3)',
                backdropFilter: 'blur(5px)'
              }}
            >
              ← Back to Main Apps
            </a>

            <h1 style={{ fontSize: '3rem', marginBottom: '1rem', fontWeight: 'bold' }}>TicketFlow</h1>
            <h1 style={{ fontSize: '2rem' }} className="hero-title">Streamline Your Support Tickets</h1>
            <div className="hero-subtitle">
              <p>
                A powerful ticket management system built with React.
              </p>
            </div>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link to="/auth/login" className="btn btn-secondary">Login</Link>
              <Link to="/auth/signup" className="btn btn-primary">Get Started</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="why-choose-section">
        <div className="container">
          <h2>Why Choose TicketFlow?</h2>
          <div className="why-choose-grid">
            <div className="why-choose-card">
              <div className="feature-icon">🚀</div>
              <h3>Lightning Fast</h3>
              <p>Built with React for blazing fast performance and clean, maintainable code.</p>
            </div>
            <div className="why-choose-card">
              <div className="feature-icon">🔒</div>
              <h3>Secure Authentication</h3>
              <p>Client-side authentication with localStorage security and session management.</p>
            </div>
            <div className="why-choose-card">
              <div className="feature-icon">🎯</div>
              <h3>Simple CRUD</h3>
              <p>Create, read, update, and delete tickets with an intuitive interface.</p>
            </div>
            <div className="why-choose-card">
              <div className="feature-icon">📱</div>
              <h3>Responsive Design</h3>
              <p>Works perfectly on desktop, tablet, and mobile devices.</p>
            </div>
          </div>
        </div>
      </section>

      <div className="tech-section">
        <div className="container">
          <h2 className="section-title">Built with Modern Technologies</h2>
          <div className="tech-stack">
            <div className="tech-item">
              <span className="tech-name">React</span>
              <span className="tech-desc">Component-Based Framework</span>
            </div>
            <div className="tech-item">
              <span className="tech-name">React Router</span>
              <span className="tech-desc">Client-side Navigation</span>
            </div>
            <div className="tech-item">
              <span className="tech-name">React Hooks</span>
              <span className="tech-desc">Modern State Management</span>
            </div>
            <div className="tech-item">
              <span className="tech-name">CSS3</span>
              <span className="tech-desc">Modern Styling</span>
            </div>
          </div>
          </div>
      </div>
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