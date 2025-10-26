<template>
  <div>
    <section class="hero">
      <div class="circle circle-large"></div>
      <div class="circle circle-small"></div>
      
      <div class="container">
        <div style="position: relative; z-index: 10; text-align: center; width: 100%">
          <h1 style="font-size: 3rem; margin-bottom: 1rem; font-weight: bold">TicketFlow</h1>
          <p style="font-size: 1.25rem; margin-bottom: 2rem; max-width: 600px; margin: 0 auto 2rem; opacity: 0.9">
            Streamline your support process with our powerful ticket management system
          </p>
          <div style="display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap">
            <router-link to="/auth/login" class="btn btn-secondary">Login</router-link>
            <router-link to="/auth/signup" class="btn btn-primary">Get Started</router-link>
          </div>
        </div>
      </div>
    </section>

    <section style="padding: 4rem 0">
      <div class="container">
        <h2 style="text-align: center; margin-bottom: 3rem; font-size: 2.5rem">Why Choose TicketFlow?</h2>
        <div class="grid grid-cols-3">
          <div class="card">
            <h3 style="margin-bottom: 1rem; color: var(--primary-color)">Easy Ticket Management</h3>
            <p>Create, track, and resolve tickets with our intuitive interface.</p>
          </div>
          <div class="card">
            <h3 style="margin-bottom: 1rem; color: var(--primary-color)">Real-time Updates</h3>
            <p>Stay informed with live status updates and notifications.</p>
          </div>
          <div class="card">
            <h3 style="margin-bottom: 1rem; color: var(--primary-color)">Team Collaboration</h3>
            <p>Work together seamlessly with your support team.</p>
          </div>
        </div>
      </div>
    </section>

    <footer style="background: var(--gray-100); padding: 2rem 0; margin-top: 4rem">
      <div class="container">
        <p style="text-align: center; color: var(--gray-700)">
          &copy; 2024 TicketFlow. All rights reserved.
        </p>
      </div>
    </footer>
  </div>
</template>

<script setup>
</script>