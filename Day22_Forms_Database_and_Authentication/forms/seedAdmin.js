// seedAdmin.js - helper script to create an admin user from command line
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bcrypt = require('bcrypt');
const User = require('./models/User');

dotenv.config();

async function seed() {                          // async seeding function
  try {
    await mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true }); // connect
    console.log('Connected to MongoDB for seeding');

    const email = process.env.ADMIN_EMAIL;
    const existing = await User.findOne({ email }); // check existing
    if (existing) {
      existing.role = 'admin';
      await existing.save();
      console.log('Updated existing user to admin:', email);
      process.exit(0);
    }

    const hashed = await bcrypt.hash(process.env.ADMIN_PASSWORD, 10); // hash default password
    const admin = new User({                       // create admin user
      name: 'Admin User',
      email,
      password: hashed,
      role: 'admin'
    });

    await admin.save();                            // save to DB
    console.log('Seeded admin user:', email);
    process.exit(0);
  } catch (err) {
    console.error('Seeding error:', err);
    process.exit(1);
  }
}

seed();                                           
