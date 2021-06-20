module.exports = (req, res, next) => {
    if(req.user.role === 'ADMIN' || req.user.role === 'SUPER_ADMIN') {
        return next()
    }

    res.redirect('/main')
}