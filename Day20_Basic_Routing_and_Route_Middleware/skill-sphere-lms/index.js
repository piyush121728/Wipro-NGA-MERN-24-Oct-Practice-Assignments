const express = require('express');
const coursesRouter = require('./routes/courses');

const app = express();
const PORT = 4000;

// Root route — Challenge 1: Welcome message
app.get('/', (req, res) => {
  // Spec expected a welcome message at root.
  // Returning plain text so visiting http://localhost:4000/ shows "Welcome to SkillSphere LMS API".
  res.send('Welcome to SkillSphere LMS API');
});

// Mount courses routes (organised in separate file as best-practice)
app.use('/courses', coursesRouter);

// Generic 404 for anything else (good practice)
app.use((req, res) => {
  res.status(404).json({ error: 'Not Found' });
});

app.listen(PORT, () => {
  console.log(`SkillSphere LMS API running on http://localhost:${PORT}`);
});
