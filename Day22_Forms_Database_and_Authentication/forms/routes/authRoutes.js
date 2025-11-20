// routes/authRoutes.js : Handles login and protected admin route using JWT

const express = require('express');
const router = express.Router();               // create router
const jwt = require('jsonwebtoken');           // import jsonwebtoken for JWT
const bcrypt = require('bcrypt');              // import bcrypt to compare passwords
const { body, validationResult } = require('express-validator'); // validators
const User = require('../models/User');        // import User model
const { authenticateJWT, authorizeRole } = require('../config/auth'); // JWT middlewares

// GET /login - render login form
router.get('/login', (req, res) => {
  return res.render('login', { errors: [] });
});

// POST /login - authenticate user and issue JWT
router.post('/login',
  [
    body('email').isEmail().withMessage('Valid email required').normalizeEmail(),
    body('password').notEmpty().withMessage('Password required')
  ],
  async (req, res) => {                         // async handler
    const errors = validationResult(req);      // collect validation results
    if (!errors.isEmpty()) {
      return res.status(422).render('login', { errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      const user = await User.findOne({ email }); // find user by email
      if (!user) {                              // if user doesn't exist
        return res.status(401).render('login', { errors: [{ msg: 'Invalid credentials' }] });
      }

      const match = await bcrypt.compare(password, user.password); // compare password with hash
      if (!match) {                              // if password mismatch
        return res.status(401).render('login', { errors: [{ msg: 'Invalid credentials' }] }); // unauthorized
      }

      // prepare payload for JWT
      const payload = {
        sub: user._id,
        name: user.name,
        role: user.role
      };

      // sign JWT with secret and expiry from env
      const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN || '1h' });

      // respond with token - in a real app you'd set an httpOnly cookie or return JSON
      return res.json({role: user.role, token, message: 'Login successful' });
    } catch (err) {                               // catch errors
      console.error('Login error:', err);
      return res.status(500).send('Server error');
    }
  }
);

// GET /admin - protected route, only accessible to admin role
router.get('/admin', authenticateJWT, authorizeRole('admin'), (req, res) => { // apply middlewares
  return res.send('Welcome, Admin!');           // required admin output
});

module.exports = router;                         
