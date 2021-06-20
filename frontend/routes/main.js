const { Router } = require('express');
const auth = require('./../middleware/auth.middleware');
const router = new Router();
const AddressBook = require('../models/addresses');
const Sendes = require('../models/sendes');

router.get('/main', auth, async (req, res) => {
	const addreses = await AddressBook.find({ user_id: req.user._id });
	res.render('create', {
		title: 'Создать рассылку',
		user: req.user,
		addreses,
	});
});
router.get('/api', auth, (req, res) => {
	res.render('api', { title: 'API', user: req.user });
});
router.get('/documentation', auth, (req, res) => {
	res.render('documentation', { title: 'Документация', user: req.user });
});
router.get('/history', auth, async (req, res) => {
    const history = await Sendes.find({user_id: req.user._id}).populate({path: 'address', select: 'addresses'})

	res.render('history', {
		title: 'История рассылок',
        user: req.user,
        history
	});
});

module.exports = router;
