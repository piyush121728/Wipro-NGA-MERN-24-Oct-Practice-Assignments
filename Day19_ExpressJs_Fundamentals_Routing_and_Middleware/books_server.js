const express = require('express');
const bookRouter = require('./routes/books');
const app = express();
const PORT = 4000;

app.use(express.json());

// example global logger (from challenge 3)
app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] [${req.method}] ${req.originalUrl}`);
    next();
});

// mount book routes
app.use('/books', bookRouter);

// 404 handler for unknown routes
app.use((req, res, next) => {
    res.status(404).json({ error: 'Route not found' });
});

// centralized error handler (bonus)
app.use((err, req, res, next) => {
    console.error('Internal error:', err);
    res.status(500).json({ error: 'Internal Server Error' });
});

app.listen(PORT, () => console.log(`Server listening at http://localhost:${PORT}`));
