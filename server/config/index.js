if (process.env.NODE_ENV === 'production') {
    module.exports = {
        MONGO_URI : process.env.MONGO_URI,
        JWT_SECRET : process.env.JWT_SECRET,
        SENDGRID_USERNAME : process.env.SENDGRID_USERNAME,
        SENDGRID_PASSWORD : process.env.SENDGRID_PASSWORD
    }
}
else {
    const { jwtSecret , sgUsername, sgPassword } = require('./keys')
    module.exports = {
        MONGO_URI : 'mongodb://localhost/authflowdb',
        JWT_SECRET : jwtSecret,
        SENDGRID_USERNAME : sgUsername,
        SENDGRID_PASSWORD : sgPassword,
    }
}
