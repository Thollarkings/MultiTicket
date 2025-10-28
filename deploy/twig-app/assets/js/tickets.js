// Ticket service for CRUD operations
class TicketService {
    constructor() {
        this.initializeStorage();
    }

    // Initialize tickets storage if not exists
    initializeStorage() {
        if (!localStorage.getItem('ticketapp_tickets')) {
            localStorage.setItem('ticketapp_tickets', JSON.stringify([]));
        }
    }

    // Get all tickets for current user
    getTickets() {
        try {
            const tickets = JSON.parse(localStorage.getItem('ticketapp_tickets') || '[]');
            const currentUser = authService.getCurrentUser();
            
            if (!currentUser) {
                return [];
            }

            // Return tickets for current user only
            return tickets.filter(ticket => ticket.userId === currentUser.id);
        } catch (error) {
            console.error('Error getting tickets:', error);
            return [];
        }
    }

    // Get ticket by ID
    getTicket(id) {
        const tickets = this.getTickets();
        return tickets.find(ticket => ticket.id === id);
    }

    // Create new ticket
    createTicket(ticketData) {
        try {
            const currentUser = authService.getCurrentUser();
            if (!currentUser) {
                alert('Please login to create tickets');
                return false;
            }

            const tickets = this.getTickets();
            
            const newTicket = {
                id: Date.now().toString(),
                userId: currentUser.id,
                title: ticketData.title,
                description: ticketData.description,
                priority: ticketData.priority || 'medium',
                status: ticketData.status || 'pending',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            };

            tickets.push(newTicket);
            localStorage.setItem('ticketapp_tickets', JSON.stringify(tickets));
            
            return true;
        } catch (error) {
            console.error('Error creating ticket:', error);
            return false;
        }
    }

    // Update existing ticket
    updateTicket(id, updatedData) {
        try {
            const tickets = this.getTickets();
            const ticketIndex = tickets.findIndex(ticket => ticket.id === id);
            
            if (ticketIndex === -1) {
                return false;
            }

            tickets[ticketIndex] = {
                ...tickets[ticketIndex],
                ...updatedData,
                updatedAt: new Date().toISOString()
            };

            localStorage.setItem('ticketapp_tickets', JSON.stringify(tickets));
            return true;
        } catch (error) {
            console.error('Error updating ticket:', error);
            return false;
        }
    }

    // Delete ticket
    deleteTicket(id) {
        try {
            const tickets = this.getTickets();
            const filteredTickets = tickets.filter(ticket => ticket.id !== id);
            localStorage.setItem('ticketapp_tickets', JSON.stringify(filteredTickets));
            return true;
        } catch (error) {
            console.error('Error deleting ticket:', error);
            return false;
        }
    }

    // Get tickets by status
    getTicketsByStatus(status) {
        const tickets = this.getTickets();
        return tickets.filter(ticket => ticket.status === status);
    }

    // Get tickets by priority
    getTicketsByPriority(priority) {
        const tickets = this.getTickets();
        return tickets.filter(ticket => ticket.priority === priority);
    }

    // Search tickets
    searchTickets(query) {
        const tickets = this.getTickets();
        const searchTerm = query.toLowerCase();
        
        return tickets.filter(ticket => 
            ticket.title.toLowerCase().includes(searchTerm) ||
            ticket.description.toLowerCase().includes(searchTerm)
        );
    }

    // Get dashboard statistics
    getDashboardStats() {
        const tickets = this.getTickets();
        
        return {
            total: tickets.length,
            pending: tickets.filter(t => t.status === 'pending').length,
            inProgress: tickets.filter(t => t.status === 'in-progress').length,
            resolved: tickets.filter(t => t.status === 'resolved').length,
            highPriority: tickets.filter(t => t.priority === 'high').length,
            mediumPriority: tickets.filter(t => t.priority === 'medium').length,
            lowPriority: tickets.filter(t => t.priority === 'low').length
        };
    }

    // Get recent tickets (last 5)
    getRecentTickets(limit = 5) {
        const tickets = this.getTickets();
        return tickets
            .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
            .slice(0, limit);
    }

    // Bulk update tickets (for batch operations)
    bulkUpdate(ticketIds, updates) {
        try {
            const tickets = this.getTickets();
            const updatedTickets = tickets.map(ticket => {
                if (ticketIds.includes(ticket.id)) {
                    return {
                        ...ticket,
                        ...updates,
                        updatedAt: new Date().toISOString()
                    };
                }
                return ticket;
            });

            localStorage.setItem('ticketapp_tickets', JSON.stringify(updatedTickets));
            return true;
        } catch (error) {
            console.error('Error in bulk update:', error);
            return false;
        }
    }
}

// Initialize ticket service
window.ticketService = new TicketService();

// Utility functions for ticket operations
function formatTicketPriority(priority) {
    const priorityMap = {
        'low': 'Low',
        'medium': 'Medium', 
        'high': 'High'
    };
    return priorityMap[priority] || priority;
}

function formatTicketStatus(status) {
    const statusMap = {
        'pending': 'Pending',
        'in-progress': 'In Progress',
        'resolved': 'Resolved'
    };
    return statusMap[status] || status;
}

function getPriorityColor(priority) {
    const colorMap = {
        'low': '#10b981',
        'medium': '#f59e0b',
        'high': '#ef4444'
    };
    return colorMap[priority] || '#6b7280';
}

function getStatusColor(status) {
    const colorMap = {
        'pending': '#f59e0b',
        'in-progress': '#3b82f6',
        'resolved': '#10b981'
    };
    return colorMap[status] || '#6b7280';
}