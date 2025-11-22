const express = require('express');
const courseRoutes = require('./routes/courses');
const errorHandler = require('./middleware/errorHandler');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Routes
app.use('/api/v1/courses', courseRoutes);

// Health check endpoint
app.get('/api/v1/health', (req, res) => {
    res.status(200).json({
        status: 'OK',
        message: 'Course Management API is running',
        timestamp: new Date().toISOString()
    });
});

// Error handling middleware (should be last)
app.use(errorHandler);

// 404 handler for undefined routes
app.use('*', (req, res) => {
    res.status(404).json({
        error: 'Route not found',
        path: req.originalUrl,
        method: req.method
    });
});

app.listen(PORT, () => {
    console.log(`Course Management API running on port ${PORT}`);
    console.log(`API Version: v1`);
    console.log(`Base URL: http://localhost:${PORT}/api/v1`);
});

module.exports = app;