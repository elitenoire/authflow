const mongoose = require('mongoose');
const { Schema } = mongoose;
const bcrypt = require('bcryptjs')


// Model definition
const userSchema = new Schema({
    email: { 
        type: String,
        unique: true,
        lowercase: true
    },
    password: String
}, { timestamps: true })

// Encrypt password (salt and hash) pre-save hook
userSchema.pre('save', async function(next) {
    try {
        // const salt = await bcrypt.genSalt(10)
        // const hash = await bcrypt.hash(this.password, salt)
        // this.password = hash
        this.password = await bcrypt.hash(this.password, 10)
        next()
    }
    catch(err) {
       return next(err) 
    }
})

// Model class
const User = mongoose.model('users', userSchema)

// Model export
module.exports = User