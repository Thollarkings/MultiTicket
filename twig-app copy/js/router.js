// Router is now integrated into app.js
// This file is kept for future expansion if needed

class Router {
    constructor() {
        this.routes = {};
        this.currentRoute = '';
    }

    addRoute(path, handler) {
        this.routes[path] = handler;
    }

    navigate(path) {
        window.location.hash = path;
    }

    handleRoute() {
        const hash = window.location.hash.replace('#', '') || '/';
        this.currentRoute = hash;

        if (this.routes[hash]) {
            this.routes[hash]();
        } else {
            // Default route
            this.routes['/']();
        }
    }
}

// Export for potential future use
window.Router = Router;