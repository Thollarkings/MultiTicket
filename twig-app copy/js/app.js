class TicketApp {
    constructor() {
        this.currentPage = 'landing';
        this.init();
    }

    init() {
        // Check authentication status
        this.checkAuth();
        
        // Load initial page based on auth status
        this.loadPage(this.currentPage);
        
        // Set up event listeners
        this.setupEventListeners();
    }

    checkAuth() {
        const token = localStorage.getItem('ticketapp_session');
        if (token && window.location.hash !== '#logout') {
            this.currentPage = 'dashboard';
        }
    }

    setupEventListeners() {
        // Handle navigation
        window.addEventListener('hashchange', () => {
            this.handleRouteChange();
        });

        // Initial route handling
        this.handleRouteChange();
    }

    handleRouteChange() {
        const hash = window.location.hash.replace('#', '');
        
        switch(hash) {
            case 'login':
            case 'signup':
                this.loadPage('auth', hash);
                break;
            case 'dashboard':
                if (this.isAuthenticated()) {
                    this.loadPage('dashboard');
                } else {
                    this.redirectToLogin();
                }
                break;
            case 'tickets':
                if (this.isAuthenticated()) {
                    this.loadPage('tickets');
                } else {
                    this.redirectToLogin();
                }
                break;
            case 'logout':
                this.logout();
                break;
            default:
                if (this.isAuthenticated() && !hash) {
                    this.loadPage('dashboard');
                } else {
                    this.loadPage('landing');
                }
        }
    }

    isAuthenticated() {
        return !!localStorage.getItem('ticketapp_session');
    }

    redirectToLogin() {
        window.location.hash = 'login';
    }

    async loadPage(page, subpage = null) {
        this.currentPage = page;
        
        try {
            const response = await fetch(`pages/${page}.html`);
            let html = await response.text();
            
            // Inject dynamic content based on page
            html = this.injectDynamicContent(html, subpage);
            
            document.getElementById('app').innerHTML = html;
            
            // Initialize page-specific functionality
            this.initializePage(page, subpage);
            
        } catch (error) {
            console.error('Error loading page:', error);
            this.showToast('Error loading page', 'error');
        }
    }

    injectDynamicContent(html, subpage) {
        // Replace template variables
        if (subpage === 'login') {
            html = html.replace(/{{auth_type}}/g, 'login')
                       .replace(/{{auth_title}}/g, 'Welcome Back')
                       .replace(/{{auth_button}}/g, 'Login');
        } else if (subpage === 'signup') {
            html = html.replace(/{{auth_type}}/g, 'signup')
                       .replace(/{{auth_title}}/g, 'Create Account')
                       .replace(/{{auth_button}}/g, 'Sign Up');
        }
        
        return html;
    }

    initializePage(page, subpage) {
        switch(page) {
            case 'auth':
                authModule.init(subpage);
                break;
            case 'dashboard':
                this.initDashboard();
                break;
            case 'tickets':
                ticketsModule.init();
                break;
            case 'landing':
                this.initLanding();
                break;
        }
    }

    initDashboard() {
        // Load dashboard stats
        this.loadDashboardStats();
        
        // Set up dashboard event listeners
        document.getElementById('logoutBtn')?.addEventListener('click', () => {
            window.location.hash = 'logout';
        });
    }

    initLanding() {
        // Landing page specific initialization
        document.getElementById('getStartedBtn')?.addEventListener('click', () => {
            window.location.hash = 'signup';
        });
        
        document.getElementById('loginBtn')?.addEventListener('click', () => {
            window.location.hash = 'login';
        });
    }

    async loadDashboardStats() {
        const tickets = ticketsModule.getTickets();
        const stats = {
            total: tickets.length,
            open: tickets.filter(t => t.status === 'open').length,
            inProgress: tickets.filter(t => t.status === 'in_progress').length,
            closed: tickets.filter(t => t.status === 'closed').length
        };

        // Update DOM with stats
        Object.keys(stats).forEach(stat => {
            const element = document.getElementById(`${stat}-tickets`);
            if (element) {
                element.textContent = stats[stat];
            }
        });
    }

    logout() {
        localStorage.removeItem('ticketapp_session');
        localStorage.removeItem('ticketapp_user');
        window.location.hash = '';
        this.loadPage('landing');
    }

    showToast(message, type = 'success') {
        const toast = document.getElementById('toast');
        toast.textContent = message;
        toast.className = `toast ${type} show`;
        
        setTimeout(() => {
            toast.classList.remove('show');
        }, 3000);
    }
}

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.ticketApp = new TicketApp();
});