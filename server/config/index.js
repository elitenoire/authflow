if (process.env.NODE_ENV === 'production') {
    module.exports = {
        MONGO_URI : process.env.MONGO_URI,
        JWT_SECRET : process.env.JWT_SECRET,
        MAIL_HOST : process.env.MAIL_HOST,
        MAIL_PORT : process.env.MAIL_PORT,
        MAIL_USER : process.env.MAIL_USER,
        MAIL_PASS : process.env.MAIL_PASS,
        MAIL_FROM : process.env.MAIL_FROM
    }
}
else {
    const { jwtSecret , mailUser, mailPass, mailHost, mailPort, mailFrom } = require('./keys')
    module.exports = {
        MONGO_URI : 'mongodb://localhost/authflowdb',
        JWT_SECRET : jwtSecret,
        MAIL_HOST : mailHost,
        MAIL_PORT : mailPort,
        MAIL_USER : mailUser,
        MAIL_PASS : mailPass,
        MAIL_FROM : mailFrom
    }
}
