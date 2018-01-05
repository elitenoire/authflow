const mongoose = require('mongoose');
const { Schema } = mongoose;
const bcrypt = require('bcryptjs')


// Model definition
const userSchema = new Schema({
    name: String,
    email: { 
        type: String,
        required: true,
        trim: true,
        unique: true,
        lowercase: true
    },
    isVerified: { type: Boolean, default: false},
    password: String,
    passwordResetToken: String,
    passwordResetExpires: Date
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

// Method to decrypt and compare attempted password to stored encrypted user password
userSchema.methods.comparePassword = async function(password) {
    try {
        const isMatch = await bcrypt.compare(password, this.password)
        return isMatch
    }
    catch(err) {
        return err
    }
}

// Model class
const User = mongoose.model('users', userSchema)

// Model export
module.exports = User