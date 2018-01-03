const jwt = require('jwt-simple')
const User = require('../models/user')
const { JWT_SECRET } = require('../config')

// utils
const generateToken = user => {
    return jwt.encode({sub: user.id, iat: Date.now()}, JWT_SECRET)
}

exports.signup = async (req, res, next) => {
    const email = req.body.email
    const password = req.body.password
    
    // exisiting email throws error, new email creates new user
    try {
        const oldUser = await User.findOne({ email })
        if(oldUser) return res.status(422).json({error: 'Email already exists.'})
        const newUser = await User.create({ email, password })
        return res.status(200).json({
            token: generateToken(newUser),
            msg: 'Signup success'
        })

    } 
    catch(err) {
        return next(err) // res.status(500).send(err)
    }
}