<template>
  <div>
    <nav class="nav">
      <div class="container">
        <div class="nav-content">
          <router-link to="/dashboard" class="nav-link" style="font-size: 1.25rem; font-weight: bold">
            TicketFlow
          </router-link>
          <div class="nav-links">
            <router-link to="/dashboard" class="nav-link">Dashboard</router-link>
            <router-link to="/tickets" class="nav-link">Tickets</router-link>
            <span class="nav-link">Welcome, {{ user ? user.name : 'User' }}</span> 
            <button @click="handleLogout" class="btn btn-secondary" style="padding: 0.5rem 1rem">
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
    <main>
      <slot /> </main>
  </div>
</template>

<script>
export default {
  name: 'Layout',
  data() {
    return {
      user: null
    }
  },
  mounted() {
    this.getUser()
  },
  methods: {
    getUser() {
      const session = localStorage.getItem('ticketapp_session')
      if (session) {
        this.user = JSON.parse(session)
      }
    },
    handleLogout() {
      localStorage.removeItem('ticketapp_session')
      this.$router.push('/')
    }
  }
}
</script>