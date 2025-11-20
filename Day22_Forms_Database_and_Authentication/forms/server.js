// server.js : main server file, start point

const express = require('express');
const mongoose = require('mongoose');          // import mongoose for DB
const dotenv = require('dotenv');              // import dotenv to load .env
const bodyParser = require('body-parser');
const path = require('path');

dotenv.config();                               // load environment variables from .env

const app = express();                          // create express app

// view engine setup
app.set('view engine', 'ejs');                  // set EJS as the template engine
app.set('views', path.join(__dirname, 'views'));// set views directory path

// middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB error:', err));

// routes
app.get("/", (req, res) => {
  res.render("home");  
});


app.use('/', require('./routes/formRoutes'));    // mount form routes at root
app.use('/', require('./routes/authRoutes'));    // mount auth routes at root

// seed admin script route (optional, not for production)
// this route is not created here; use seedAdmin.js to create admin user


const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
