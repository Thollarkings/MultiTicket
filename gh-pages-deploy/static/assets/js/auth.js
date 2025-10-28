// Authentication service using localStorage
class AuthService {
    constructor() {
        this.currentUser = this.getCurrentUser();
    }

    // Sign up new user
    signup(name, email, password) {
        try {
            // Get existing users or initialize empty array
            const users = JSON.parse(localStorage.getItem('ticketapp_users') || '[]');
            
            // Check if user already exists
            const existingUser = users.find(user => user.email === email);
            if (existingUser) {
                return {
                    success: false,
                    message: 'User with this email already exists'
                };
            }

            // Create new user
            const newUser = {
                id: Date.now().toString(),
                name,
                email,
                password: btoa(password), // Simple encoding (not secure for production)
                createdAt: new Date().toISOString()
            };

            // Save user
            users.push(newUser);
            localStorage.setItem('ticketapp_users', JSON.stringify(users));

            // Auto-login after signup
            this.login(email, password);

            return {
                success: true,
                message: 'Account created successfully!',
                user: newUser
            };
        } catch (error) {
            console.error('Signup error:', error);
            return {
                success: false,
                message: 'An error occurred during signup'
            };
        }
    }

    // Login user
    login(email, password) {
        try {
            const users = JSON.parse(localStorage.getItem('ticketapp_users') || '[]');
            const user = users.find(u => u.email === email && u.password === btoa(password));
            
            if (!user) {
                return {
                    success: false,
                    message: 'Invalid email or password'
                };
            }

            // Create session (without password)
            const sessionUser = { ...user };
            delete sessionUser.password;
            
            localStorage.setItem('ticketapp_session', JSON.stringify(sessionUser));
            this.currentUser = sessionUser;

            // Redirect to dashboard.html (static version)
            setTimeout(() => {
                window.location.href = 'dashboard.html';
            }, 100);

            return {
                success: true,
                message: 'Login successful!',
                user: sessionUser
            };
        } catch (error) {
            console.error('Login error:', error);
            return {
                success: false,
                message: 'An error occurred during login'
            };
        }
    }

    // Logout user
    logout() {
        localStorage.removeItem('ticketapp_session');
        this.currentUser = null;
        window.location.href = 'index.html'; // Changed to .html
    }

    // Get current user from localStorage
    getCurrentUser() {
        try {
            const userStr = localStorage.getItem('ticketapp_session');
            return userStr ? JSON.parse(userStr) : null;
        } catch (error) {
            console.error('Error getting current user:', error);
            return null;
        }
    }

    // Check if user is authenticated
    isAuthenticated() {
        return this.getCurrentUser() !== null;
    }
}

// Initialize auth service
window.authService = new AuthService();