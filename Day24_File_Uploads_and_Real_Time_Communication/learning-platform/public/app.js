const socket = io();

// File Upload Handling
document.getElementById('uploadForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = new FormData();
    const fileInput = document.getElementById('fileInput');
    const uploadButton = e.target.querySelector('button[type="submit"]');

    if (fileInput.files.length === 0) {
        showAlert('Please select a file', 'warning');
        return;
    }

    // Show loading state
    uploadButton.innerHTML = '<i class="bi bi-hourglass-split me-1"></i>Uploading...';
    uploadButton.disabled = true;

    formData.append('file', fileInput.files[0]);

    try {
        const response = await fetch('/upload', {
            method: 'POST',
            body: formData
        });

        const result = await response.json();

        if (response.ok) {
            showAlert(result.message, 'success');
            fileInput.value = ''; // Clear file input
            loadMaterials(); // Refresh materials list
        } else {
            showAlert(`Error: ${result.error}`, 'danger');
        }
    } catch (error) {
        showAlert(`Upload failed: ${error.message}`, 'danger');
    } finally {
        // Reset button state
        uploadButton.innerHTML = '<i class="bi bi-upload me-1"></i>Upload File';
        uploadButton.disabled = false;
    }
});

// Alert helper function
function showAlert(message, type) {
    const statusDiv = document.getElementById('uploadStatus');
    statusDiv.innerHTML = `
        <div class="alert alert-${type} alert-dismissible fade show" role="alert">
            ${message}
            <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
        </div>
    `;
}

// Load Materials List
async function loadMaterials() {
    try {
        const response = await fetch('/api/materials');
        const materials = await response.json();

        const tableBody = document.getElementById('materialsTableBody');

        if (materials.length === 0) {
            tableBody.innerHTML = `
                <tr>
                    <td colspan="4" class="text-center text-muted py-4">
                        <i class="bi bi-inbox display-4 d-block mb-2"></i>
                        No materials uploaded yet
                    </td>
                </tr>
            `;
            return;
        }

        tableBody.innerHTML = materials.map(material => `
            <tr>
                <td>
                    <i class="bi bi-file-earmark-text file-icon text-primary"></i>
                    <strong>${material.originalName}</strong>
                </td>
                <td>${formatFileSize(material.size)}</td>
                <td>${new Date(material.uploadDate).toLocaleDateString()}</td>
                <td>
                    <a href="${material.downloadUrl}" class="btn btn-sm btn-outline-primary" download>
                        <i class="bi bi-download me-1"></i>Download
                    </a>
                    <button onclick="deleteFile('${material.filename}')" class="btn btn-sm btn-outline-danger ms-1">
                        <i class="bi bi-trash me-1"></i>Delete
                    </button>
                </td>
            </tr>
        `).join('');
    } catch (error) {
        console.error('Error loading materials:', error);
        showAlert('Error loading materials', 'danger');
    }
}

// Format file size
function formatFileSize(bytes) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

// Delete file
async function deleteFile(filename) {
    if (!confirm('Are you sure you want to delete this file?')) {
        return;
    }

    try {
        const response = await fetch(`/api/materials/${filename}`, {
            method: 'DELETE'
        });

        const result = await response.json();

        if (response.ok) {
            showAlert(result.message, 'success');
            loadMaterials(); // Refresh list
        } else {
            showAlert(`Error: ${result.error}`, 'danger');
        }
    } catch (error) {
        showAlert('Delete failed', 'danger');
    }
}

// Chat Functionality
let currentCourseId = '';
let currentUserName = '';
let typingTimer;

function joinChat() {
    currentUserName = document.getElementById('userName').value;
    const userType = document.getElementById('userType').value;
    currentCourseId = document.getElementById('courseId').value;

    if (!currentUserName || !currentCourseId) {
        showAlert('Please enter your name and course ID', 'warning');
        return;
    }

    socket.emit('join_course', {
        courseId: currentCourseId,
        userName: currentUserName,
        userType: userType
    });

    document.getElementById('chatInterface').style.display = 'block';
    document.getElementById('currentCourseName').textContent = currentCourseId;

    // Clear previous messages
    document.getElementById('chatMessages').innerHTML = '';

    showAlert(`Joined ${currentCourseId} chat room`, 'success');
}

function sendMessage() {
    const messageInput = document.getElementById('messageInput');
    const message = messageInput.value.trim();

    if (!message || !currentCourseId) {
        showAlert('Please join a chat room first', 'warning');
        return;
    }

    socket.emit('send_message', {
        courseId: currentCourseId,
        message: message,
        userName: currentUserName,
        userType: document.getElementById('userType').value
    });

    messageInput.value = '';
    stopTyping();
}

function handleTyping(event) {
    if (event.key === 'Enter') {
        sendMessage();
        return;
    }

    if (!currentCourseId) return;

    clearTimeout(typingTimer);
    socket.emit('typing_start', {
        courseId: currentCourseId,
        userName: currentUserName
    });

    typingTimer = setTimeout(() => {
        stopTyping();
    }, 1000);
}

function stopTyping(event) {
    if (event && event.key === 'Enter') return;

    if (!currentCourseId) return;

    clearTimeout(typingTimer);
    socket.emit('typing_stop', {
        courseId: currentCourseId,
        userName: currentUserName
    });
}

// Socket Event Listeners
socket.on('new_message', (data) => {
    const chatMessages = document.getElementById('chatMessages');
    const messageClass = data.userType === 'instructor' ? 'instructor' : 'student';
    const badgeClass = data.userType === 'instructor' ? 'badge-instructor' : 'badge-student';

    const messageElement = document.createElement('div');
    messageElement.className = `message ${messageClass}`;
    messageElement.innerHTML = `
        <div class="message-header">
            <span>
                <span class="badge ${badgeClass} me-2">${data.userType}</span>
                <strong>${data.userName}</strong>
            </span>
            <span class="message-time">${new Date(data.timestamp).toLocaleTimeString()}</span>
        </div>
        <div class="message-content">${data.message}</div>
    `;

    chatMessages.appendChild(messageElement);
    chatMessages.scrollTop = chatMessages.scrollHeight;
});

socket.on('user_typing', (data) => {
    const typingIndicator = document.getElementById('typingIndicator');
    if (data.isTyping) {
        typingIndicator.textContent = `${data.userName} is typing...`;
    } else {
        typingIndicator.textContent = '';
    }
});

socket.on('user_joined', (data) => {
    addSystemMessage(`${data.userName} joined the chat`);
});

socket.on('user_left', (data) => {
    addSystemMessage(`${data.userName} left the chat`);
});

function addSystemMessage(message) {
    const chatMessages = document.getElementById('chatMessages');
    const messageElement = document.createElement('div');
    messageElement.className = 'message system';
    messageElement.innerHTML = `
        <div class="text-center">
            <small>${message}</small>
        </div>
    `;

    chatMessages.appendChild(messageElement);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Load materials on page load
document.addEventListener('DOMContentLoaded', function () {
    loadMaterials();

    // Smooth scroll for navigation
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});