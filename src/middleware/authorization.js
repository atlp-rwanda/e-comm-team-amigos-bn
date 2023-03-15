const jwt = require('jsonwebtoken');
const config = require('config');

function requireAuth(req, res, next) {
  // Check if the user is authenticated and authorized to access the requested resource
  if (req.user && req.user.isAuthenticated && req.user.isAuthorized) {
    // User is authorized, proceed to the next middleware or route handler
    next();
  } else {
    // User is not authorized, return an error response
    res.status(401).send('Unauthorized');
  }
}