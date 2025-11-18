// Challenge 1 — Setting Up Express Server
const express = require('express');
const app = express();
const PORT = 4000;

// Challenge 3: Express Middleware
function requestLogger(req, res, next) {
    const timestamp = new Date().toISOString();
    console.log(`[${timestamp}] [${req.method}] ${req.originalUrl}`);
    next();
}

app.use(requestLogger);

// Basic route
app.get('/', (req, res) => {
    res.send('Welcome to Express Server');
});

// Bonus /status route returning JSON
app.get('/status', (req, res) => {
    res.json({ server: 'running', uptime: 'OK' });
});

// Challenge 2 — Express Routing & Query Parameters
// Add inside server.js (after express setup)
app.get('/products', (req, res) => {
    const name = req.query.name;
    if (name) {
        // Plain text response:
        res.send(`Searching for product: ${name}`);

        // Bonus: return JSON:
        // res.json({ query: name });
    } else {
        res.send('Please provide a product name');
    }
});


app.listen(PORT, () => {
    console.log(`Server listening on http://localhost:${PORT}`);
});
