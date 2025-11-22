const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});

const PORT = process.env.PORT || 3000;

// Create uploads directory if it doesn't exist
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
}

// Configure multer for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        // Sanitize filename
        const originalName = file.originalname;
        const sanitizedName = originalName.replace(/[^a-zA-Z0-9.\-]/g, '_');
        const timestamp = Date.now();
        cb(null, `${timestamp}_${sanitizedName}`);
    }
});

// File filter to restrict file types
const fileFilter = (req, file, cb) => {
    const allowedTypes = ['.pdf', '.doc', '.docx', '.txt', '.ppt', '.pptx'];
    const fileExtension = path.extname(file.originalname).toLowerCase();

    if (allowedTypes.includes(fileExtension)) {
        cb(null, true);
    } else {
        cb(new Error('Only PDF, DOC, DOCX, PPT, PPTX and TXT files are allowed'), false);
    }
};

const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: {
        fileSize: 10 * 1024 * 1024 // 10MB limit
    }
});

// Middleware
app.use(express.json());
app.use(express.static('public'));

// Serve static files from uploads directory
app.use('/materials', express.static('uploads', {
    setHeaders: (res, path) => {
        res.set('Content-Disposition', 'attachment');
    }
}));

// File upload endpoint
app.post('/upload', upload.single('file'), (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: 'No file uploaded' });
        }

        res.json({
            message: `File uploaded successfully: ${req.file.originalname}`,
            filename: req.file.filename,
            originalName: req.file.originalname,
            size: req.file.size
        });
    } catch (error) {
        res.status(500).json({ error: 'Upload failed: ' + error.message });
    }
});

// API endpoint to get list of available materials
app.get('/api/materials', (req, res) => {
    fs.readdir(uploadsDir, (err, files) => {
        if (err) {
            return res.status(500).json({ error: 'Unable to read materials' });
        }

        const materials = files.map(file => {
            const filePath = path.join(uploadsDir, file);
            const stats = fs.statSync(filePath);
            return {
                filename: file,
                originalName: file.split('_').slice(1).join('_'), // Remove timestamp
                uploadDate: stats.birthtime,
                size: stats.size,
                downloadUrl: `/materials/${file}`
            };
        });

        // Sort by upload date (newest first)
        materials.sort((a, b) => new Date(b.uploadDate) - new Date(a.uploadDate));
        res.json(materials);
    });
});

// Delete file endpoint
app.delete('/api/materials/:filename', (req, res) => {
    const filename = req.params.filename;
    const filePath = path.join(uploadsDir, filename);

    if (!fs.existsSync(filePath)) {
        return res.status(404).json({ error: 'File not found' });
    }

    fs.unlink(filePath, (err) => {
        if (err) {
            return res.status(500).json({ error: 'Failed to delete file' });
        }
        res.json({ message: 'File deleted successfully' });
    });
});

// Socket.io connection handling
io.on('connection', (socket) => {
    console.log('User connected:', socket.id);

    // Join a course room
    socket.on('join_course', (data) => {
        const { courseId, userName, userType } = data;
        socket.join(courseId);

        // Store user info
        socket.userData = { userName, userType, courseId };

        // Notify others in the room
        socket.to(courseId).emit('user_joined', {
            userName,
            userType,
            message: `${userName} joined the chat`,
            timestamp: new Date().toISOString()
        });

        console.log(`${userName} joined course ${courseId}`);
    });

    // Handle chat messages
    socket.on('send_message', (data) => {
        const { courseId, message, userName, userType } = data;

        const messageData = {
            id: Date.now(),
            userName,
            userType,
            message: message.trim(),
            timestamp: new Date().toISOString(),
            courseId
        };

        // Broadcast to everyone in the course room
        io.to(courseId).emit('new_message', messageData);

        console.log(`Message in ${courseId}: ${userName}: ${message}`);
    });

    // Handle typing indicators
    socket.on('typing_start', (data) => {
        socket.to(data.courseId).emit('user_typing', {
            userName: data.userName,
            isTyping: true
        });
    });

    socket.on('typing_stop', (data) => {
        socket.to(data.courseId).emit('user_typing', {
            userName: data.userName,
            isTyping: false
        });
    });

    // Handle disconnection
    socket.on('disconnect', () => {
        if (socket.userData) {
            socket.to(socket.userData.courseId).emit('user_left', {
                userName: socket.userData.userName,
                message: `${socket.userData.userName} left the chat`,
                timestamp: new Date().toISOString()
            });
        }
        console.log('User disconnected:', socket.id);
    });
});

// Error handling for file uploads
app.use((error, req, res, next) => {
    if (error instanceof multer.MulterError) {
        if (error.code === 'LIMIT_FILE_SIZE') {
            return res.status(400).json({ error: 'File too large. Maximum size is 10MB.' });
        }
    }
    res.status(400).json({ error: error.message });
});

server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`Visit http://localhost:${PORT} to access the application`);
});