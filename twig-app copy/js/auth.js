class AuthModule {
    constructor() {
        this.currentForm = null;
    }

    init(type = 'login') {
        this.currentForm = type;
        this.setupAuthForm();
    }

    setupAuthForm() {
        const form = document.getElementById('authForm');
        if (!form) return;

        form.addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleAuth();
        });

        // Add real-time validation
        const inputs = form.querySelectorAll('.form-input');
        inputs.forEach(input => {
            input.addEventListener('blur', () => {
                this.validateField(input);
            });
        });
    }

    validateField(field) {
        const errorElement = field.parentElement.querySelector('.form-error');
        let isValid = true;
        let errorMessage = '';

        switch(field.name) {
            case 'email':
                if (!field.value) {
                    errorMessage = 'Email is required';
                    isValid = false;
                } else if (!this.isValidEmail(field.value)) {
                    errorMessage = 'Please enter a valid email';
                    isValid = false;
                }
                break;
            case 'password':
                if (!field.value) {
                    errorMessage = 'Password is required';
                    isValid = false;
                } else if (field.value.length < 6) {
                    errorMessage = 'Password must be at least 6 characters';
                    isValid = false;
                }
                break;
            case 'name':
                if (this.currentForm === 'signup' && !field.value) {
                    errorMessage = 'Name is required';
                    isValid = false;
                }
                break;
        }

        if (isValid) {
            errorElement.classList.remove('show');
            field.style.borderColor = '';
        } else {
            errorElement.textContent = errorMessage;
            errorElement.classList.add('show');
            field.style.borderColor = '#ef4444';
        }

        return isValid;
    }

    isValidEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    async handleAuth() {
        const form = document.getElementById('authForm');
        const formData = new FormData(form);
        const data = Object.fromEntries(formData);
        
        // Validate all fields
        let allValid = true;
        const inputs = form.querySelectorAll('.form-input');
        inputs.forEach(input => {
            if (!this.validateField(input)) {
                allValid = false;
            }
        });

        if (!allValid) {
            window.ticketApp.showToast('Please fix the errors above', 'error');
            return;
        }

        // Simulate API call
        const button = form.querySelector('button[type="submit"]');
        button.disabled = true;
        button.textContent = 'Please wait...';

        try {
            // Simulate network delay
            await new Promise(resolve => setTimeout(resolve, 1000));

            if (this.currentForm === 'login') {
                this.handleLogin(data);
            } else {
                this.handleSignup(data);
            }
        } catch (error) {
            window.ticketApp.showToast('Authentication failed', 'error');
        } finally {
            button.disabled = false;
            button.textContent = this.currentForm === 'login' ? 'Login' : 'Sign Up';
        }
    }

    handleLogin(data) {
        // Check if user exists in localStorage
        const users = JSON.parse(localStorage.getItem('ticketapp_users') || '[]');
        const user = users.find(u => u.email === data.email && u.password === data.password);

        if (user) {
            // Create session
            const session = {
                user: { id: user.id, name: user.name, email: user.email },
                token: 'mock-jwt-token-' + Date.now(),
                expires: Date.now() + (24 * 60 * 60 * 1000) // 24 hours
            };

            localStorage.setItem('ticketapp_session', JSON.stringify(session));
            localStorage.setItem('ticketapp_user', JSON.stringify(user));
            
            window.ticketApp.showToast('Login successful!', 'success');
            setTimeout(() => {
                window.location.hash = 'dashboard';
            }, 1000);
        } else {
            window.ticketApp.showToast('Invalid email or password', 'error');
        }
    }

    handleSignup(data) {
        const users = JSON.parse(localStorage.getItem('ticketapp_users') || '[]');
        
        // Check if user already exists
        if (users.find(u => u.email === data.email)) {
            window.ticketApp.showToast('User already exists with this email', 'error');
            return;
        }

        // Create new user
        const newUser = {
            id: Date.now().toString(),
            name: data.name,
            email: data.email,
            password: data.password,
            createdAt: new Date().toISOString()
        };

        users.push(newUser);
        localStorage.setItem('ticketapp_users', JSON.stringify(users));

        // Auto-login after signup
        const session = {
            user: { id: newUser.id, name: newUser.name, email: newUser.email },
            token: 'mock-jwt-token-' + Date.now(),
            expires: Date.now() + (24 * 60 * 60 * 1000)
        };

        localStorage.setItem('ticketapp_session', JSON.stringify(session));
        localStorage.setItem('ticketapp_user', JSON.stringify(newUser));
        
        window.ticketApp.showToast('Account created successfully!', 'success');
        setTimeout(() => {
            window.location.hash = 'dashboard';
        }, 1000);
    }
}

const authModule = new AuthModule();