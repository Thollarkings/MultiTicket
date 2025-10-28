// Shared utilities and initialization
class App {
    constructor() {
        this.init();
    }

    init() {
        console.log('Ticket App Initialized');
        this.setupEventListeners();
    }

    setupEventListeners() {
        // Global event listeners can be added here
    }

    // Utility function to show toast messages
    showToast(message, type = 'success') {
        // Remove existing toasts
        const existingToast = document.querySelector('.toast');
        if (existingToast) {
            existingToast.remove();
        }

        // Create new toast
        const toast = document.createElement('div');
        toast.className = `toast ${type}`;
        toast.textContent = message;
        document.body.appendChild(toast);

        // Remove toast after 3 seconds
        setTimeout(() => {
            toast.remove();
        }, 3000);
    }

    // Format date for display
    formatDate(dateString) {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    }
}

// Initialize app when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    window.app = new App();
});

// Check if user is on auth page
function isAuthPage() {
    const currentPage = window.location.pathname.split('/').pop();
    const authPages = ['login.html', 'signup.html', 'index.html', ''];
    return authPages.includes(currentPage);
}

// Global auth check on page load
document.addEventListener('DOMContentLoaded', function() {
    const user = localStorage.getItem('ticketapp_session');
    const currentPage = window.location.pathname.split('/').pop();
    
    console.log('Current page:', currentPage);
    console.log('User logged in:', !!user);

    // If not on auth page and no user, redirect to login
    if (!user && !isAuthPage()) {
        console.log('Redirecting to login...');
        window.location.href = 'login.html';
        return;
    }

    // If on auth page and user exists, redirect to dashboard
    if (user && isAuthPage() && currentPage !== 'index.html' && currentPage !== '') {
        console.log('Redirecting to dashboard...');
        window.location.href = 'dashboard.html';
        return;
    }
});