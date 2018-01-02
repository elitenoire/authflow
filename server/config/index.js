if (process.env.NODE_ENV === 'production') {
    module.exports = {
        MONGO_URI : process.env.MONGO_URI,
        JWT_SECRET : process.env.JWT_SECRET
    }
}
else {
    const { jwtSecret } = require('./keys')
    module.exports = {
        MONGO_URI : 'mongodb://localhost/authflowdb',
        JWT_SECRET : jwtSecret
    }
}
