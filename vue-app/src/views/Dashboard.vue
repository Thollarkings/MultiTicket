<template>
  <Layout>
    <div class="container" style="padding: 2rem 0">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2rem">
        <h1>Dashboard</h1>
        <router-link to="/tickets" class="btn btn-primary">Manage Tickets</router-link>
      </div>
      
      <div class="stats-grid">
        <div class="card stat-card">
          <span class="stat-number" style="color: var(--primary-color)">24</span>
          <div class="stat-label">Total Tickets</div>
          <p style="margin-top: 0.5rem; font-size: 0.875rem; color: var(--gray-600)">All tickets in the system</p>
        </div>
        <div class="card stat-card">
          <span class="stat-number" style="color: var(--warning-color)">8</span>
          <div class="stat-label">Open Tickets</div>
          <p style="margin-top: 0.5rem; font-size: 0.875rem; color: var(--gray-600)">Tickets waiting for action</p>
        </div>
        <div class="card stat-card">
          <span class="stat-number" style="color: var(--success-color)">12</span>
          <div class="stat-label">In Progress</div>
          <p style="margin-top: 0.5rem; font-size: 0.875rem; color: var(--gray-600)">Tickets being worked on</p>
        </div>
        <div class="card stat-card">
          <span class="stat-number" style="color: var(--gray-700)">4</span>
          <div class="stat-label">Closed</div>
          <p style="margin-top: 0.5rem; font-size: 0.875rem; color: var(--gray-600)">Resolved tickets</p>
        </div>
      </div>

      <div class="card" style="margin-top: 2rem">
        <h3 style="margin-bottom: 1rem">Quick Actions</h3>
        <div style="display: flex; gap: 1rem; flex-wrap: wrap">
          <router-link to="/tickets?create=new" class="btn btn-primary">Create New Ticket</router-link>
          <router-link to="/tickets?status=open" class="btn btn-secondary">View Open Tickets</router-link>
          <router-link to="/tickets?status=in_progress" class="btn btn-secondary">View In Progress</router-link>
        </div>
      </div>
    </div>
  </Layout>
</template>

<script>
import Layout from '../components/Layout.vue'

export default {
  name: 'Dashboard',
  components: {
    Layout
  },
  data() {
    return {
      stats: { // Initial state starts at zero
        total: 0,
        open: 0,
        inProgress: 0,
        closed: 0,
      }
    }
  },
  // When the component mounts, load the data and calculate stats
  mounted() {
    this.calculateStats()
  },
  methods: {
    calculateStats() {
      // Load raw ticket data from localStorage
      const storedTickets = localStorage.getItem('ticketapp_tickets')
      let tickets = []
      
      if (storedTickets) {
        try {
          tickets = JSON.parse(storedTickets)
        } catch (error) {
          console.error('Error parsing stored tickets:', error)
          return
        }
      }

      // Calculate the statistics
      this.stats.total = tickets.length
      this.stats.open = tickets.filter(t => t.status === 'open').length
      this.stats.inProgress = tickets.filter(t => t.status === 'in_progress').length
      this.stats.closed = tickets.filter(t => t.status === 'closed').length
    }
  }
}
</script>