const jwt = require('jwt-simple')
const User = require('../models/user')
const Token = require('../models/token')
const { JWT_SECRET } = require('../config')

// utils
const generateToken = user => {
    return jwt.encode({sub: user.id, iat: Date.now()}, JWT_SECRET)
}

//TODO: On signup use node mailer to send activation link 
exports.signup = async (req, res, next) => {
    const email = req.body.email
    const password = req.body.password
    
    // exisiting email throws error, new email creates new user
    try {
        const oldUser = await User.findOne({ email })
        if(oldUser) return res.status(422).json({error: 'Email already exists.'})
        const newUser = await User.create({ email, password })
        // send signup verification email
        const BASE_URL = req.protocol + "://" + req.get('host')
        const token = new Token({_userId: newUser._id })
        await token.sendVerificationToken(newUser, BASE_URL)
        // on successful email delivery
        return res.status(200).json({
            token: generateToken(newUser),
            msg: `Verification email sent to ${newUser.email}`
        })
    } 
    catch(err) {
        return next(err) // res.status(500).send(err)
    }
}

exports.login = (req, res, next) => {
    return res.status(200).json({
        token: generateToken(req.user),
        msg: 'Login successs'
    })
}