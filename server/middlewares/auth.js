const passportConfig = require('../services/passport')
const passport = require('passport')

// Authentication middleware for protected routes
const requireAuth = passport.authenticate('jwt', {session: false})

module.exports = requireAuth