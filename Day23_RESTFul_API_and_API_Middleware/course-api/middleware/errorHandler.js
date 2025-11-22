// Centralized error handling middleware
const errorHandler = (err, req, res, next) => {
    console.error('Error occurred:', err);

    // Default error
    let error = { ...err };
    error.message = err.message;

    // Mongoose bad ObjectId (if using MongoDB)
    if (err.name === 'CastError') {
        const message = 'Resource not found';
        error = { message, statusCode: 404 };
    }

    // Mongoose duplicate key
    if (err.code === 11000) {
        const message = 'Duplicate field value entered';
        error = { message, statusCode: 400 };
    }

    // Mongoose validation error
    if (err.name === 'ValidationError') {
        const message = Object.values(err.errors).map(val => val.message);
        error = { message: message.join(', '), statusCode: 400 };
    }

    res.status(error.statusCode || 500).json({
        error: error.message || 'Server Error',
        success: false,
        timestamp: new Date().toISOString(),
        path: req.originalUrl
    });
};

module.exports = errorHandler;