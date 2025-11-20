// config/auth.js : JWT authentication and RBAC middleware

const jwt = require('jsonwebtoken');
const User = require('../models/User');

// authenticateJWT middleware verifies Bearer token and attaches user info to req.user
function authenticateJWT(req, res, next) {      // middleware signature
  const authHeader = req.headers['authorization'] || req.headers['Authorization']; // read auth header

  if (!authHeader || !authHeader.startsWith('Bearer ')) { // if no bearer token
    return res.status(401).send('Access Denied');
  }

  const token = authHeader.split(' ')[1];        // extract token part

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // verify token signature
    // attach decoded payload to request for downstream handlers
    req.user = {
      id: decoded.sub,
      name: decoded.name,
      role: decoded.role
    };
    return next();
  } catch (err) {
    console.error('JWT error:', err);
    return res.status(401).send('Access Denied');
  }
}

// authorizeRole middleware ensures the user has required role(s)
function authorizeRole(requiredRole) {
  return function (req, res, next) {
    if (!req.user) {                             // if user not attached
      return res.status(401).send('Access Denied');
    }
    if (req.user.role !== requiredRole) {        // if roles don't match
      return res.status(403).send('Access Denied');
    }
    return next();
  };
}

module.exports = { authenticateJWT, authorizeRole }; 
