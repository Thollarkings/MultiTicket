<template>
  <Layout>
    <div class="container" style="padding: 2rem 0">
      <div class="stats-grid">
        <div class="card stat-card">
          <span class="stat-number" style="color: var(--primary-color)">{{ stats.total }}</span>
          <div class="stat-label">Total Tickets</div>
          <p style="margin-top: 0.5rem; font-size: 0.875rem; color: var(--gray-600)">All tickets in the system</p>
        </div>
        <div class="card stat-card">
          <span class="stat-number" style="color: var(--warning-color)">{{ stats.open }}</span>
          <div class="stat-label">Open Tickets</div>
          <p style="margin-top: 0.5rem; font-size: 0.875rem; color: var(--gray-600)">Tickets waiting for action</p>
        </div>
        <div class="card stat-card">
          <span class="stat-number" style="color: var(--success-color)">{{ stats.inProgress }}</span>
          <div class="stat-label">In Progress</div>
          <p style="margin-top: 0.5rem; font-size: 0.875rem; color: var(--gray-600)">Tickets being worked on</p>
        </div>
        <div class="card stat-card">
          <span class="stat-number" style="color: var(--gray-700)">{{ stats.closed }}</span>
          <div class="stat-label">Closed</div>
          <p style="margin-top: 0.5rem; font-size: 0.875rem; color: var(--gray-600)">Resolved tickets</p>
        </div>
      </div>

      </div>
  </Layout>
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