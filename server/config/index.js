if (process.env.NODE_ENV === 'production') {
    module.exports = {
        MONGO_URI : process.env.MONGO_URI,
        JWT_SECRET : process.env.JWT_SECRET,
        MAIL_USER : process.env.MAIL_USER,
        MAIL_PASS : process.env.MAIL_PASS
    }
}
else {
    const { jwtSecret , mailUser, mailPass } = require('./keys')
    module.exports = {
        MONGO_URI : 'mongodb://localhost/authflowdb',
        JWT_SECRET : jwtSecret,
        MAIL_USER : mailUser,
        MAIL_POST : mailPass,
    }
}
