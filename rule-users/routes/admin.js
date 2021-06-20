const { Router } = require('express');
const router = new Router();
const admin = require('../middleware/admin.middleware');
const User = require('../models/user');

router.get('/', admin, async (req, res) => {
	const users = await User.find({ $nor: [{ _id: req.user._id }] });
	const user = await User.findById(req.user._id);
	const blocked = users.filter(item => item.blocked);
	const notBlocked = users.filter(item => !item.blocked && item.role === 'USER');
	const admins = users.filter(item => item.role === 'ADMIN');
	const notAdmins = users.filter(item => item.role === 'USER');
	res.render('admin/index', {
		title: 'Админ панель',
		blocked,
		notBlocked,
		users,
        user,
        admins,
        notAdmins
	});
});

router.patch('/blocked/:id', admin, async (req, res) => {
	const id = req.params.id;

	await User.findOneAndUpdate({ _id: id }, { blocked: true });
	res.status(200).json({ message: 'Ура!' });
});

router.patch('/unblocked/:id', admin, async (req, res) => {
	const id = req.params.id;

	await User.findOneAndUpdate({ _id: id }, { blocked: false });
	res.status(200).json({ message: 'Ура!' });
});

router.patch('/setapi/:id', admin, async (req, res) => {
	const id = req.params.id;
	const user = await User.findById(id);
	await User.findOneAndUpdate({ _id: id }, { api: !user.api });
	res.status(200).json({ message: 'Ура!' });
});

router.patch('/give/:id', admin, async (req, res) => {
	const id = req.params.id;
	await User.findOneAndUpdate({ _id: id }, { role: 'ADMIN' });
	res.status(200).json({ message: 'Ура!' });
});

router.patch('/remove/:id', admin, async (req, res) => {
	const id = req.params.id;
	await User.findOneAndUpdate({ _id: id }, { role: 'USER' });
	res.status(200).json({ message: 'Ура!' });
});


module.exports = router;
