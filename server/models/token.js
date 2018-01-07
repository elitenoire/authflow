const mongoose = require('mongoose');
const { Schema } = mongoose;
const crypto = require('crypto')
const nodemailer = require('nodemailer')
const { SENDGRID_USERNAME, SENDGRID_USERNAME } = require(../config)


// Verification token
const tokenSchema = new Schema({
    _userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'user'
    },
    token: {type: String, required: true},
    createdAt: {
        type: Date,
        required: true,
        default: Date.now,
        expires: 86400
    }
})

tokenSchema.methods.sendVerificationToken = async function(user) {
    const verificationToken = this
    try {// create verification token
        verificationToken.set('token', crypto.randomBytes(16).toString('hex') )
        const token = await verificationToken.save()
     
       
    }
    catch(err) {
        return err
    }
}


// Model class
const Token = mongoose.model('tokens', tokenSchema)

// Model export
module.exports = Token