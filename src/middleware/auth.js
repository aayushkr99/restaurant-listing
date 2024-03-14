const jwt = require('jsonwebtoken');
const config = require('../config/config.json')

// Middleware function to authenticate JWT token
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (token == null) return res.sendStatus(401); // Unauthorized

    jwt.verify(token, config.JWT_SECRET, (err, user) => {
        if (err) return res.sendStatus(403); // Forbidden
        req.user = user;
        next(); // Pass the request to the next middleware
    });
};

// Middleware function to authorize user roles
const authorizeRoles = (roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return res.sendStatus(403); // Forbidden
        }
        next(); // Pass the request to the next middleware
    };
};

module.exports = {authenticateToken, authorizeRoles} 
