const User = require('../models/user')

exports.signup = async (req, res, next) => {
    const email = req.body.email
    const password = req.body.password
    
    // exisiting email throws error, new email creates new user
    try {
        const oldUser = await User.findOne({ email })
        if(oldUser) return res.status(422).json({error: 'Email already exists.'})
        const newUser = await User.create({ email, password })
        return res.status(200).json({msg: 'Signup successful'})

    } 
    catch(err) {
        return next(err) // res.status(500).send(err)
    }


}