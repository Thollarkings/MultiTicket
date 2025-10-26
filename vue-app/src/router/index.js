import { createRouter, createWebHashHistory } from 'vue-router' // <-- CHANGED IMPORT
import LandingPage from '../views/LandingPage.vue'
import Login from '../views/Login.vue'
import Signup from '../views/Signup.vue'
import Dashboard from '../views/Dashboard.vue'
import TicketManagement from '../views/TicketManagement.vue'

const routes = [
  {
    path: '/',
    name: 'LandingPage',
    component: LandingPage
  },
  {
    path: '/auth/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/auth/signup',
    name: 'Signup',
    component: Signup
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard
  },
  {
    path: '/tickets',
    name: 'TicketManagement',
    component: TicketManagement
  }
]

const router = createRouter({
  history: createWebHashHistory(), // <-- CHANGED to use Hash History
  routes
})

// Add route guard for authentication
router.beforeEach((to, from, next) => {
  const isAuthenticated = localStorage.getItem('ticketapp_session')
  
  if (to.path === '/dashboard' || to.path === '/tickets') {
    if (!isAuthenticated) {
      next('/auth/login')
    } else {
      next()
    }
  } else {
    next()
  }
})

export default router