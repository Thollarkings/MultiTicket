import React from 'react'
import { Link } from 'react-router-dom'

function LandingPage() {
  return (
    <div>
      {/* Hero Section */}
            <section className="hero">
        <div className="circle circle-large"></div>
        <div className="circle circle-small"></div>
        
        <div className="container">
          <div style={{ position: 'relative', zIndex: 10, textAlign: 'center', width: '100%' }}>
            <h1 style={{ fontSize: '3rem', marginBottom: '1rem', fontWeight: 'bold' }}>TicketFlow</h1>
            <h1 style={{ fontSize: '2rem' }} className="hero-title">Streamline Your Support Tickets</h1>
            
            
            <div style={{ maxWidth: '1024px', margin: '0 auto', textAlign: 'left' }}>
              
              <div className="hero-subtitle">
                <p>
                  A powerful ticket management system built with React.
                </p>
              </div>

              <div style={{ marginTop: '0.75rem', marginBottom: '1.5rem', fontSize: '1.1rem' }}>
                  <a 
                    href="https://multi-ticket.vercel.app/" 
                    className="link-back"
                    style={{ 
                      color: 'var(--gray-900)', 
                      textDecoration: 'underline', 
                      textShadow: 'none' // Correct camelCase property
                    }}
                  >
                    ← Return to Main App Selection
                  </a>
              </div>
            </div>
            {/* END FIX */}

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