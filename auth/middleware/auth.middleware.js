const jwt = require('jsonwebtoken')
const {SECRET} = require('../config/config')

module.exports = (req, res, next) => {
    if(req.method === 'OPTION') {
        return next()
    }
    try {
        const token = req.headers.authorization
        
        if(token) {
            if(!token.split(' ')[1]) {
                return res.status(404).redirect('/login')
            }
            const userId = jwt.verify(token.split(' ')[1], SECRET)
            req.body.user = userId
            return next()
        }

        res.status(404).redirect('/login')
    } catch (e) {
        res.status(400).json({massage: 'При авторизации, что-то пошло не так'})
    }
}