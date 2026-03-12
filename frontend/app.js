const API_URL = window.location.origin;

let allProspects = [];
let currentProspectId = null;

// Initialization
document.addEventListener('DOMContentLoaded', () => {
    fetchProspects();
    initMobileNav();
});

function initMobileNav() {
    const menuToggle = document.getElementById('menu-toggle');
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('sidebar-overlay');

    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            sidebar.classList.toggle('active');
            overlay.classList.toggle('active');
        });
    }

    if (overlay) {
        overlay.addEventListener('click', () => {
            sidebar.classList.remove('active');
            overlay.classList.remove('active');
        });
    }

    // Close sidebar when clicking a nav link on mobile
    const navLinks = document.querySelectorAll('.sidebar nav li');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth <= 768) {
                sidebar.classList.remove('active');
                overlay.classList.remove('active');
            }
        });
    });
}

// API Calls
async function fetchProspects() {
    try {
        const response = await fetch(`${API_URL}/prospects`);
        if (!response.ok) throw new Error('Failed to fetch prospects');
        allProspects = await response.json();
        renderProspectList(allProspects);
    } catch (error) {
        showToast(error.message, 'error');
    }
}

async function fetchMessages(prospectId) {
    try {
        const response = await fetch(`${API_URL}/prospects/${prospectId}/messages`);
        if (!response.ok) throw new Error('Failed to fetch messages');
        const messages = await response.json();
        renderMessages(messages);
    } catch (error) {
        showToast(error.message, 'error');
    }
}

