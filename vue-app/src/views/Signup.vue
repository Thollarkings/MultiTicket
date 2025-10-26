<template>
  <div style="min-height: 100vh; display: flex; align-items: center; justify-content: center; background: var(--gray-100); padding: 1rem">
    <div class="card" style="max-width: 400px; width: 100%">
      <h2 style="text-align: center; margin-bottom: 2rem">Create Account</h2>
      
      <div v-if="error" style="background: var(--error-color); color: white; padding: 0.75rem; border-radius: var(--border-radius); margin-bottom: 1rem; text-align: center">
        {{ error }}
      </div>

      <form @submit.prevent="handleSignup">
        <div class="form-group">
          <label class="form-label">Full Name</label>
          <input
            type="text"
            class="form-input"
            v-model="name"
            required
            placeholder="Enter your full name"
          />
        </div>

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

        <div class="form-group">
          <label class="form-label">Confirm Password</label>
          <input
            type="password"
            class="form-input"
            v-model="confirmPassword"
            required
            placeholder="Confirm your password"
          />
        </div>

        <button 
          type="submit" 
          class="btn btn-primary"
          style="width: 100%; margin-top: 1rem"
          :disabled="loading"
        >
          {{ loading ? 'Creating Account...' : 'Sign Up' }}
        </button>
      </form>

      <p style="text-align: center; margin-top: 1rem">
        Already have an account? <router-link to="/auth/login">Login</router-link>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Signup',
  data() {
    return {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      error: '',
      loading: false
    }
  },
  methods: {
    async handleSignup() {
      this.error = ''

      if (this.password !== this.confirmPassword) {
        this.error = 'Passwords do not match'
        return
      }

      if (this.password.length < 6) {
        this.error = 'Password must be at least 6 characters'
        return
      }

      this.loading = true

      try {
        // Mock signup
        if (this.email && this.password && this.name) {
          const userData = {
            id: Date.now(),
            email: this.email,
            name: this.name
          }
          localStorage.setItem('ticketapp_session', JSON.stringify(userData))
          // Redirect to dashboard (to be implemented)
          this.$router.push('/dashboard')
        } else {
          this.error = 'Please fill all fields'
        }
      } catch (err) {
        this.error = 'Failed to create account. Please try again.'
      } finally {
        this.loading = false
      }
    }
  }
}
</script>