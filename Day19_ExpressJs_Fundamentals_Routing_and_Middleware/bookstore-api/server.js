const express = require('express');
const cors = require('cors');
const bookRouter = require('./routes/books');

const app = express();
const PORT = 4000;

// Enable CORS
app.use(cors());

// JSON parser
app.use(express.json());

// Logger middleware
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] [${req.method}] ${req.originalUrl}`);
  next();
});

// Mount routes
app.use('/books', bookRouter);

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Error handler
app.use((err, req, res, next) => {
  console.error('Internal error:', err);
  res.status(500).json({ error: 'Internal Server Error' });
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
