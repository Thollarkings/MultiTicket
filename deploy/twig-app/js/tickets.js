class TicketsModule {
    constructor() {
        this.tickets = this.loadTickets();
        this.editingTicket = null;
    }

    init() {
        this.renderTickets();
        this.setupEventListeners();
        this.loadStats();
    }

    loadTickets() {
        const tickets = JSON.parse(localStorage.getItem('ticketapp_tickets') || '[]');
        // Initialize with sample data if empty
        if (tickets.length === 0) {
            const sampleTickets = [
                {
                    id: '1',
                    title: 'Welcome to TicketWave',
                    description: 'This is your first ticket. You can edit or delete it.',
                    status: 'open',
                    priority: 'medium',
                    createdAt: new Date().toISOString(),
                    createdBy: 'system'
                }
            ];
            localStorage.setItem('ticketapp_tickets', JSON.stringify(sampleTickets));
            return sampleTickets;
        }
        return tickets;
    }

    saveTickets() {
        localStorage.setItem('ticketapp_tickets', JSON.stringify(this.tickets));
    }

    getTickets() {
        return this.tickets;
    }

    renderTickets() {
        const container = document.getElementById('ticketsContainer');
        if (!container) return;

        if (this.tickets.length === 0) {
            container.innerHTML = `
                <div class="empty-state">
                    <h3>No tickets yet</h3>
                    <p>Create your first ticket to get started</p>
                </div>
            `;
            return;
        }

        container.innerHTML = this.tickets.map(ticket => `
            <div class="ticket-card card" data-ticket-id="${ticket.id}">
                <div class="ticket-header">
                    <h3 class="ticket-title">${this.escapeHtml(ticket.title)}</h3>
                    <span class="status-badge status-${ticket.status}">
                        ${ticket.status.replace('_', ' ')}
                    </span>
                </div>
                ${ticket.description ? `<p class="ticket-description">${this.escapeHtml(ticket.description)}</p>` : ''}
                ${ticket.priority ? `<div class="ticket-priority">Priority: <span class="priority-${ticket.priority}">${ticket.priority}</span></div>` : ''}
                <div class="ticket-footer">
                    <small class="ticket-date">Created: ${new Date(ticket.createdAt).toLocaleDateString()}</small>
                    <div class="ticket-actions">
                        <button class="btn-edit" onclick="ticketsModule.editTicket('${ticket.id}')">Edit</button>
                        <button class="btn-delete" onclick="ticketsModule.deleteTicket('${ticket.id}')">Delete</button>
                    </div>
                </div>
            </div>
        `).join('');
    }

    setupEventListeners() {
        // Create ticket form
        const createForm = document.getElementById('createTicketForm');
        if (createForm) {
            createForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.createTicket();
            });
        }

        // Edit ticket form
        const editForm = document.getElementById('editTicketForm');
        if (editForm) {
            editForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.updateTicket();
            });
        }

        // Modal handlers
        const createModal = document.getElementById('createTicketModal');
        const editModal = document.getElementById('editTicketModal');
        
        if (createModal) {
            createModal.addEventListener('click', (e) => {
                if (e.target === createModal) {
                    this.closeCreateModal();
                }
            });
        }

        if (editModal) {
            editModal.addEventListener('click', (e) => {
                if (e.target === editModal) {
                    this.closeEditModal();
                }
            });
        }
    }

    createTicket() {
        const form = document.getElementById('createTicketForm');
        const formData = new FormData(form);
        const data = Object.fromEntries(formData);

        // Validate
        if (!data.title.trim()) {
            window.ticketApp.showToast('Title is required', 'error');
            return;
        }

        if (!['open', 'in_progress', 'closed'].includes(data.status)) {
            window.ticketApp.showToast('Invalid status', 'error');
            return;
        }

        const newTicket = {
            id: Date.now().toString(),
            title: data.title.trim(),
            description: data.description.trim(),
            status: data.status,
            priority: data.priority || 'medium',
            createdAt: new Date().toISOString(),
            createdBy: JSON.parse(localStorage.getItem('ticketapp_user')).id
        };

        this.tickets.push(newTicket);
        this.saveTickets();
        this.renderTickets();
        this.loadStats();
        
        window.ticketApp.showToast('Ticket created successfully!', 'success');
        this.closeCreateModal();
        form.reset();
    }

    editTicket(ticketId) {
        const ticket = this.tickets.find(t => t.id === ticketId);
        if (!ticket) return;

        this.editingTicket = ticket;
        
        const form = document.getElementById('editTicketForm');
        form.querySelector('#editTitle').value = ticket.title;
        form.querySelector('#editDescription').value = ticket.description || '';
        form.querySelector('#editStatus').value = ticket.status;
        form.querySelector('#editPriority').value = ticket.priority || 'medium';

        this.openEditModal();
    }

    updateTicket() {
        if (!this.editingTicket) return;

        const form = document.getElementById('editTicketForm');
        const formData = new FormData(form);
        const data = Object.fromEntries(formData);

        // Validate
        if (!data.title.trim()) {
            window.ticketApp.showToast('Title is required', 'error');
            return;
        }

        const ticketIndex = this.tickets.findIndex(t => t.id === this.editingTicket.id);
        if (ticketIndex === -1) return;

        this.tickets[ticketIndex] = {
            ...this.tickets[ticketIndex],
            title: data.title.trim(),
            description: data.description.trim(),
            status: data.status,
            priority: data.priority || 'medium'
        };

        this.saveTickets();
        this.renderTickets();
        this.loadStats();
        
        window.ticketApp.showToast('Ticket updated successfully!', 'success');
        this.closeEditModal();
    }

    deleteTicket(ticketId) {
        if (!confirm('Are you sure you want to delete this ticket?')) {
            return;
        }

        this.tickets = this.tickets.filter(t => t.id !== ticketId);
        this.saveTickets();
        this.renderTickets();
        this.loadStats();
        
        window.ticketApp.showToast('Ticket deleted successfully!', 'success');
    }

    openCreateModal() {
        document.getElementById('createTicketModal').style.display = 'flex';
    }

    closeCreateModal() {
        document.getElementById('createTicketModal').style.display = 'none';
    }

    openEditModal() {
        document.getElementById('editTicketModal').style.display = 'flex';
    }

    closeEditModal() {
        document.getElementById('editTicketModal').style.display = 'none';
        this.editingTicket = null;
    }

    loadStats() {
        const stats = {
            total: this.tickets.length,
            open: this.tickets.filter(t => t.status === 'open').length,
            inProgress: this.tickets.filter(t => t.status === 'in_progress').length,
            closed: this.tickets.filter(t => t.status === 'closed').length
        };

        // Update stats on dashboard if available
        Object.keys(stats).forEach(stat => {
            const element = document.getElementById(`${stat}-tickets`);
            if (element) {
                element.textContent = stats[stat];
            }
        });
    }

    escapeHtml(unsafe) {
        return unsafe
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");
    }
}

const ticketsModule = new TicketsModule();