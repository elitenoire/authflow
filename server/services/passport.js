const passport = require('passport')
const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt
const User = require('../models/user')
const { JWT_SECRET } = require('../config')

const jwtOpts = {
    secretOrKey: JWT_SECRET,
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
}

// jwt strategy for passport authentication
const authChecker = new JwtStrategy(jwtOpts, async (tokenPayload, done) => {
    try { // check if user exists by user id from decoded token
        const user = await User.findById(tokenPayload.sub)
        return user ? done(null, user) // authorized
                    : done(null, false) // unauthorized
    }
    catch(err) {// unauthorized
        return done(err, false)
    }
})
// use the strategy
passport.use(authChecker)