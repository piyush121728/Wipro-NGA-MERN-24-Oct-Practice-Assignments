// routes/formRoutes.js : Handles registration form and submission

const express = require('express');
const router = express.Router();               // create router instance
const { body, validationResult } = require('express-validator'); // import validators
const bcrypt = require('bcrypt');              // import bcrypt for hashing
const User = require('../models/User');        // import User model

// GET /register - render registration form
router.get('/register', (req, res) => {
  return res.render('register', { errors: [] });
});

// POST /register - handle registration form submission
router.post('/register',
  [
    body('name').trim().notEmpty().withMessage('Name is required'),
    body('email').isEmail().withMessage('Valid email required').normalizeEmail(),
    body('password').isLength({ min: 5 }).withMessage('Password must be at least 5 characters')
  ],
  async (req, res) => {                         // async handler for DB operations
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).render('register', { errors: errors.array() });
    }

    const { name, email, password } = req.body;

    try {
      const existing = await User.findOne({ email }); // check if user exists
      if (existing) {
        return res.status(409).render('register', { errors: [{ msg: 'Email already in use' }] });
      }

      const saltRounds = 10;                      // bcrypt salt rounds
      const hashed = await bcrypt.hash(password, saltRounds); // hash the password

      const newUser = new User({                  // create user document
        name,
        email,
        password: hashed,
        role: 'user'
      });

      await newUser.save();                       // save to MongoDB
      console.log('Saved user:', newUser.email);

      // Respond with success message as requested
      return res.send(`Registration successful for ${name}`);
    } catch (err) {                               // catch DB / other errors
      console.error('Registration error:', err);
      return res.status(500).send('Server error');
    }
  }
);

module.exports = router;                        