// Rendering
function renderProspectList(prospects) {
    const tbody = document.getElementById('prospects-body');
    tbody.innerHTML = '';

    if (prospects.length === 0) {
        tbody.innerHTML = '<tr><td colspan="6" class="text-center" style="padding: 2rem; color: #64748b;">No prospects found.</td></tr>';
        return;
    }

    prospects.forEach(p => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td><strong>${p.name}</strong></td>
            <td>${p.company || '-'}</td>
            <td>${p.source}</td>
            <td><span class="badge badge-${p.status.toLowerCase().replace(' ', '-')}">${p.status}</span></td>
            <td>${new Date(p.created_at).toLocaleDateString()}</td>
            <td class="text-right">
                <button class="btn btn-secondary btn-sm" onclick="viewProspect(${p.id})">View</button>
                <button class="btn btn-primary btn-sm" onclick="editProspect(${p.id})">Edit</button>
                <button class="btn btn-danger btn-sm" onclick="deleteProspect(${p.id})">Delete</button>
            </td>
        `;
        tbody.appendChild(row);
    });
}

function renderMessages(messages) {
    const container = document.getElementById('messages-timeline');
    container.innerHTML = '';

    if (messages.length === 0) {
        container.innerHTML = '<p style="color: #64748b; font-style: italic;">No message history yet.</p>';
        return;
    }

    messages.forEach(m => {
        const div = document.createElement('div');
        div.className = `message-item ${m.direction.toLowerCase()}`;
        div.innerHTML = `
            <div class="msg-meta">
                <span>${m.channel} • ${new Date(m.created_at).toLocaleString()}</span>
                <span class="msg-delete" onclick="deleteMessage(${m.id})">Delete</span>
            </div>
            <div class="msg-content">${m.content}</div>
        `;
        container.appendChild(div);
    });
}

// Navigation & View Switching
function showListView() {
    document.getElementById('list-view').classList.remove('hidden');
    document.getElementById('details-view').classList.add('hidden');
    document.getElementById('page-title').innerText = 'Prospects';
    document.getElementById('add-prospect-btn').classList.remove('hidden');
    currentProspectId = null;
    fetchProspects();
}

async function viewProspect(id) {
    currentProspectId = id;
    try {
        const response = await fetch(`${API_URL}/prospects/${id}`);
        const p = await response.json();

        document.getElementById('list-view').classList.add('hidden');
        document.getElementById('details-view').classList.remove('hidden');
        document.getElementById('page-title').innerText = p.name;
        document.getElementById('add-prospect-btn').classList.add('hidden');

        const infoContent = document.getElementById('prospect-info-content');
        infoContent.innerHTML = `
            <div class="info-group">
                <label>Company</label>
                <p>${p.company || '-'}</p>
            </div>
            <div class="info-group">
                <label>Phone</label>
                <p>${p.phone || '-'}</p>
            </div>
            <div class="info-group">
                <label>Email</label>
                <p>${p.email || '-'}</p>
            </div>
            <div class="info-group">
                <label>Source</label>
                <p>${p.source}</p>
            </div>
            <div class="info-group">
                <label>Status</label>
                <p><span class="badge badge-${p.status.toLowerCase().replace(' ', '-')}">${p.status}</span></p>
            </div>
            <div class="info-group">
                <label>Notes</label>
                <p>${p.notes || '-'}</p>
            </div>
        `;

        fetchMessages(id);
    } catch (error) {
        showToast(error.message, 'error');
    }
}

// Handlers
function handleFilter() {
    const search = document.getElementById('search-input').value.toLowerCase();
    const source = document.getElementById('filter-source').value;
    const status = document.getElementById('filter-status').value;

    const filtered = allProspects.filter(p => {
        const matchesSearch = (p.name.toLowerCase().includes(search) || (p.company && p.company.toLowerCase().includes(search)));
        const matchesSource = !source || p.source === source;
        const matchesStatus = !status || p.status === status;
        return matchesSearch && matchesSource && matchesStatus;
    });

    renderProspectList(filtered);
}

async function handleProspectSubmit(e) {
    e.preventDefault();
    const id = document.getElementById('prospect-id').value;
    const data = {
        name: document.getElementById('p-name').value,
        company: document.getElementById('p-company').value,
        phone: document.getElementById('p-phone').value,
        email: document.getElementById('p-email').value,
        source: document.getElementById('p-source').value,
        status: document.getElementById('p-status').value,
        notes: document.getElementById('p-notes').value
    };

    if (!data.phone && !data.email) {
        showToast("At least one contact method (phone or email) is required", "error");
        return;
    }

    try {
        const method = id ? 'PUT' : 'POST';
        const url = id ? `${API_URL}/prospects/${id}` : `${API_URL}/prospects`;

        const response = await fetch(url, {
            method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            const err = await response.json();
            throw new Error(err.error || 'Failed to save prospect');
        }

        showToast(`Prospect ${id ? 'updated' : 'created'} successfully!`);
        closeProspectModal();
        fetchProspects();
    } catch (error) {
        showToast(error.message, 'error');
    }
}

async function handleMessageSubmit(e) {
    e.preventDefault();
    const data = {
        channel: document.getElementById('msg-channel').value,
        direction: document.getElementById('msg-direction').value,
        content: document.getElementById('msg-content').value
    };

    try {
        const response = await fetch(`${API_URL}/prospects/${currentProspectId}/messages`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });

        if (!response.ok) throw new Error('Failed to save message');

        document.getElementById('msg-content').value = '';
        fetchMessages(currentProspectId);
        showToast('Message saved to timeline');
    } catch (error) {
        showToast(error.message, 'error');
    }
}

async function deleteProspect(id) {
    if (!confirm('Are you sure? This will delete the prospect and all their message history.')) return;

    try {
        const response = await fetch(`${API_URL}/prospects/${id}`, { method: 'DELETE' });
        if (!response.ok) throw new Error('Failed to delete prospect');
        showToast('Prospect deleted');
        fetchProspects();
    } catch (error) {
        showToast(error.message, 'error');
    }
}

async function deleteMessage(id) {
    if (!confirm('Delete this message?')) return;

    try {
        const response = await fetch(`${API_URL}/messages/${id}`, { method: 'DELETE' });
        if (!response.ok) throw new Error('Failed to delete message');
        showToast('Message deleted');
        fetchMessages(currentProspectId);
    } catch (error) {
        showToast(error.message, 'error');
    }
}

// Modal Logic
function openProspectModal(id = null) {
    document.getElementById('prospect-modal').classList.remove('hidden');
    document.getElementById('prospect-form').reset();
    document.getElementById('prospect-id').value = '';
    document.getElementById('modal-title').innerText = 'Add Prospect';
}

async function editProspect(id) {
    openProspectModal();
    document.getElementById('modal-title').innerText = 'Edit Prospect';
    document.getElementById('prospect-id').value = id;

    try {
        const p = allProspects.find(p => p.id === id);
        if (p) {
            document.getElementById('p-name').value = p.name;
            document.getElementById('p-company').value = p.company || '';
            document.getElementById('p-phone').value = p.phone || '';
            document.getElementById('p-email').value = p.email || '';
            document.getElementById('p-source').value = p.source;
            document.getElementById('p-status').value = p.status;
            document.getElementById('p-notes').value = p.notes || '';
        }
    } catch (error) {
        showToast(error.message, 'error');
    }
}

function closeProspectModal() {
    document.getElementById('prospect-modal').classList.add('hidden');
}

// UI Utilities
function showToast(message, type = 'success') {
    const toast = document.getElementById('toast');
    toast.innerText = message;
    toast.className = `toast ${type === 'error' ? 'error' : ''}`;
    toast.classList.remove('hidden');
    setTimeout(() => {
        toast.classList.add('hidden');
    }, 3000);
}
