const authRouter = require('express').Router();
const Authentication = require('../controllers/authentication')

authRouter.post('/signup', Authentication.signup)


module.exports = authRouter


// module.exports = app => {
//     app.post('/auth/signup', Authentication.signup)
// }