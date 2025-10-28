<template>
  <div style="min-height: 100vh; display: flex; align-items: center; justify-content: center; background: var(--gray-100); padding: 1rem">
    <div class="card" style="max-width: 400px; width: 100%">
      <h2 style="text-align: center; margin-bottom: 2rem">Login to TicketFlow</h2>
      
      <div v-if="error" style="background: var(--error-color); color: white; padding: 0.75rem; border-radius: var(--border-radius); margin-bottom: 1rem; text-align: center">
        {{ error }}
      </div>

      <form @submit.prevent="handleLogin">
        <div class="form-group">
          <label class="form-label">Email</label>
          <input
            type="email"
            class="form-input"
            v-model="email"
            required
            placeholder="Enter your email"
          />
        </div>

        <div class="form-group">
          <label class="form-label">Password</label>
          <input
            type="password"
            class="form-input"
            v-model="password"
            required
            placeholder="Enter your password"
          />
        </div>

        <button 
          type="submit" 
          class="btn btn-primary"
          style="width: 100%; margin-top: 1rem"
          :disabled="loading"
        >
          {{ loading ? 'Logging in...' : 'Login' }}
        </button>
      </form>

      <p style="text-align: center; margin-top: 1rem">
        Don't have an account? <router-link to="/auth/signup">Sign up</router-link>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data() {
    return {
      email: '',
      password: '',
      error: '',
      loading: false
    }
  },
  methods: {
    async handleLogin() {
      this.error = ''
      this.loading = true

      try {
        // Mock authentication
        if (this.email && this.password) {
          const userData = {
            id: 1,
            email: this.email,
            name: this.email.split('@')[0]
          }
          localStorage.setItem('ticketapp_session', JSON.stringify(userData))
          // Redirect to dashboard (to be implemented)
          this.$router.push('/dashboard')
        } else {
          this.error = 'Invalid credentials'
        }
      } catch (err) {
        this.error = 'Failed to login. Please try again.'
      } finally {
        this.loading = false
      }
    }
  }
}
</script>