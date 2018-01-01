if (process.env.NODE_ENV === 'production') {
    module.exports = {
        MONGO_URI : process.env.MONGO_URI
    }
}
else {
    //const { username, password, key } = require('./key')
    module.exports = {
        MONGO_URI : 'mongodb://localhost/authflowdb'
    }
}
