const {Router} = require('express')
const router = new Router()
const notAuth = require('../middleware/notAuth.moddleware')
router.get('/capabilities', notAuth, (req, res) => {
    res.render('capabilities', {title: 'Возможности', isMain: false})
})

router.get('/', notAuth, (req, res) => {
    res.render('index', {title: 'QuerySender', isMain: true})
})

module.exports = router