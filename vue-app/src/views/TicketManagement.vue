<template>
  <Layout>
    <div class="container" style="padding: 2rem 0">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2rem">
        <h1>Ticket Management</h1>
        <button @click="showForm = true" class="btn btn-primary" v-if="!showForm">
          Create New Ticket
        </button>
      </div>

      <div v-if="showForm" class="card">
        <h3>{{ editingTicket ? 'Edit Ticket' : 'Create New Ticket' }}</h3>
        
        <form @submit.prevent="handleSubmit">
          <div class="form-group">
            <label class="form-label">Title *</label>
            <input
              type="text"
              class="form-input"
              v-model="formData.title"
              placeholder="Enter ticket title"
              required
            />
          </div>

          <div class="form-group">
            <label class="form-label">Description</label>
            <textarea
              class="form-textarea"
              v-model="formData.description"
              placeholder="Enter ticket description"
              rows="4"
            />
          </div>

          <div class="form-group">
            <label class="form-label">Status *</label>
            <select class="form-select" v-model="formData.status" required>
              <option value="open">Open</option>
              <option value="in_progress">In Progress</option>
              <option value="closed">Closed</option>
            </select>
          </div>

          <div class="form-group">
            <label class="form-label">Priority</label>
            <select class="form-select" v-model="formData.priority">
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>

          <div style="display: flex; gap: 1rem; margin-top: 1.5rem">
            <button type="submit" class="btn btn-primary">
              {{ editingTicket ? 'Update Ticket' : 'Create Ticket' }}
            </button>
            <button type="button" class="btn btn-secondary" @click="cancelForm">
              Cancel
            </button>
          </div>
        </form>
      </div>

      <div v-else>
        <div v-if="tickets.length === 0" class="card" style="text-align: center; padding: 3rem">
          <h3>No tickets found</h3>
          <p>Create your first ticket to get started!</p>
        </div>

        <div v-else>
          <div v-for="ticket in tickets" :key="ticket.id" class="card ticket-card">
            <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 1rem">
              <div style="flex: 1">
                <h4 style="margin-bottom: 0.5rem">{{ ticket.title }}</h4>
                <p v-if="ticket.description" style="color: var(--gray-600); margin-bottom: 0.5rem">
                  {{ ticket.description }}
                </p>
                <div style="display: flex; gap: 1rem; align-items: center; flex-wrap: wrap">
                  <span :class="`status-tag status-${ticket.status}`">
                    {{ getStatusLabel(ticket.status) }}
                  </span>
                  <span style="font-size: 0.875rem; color: var(--gray-600)">
                    {{ ticket.priority }} priority
                  </span>
                  <span style="font-size: 0.875rem; color: var(--gray-500)">
                    #{{ ticket.id }}
                  </span>
                </div>
              </div>
            </div>
            
            <div class="ticket-actions">
              <button @click="editTicket(ticket)" class="btn btn-secondary" style="padding: 0.5rem 1rem">
                Edit
              </button>
              <button @click="deleteTicket(ticket.id)" class="btn btn-danger" style="padding: 0.5rem 1rem">
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Layout>
</template>

<script>
import Layout from '../components/Layout.vue'

export default {
  name: 'TicketManagement',
  components: {
    Layout
  },
  data() {
    return {
      tickets: [],
      showForm: false,
      editingTicket: null,
      formData: this.getInitialFormData() // Use a helper for fresh state
    }
  },
  mounted() {
    this.loadTickets()
  },
  methods: {
    getInitialFormData() {
      return {
        title: '',
        description: '',
        status: 'open',
        priority: 'medium'
      }
    },
    loadTickets() {
      const storedTickets = localStorage.getItem('ticketapp_tickets')
      if (storedTickets) {
        this.tickets = JSON.parse(storedTickets)
      }
    },
    saveTickets() {
      // FIX: Ensure tickets are sorted by ID/creation date descending
      this.tickets.sort((a, b) => b.id - a.id)
      localStorage.setItem('ticketapp_tickets', JSON.stringify(this.tickets))
    },
    getStatusLabel(status) {
      const statusMap = {
        open: 'Open',
        in_progress: 'In Progress',
        closed: 'Closed'
      }
      return statusMap[status] || 'Open'
    },
    handleSubmit() {
      // Simple validation for title (since input is required, this is backup)
      if (!this.formData.title) {
        alert('Title is required!')
        return
      }

      if (this.editingTicket) {
        // Update ticket
        this.tickets = this.tickets.map(ticket =>
          ticket.id === this.editingTicket.id
            ? { ...this.formData, id: ticket.id, updatedAt: new Date().toISOString() }
            : ticket
        )
      } else {
        // Create new ticket
        const newTicket = {
          ...this.formData,
          id: Date.now(), // Use unique ID for key
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        }
        // Use Vue.js reactivity to add to the front
        this.tickets.unshift(newTicket) 
      }
      
      this.saveTickets()
      this.cancelForm()
      alert('Ticket saved successfully!')
    },
    editTicket(ticket) {
      this.editingTicket = ticket
      // Use Object.assign to avoid shallow copy issues with reactivity
      this.formData = Object.assign({}, ticket) 
      this.showForm = true
    },
    deleteTicket(ticketId) {
      if (confirm('Are you sure you want to delete this ticket?')) {
        this.tickets = this.tickets.filter(ticket => ticket.id !== ticketId)
        this.saveTickets()
        alert('Ticket deleted successfully!')
      }
    },
    cancelForm() {
      this.showForm = false
      this.editingTicket = null
      // Reset form data using the helper method
      this.formData = this.getInitialFormData() 
    }
  }
}
</script>