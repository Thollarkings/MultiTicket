<template>
  <div>
    <section class="hero">
      <div class="circle circle-large"></div>
      <div class="circle circle-small"></div>
      
      <div class="container">
        <div style="position: relative; z-index: 10; text-align: center; width: 100%">
          <h1 style="font-size: 3rem; margin-bottom: 1rem; font-weight: bold">TicketFlow</h1>
          <h1 style="font-size: 2rem;" class="hero-title">Streamline Your Support Tickets</h1>
          <div class="hero-subtitle">
          <p>
            A powerful ticket management system built with vue.js.
          </p>
          <p style="margin-top: 0.75rem; font-size: 1.1rem">
            <a 
              href="https://multi-ticket.vercel.app/" 
              class="link-back"
              style="color: var(--gray-900); text-decoration: underline"
            >
              ← Return to Main App Selection
            </a>
          </p>
          </div>
          <div style="display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap">
            <router-link to="/auth/login" class="btn btn-secondary">Login</router-link>
            <router-link to="/auth/signup" class="btn btn-primary">Get Started</router-link>
          </div>
        </div>
      </div>
    </section>

<section class="why-choose-section">
    <div class="container">
        <h2>Why Choose TicketFlow?</h2>
        <div class="why-choose-grid">
            <div class="why-choose-card">
                <div class="feature-icon">🚀</div>
                <h3>Lightning Fast</h3>
                <p>Built with Twig templating for blazing fast performance and clean, maintainable code.</p>
            </div>
            <div class="why-choose-card">
                <div class="feature-icon">🔒</div>
                <h3>Secure Authentication</h3>
                <p>Client-side authentication with localStorage security and session management.</p>
            </div>
            <div class="why-choose-card">
                <div class="feature-icon">🎯</div>
                <h3>Simple CRUD</h3>
                <p>Create, read, update, and delete tickets with an intuitive interface.</p>
            </div>
            <div class="why-choose-card">
                <div class="feature-icon">📱</div>
                <h3>Responsive Design</h3>
                <p>Works perfectly on desktop, tablet, and mobile devices.</p>
            </div>
        </div>
    </div>
</section>

<div class="tech-section">
    <div class="container">
        <h2 class="section-title">Built with Modern Technologies</h2>
        <div class="tech-stack">
            <div class="tech-item">
                <span class="tech-name">Vue.js</span>
                <span class="tech-desc">Reactive Frontend Framework</span>
            </div>
            <div class="tech-item">
                <span class="tech-name">Vue Router</span>
                <span class="tech-desc">Client-side Navigation</span>
            </div>
            <div class="tech-item">
                <span class="tech-name">Composition API</span>
                <span class="tech-desc">Modern State Management</span>
            </div>
            <div class="tech-item">
                <span class="tech-name">CSS3</span>
                <span class="tech-desc">Modern Styling</span>
            </div>
        </div>
    </div>
</div>

    <footer style="background: var(--gray-100); padding: 2rem 0; margin-top: 4rem">
      <div class="container">
        <p style="text-align: center; color: var(--gray-700)">
          &copy; 2024 TicketFlow. All rights reserved.
        </p>
      </div>
    </footer>
  </div>
</template>

<script>
export default {
  name: 'LandingPage'
}
</script>