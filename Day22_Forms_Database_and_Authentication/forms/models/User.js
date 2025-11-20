// models/User.js : User Mongoose model with schema and comments

const mongoose = require('mongoose');          

const userSchema = new mongoose.Schema({       // define a new schema
  name: { type: String, required: true },    
  email: { type: String, required: true, unique: true }, 
  password: { type: String, required: true }, 
  role: { type: String, enum: ['user', 'admin'], default: 'user' } 
}, { timestamps: true });                     

module.exports = mongoose.model('User', userSchema); 
