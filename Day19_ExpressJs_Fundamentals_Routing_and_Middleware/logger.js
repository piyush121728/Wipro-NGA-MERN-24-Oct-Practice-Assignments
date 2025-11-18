// logger.js (optional separate file) or inline:
function requestLogger(req, res, next) {
    const timestamp = new Date().toISOString();
    console.log(`[${timestamp}] [${req.method}] ${req.originalUrl}`);
    next();
}

// In server.js:
app.use(requestLogger);
