const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3000;

const server = http.createServer((req, res) => {
    const url = req.url;

    if (url === '/' || url === '/index.html') {
        // Bonus: try to serve index.html if present, else fallback to text
        const indexPath = path.join(__dirname, 'index.html');
        fs.access(indexPath, fs.constants.F_OK, (err) => {
            if (!err) {
                // index.html exists -> stream it
                res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
                const stream = fs.createReadStream(indexPath);
                stream.pipe(res);
                stream.on('error', (sErr) => {
                    res.writeHead(500, { 'Content-Type': 'text/plain' });
                    res.end('Server error reading index.html');
                });
            } else {
                res.writeHead(200, { 'Content-Type': 'text/plain' });
                res.end('Hello from Node.js Server');
            }
        });
    } else if (url === '/about') {
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end('About Page');
    } else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('404 Not Found');
    }
});

server.listen(PORT, () => {
    console.log(`Server listening on http://localhost:${PORT}`);
});

// Graceful shutdown on Ctrl+C
process.on('SIGINT', () => {
    console.log('\nShutting down server...');
    server.close(() => {
        console.log('Server closed.');
        process.exit(0);
    });
});
