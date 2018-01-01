const mongoose = require('mongoose');
const { Schema } = mongoose;

// Model definition
const userSchema = new Schema({
    email: { 
        type: String,
        unique: true,
        lowercase: true
    },
    password: String
}, { timestamps: true })

// Model class
const User = mongoose.model('users', userSchema)

// Model export
module.exports = User