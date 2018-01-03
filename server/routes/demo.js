const demoRouter = require('express').Router();
const requireAuth = require('../middlewares/auth')

demoRouter.get('/', requireAuth, (req, res) => {
    res.json({msg: 'hello'})
})

module.exports = demoRouter