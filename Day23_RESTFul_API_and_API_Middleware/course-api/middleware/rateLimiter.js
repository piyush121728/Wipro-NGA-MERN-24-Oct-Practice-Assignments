const rateLimit = require('express-rate-limit');

// General API rate limiter
const apiLimiter = rateLimit({
    windowMs: 1 * 60 * 1000, // 1 minute
    max: 5, // Limit each IP to 5 requests per windowMs
    message: {
        error: 'Too many requests',
        message: 'You have exceeded the 5 requests per minute limit.',
        retryAfter: '60 seconds'
    },
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
    handler: (req, res) => {
        res.status(429).json({
            error: 'Too many requests',
            message: 'You have exceeded the 5 requests per minute limit.',
            retryAfter: '60 seconds'
        });
    }
});

// More strict limiter for write operations
const createCourseLimiter = rateLimit({
    windowMs: 1 * 60 * 1000, // 1 minute
    max: 3, // Limit each IP to 3 create requests per minute
    message: {
        error: 'Too many course creation requests',
        message: 'Please slow down when creating new courses.',
        retryAfter: '60 seconds'
    }
});

module.exports = {
    apiLimiter,
    createCourseLimiter
};