const { Router } = require('express');
const router = new Router();
const nodemailer = require('nodemailer');
const template = require('../config/mailtemplate');
const auth = require('../middleware/auth.middleware');
const AddressBook = require('../models/addresses');
const SMSru = require('sms_ru');
const Sendes = require('../models/sendes')
const { EMAIL_LOGIN, EMAIL_PASSWORD, SMS_API_KEY } = require('../config/config')

const sms = new SMSru(SMS_API_KEY);

const transporter = nodemailer.createTransport({
	service: 'gmail',

	auth: {
		user: EMAIL_LOGIN,
		pass: EMAIL_PASSWORD,
	},
});

router.post('/text', auth, async (req, res) => {
	const { name, text, emails } = req.body;
	try {
        const email = await AddressBook.findById(emails);
        
		await transporter.sendMail({
			from: '"nodejs@example.com',
			to: `${email.addresses.join(',')}`,
			subject: name,
			text,
        });

        const send = new Sendes({address: emails, type: 'EMAIL', user_id: req.user.id})
        await send.save()

		res.status(200).json({ message: 'Рассылка успешно отправлена' });
	} catch (e) {
		res.status(400).json({ message: 'Что-то пошло не так...' });
	}
});
router.post('/template', auth, async (req, res) => {
	const {
		name,
		linkToSite,
		title,
		text1,
		text2,
		link1,
		link1text,
		link2,
		link2text,
		link3,
		link3text,
		emails,
	} = req.body;
	try {
		const email = await AddressBook.findById(emails);
		await transporter.sendMail({
			from: '"nodejs@example.com',
			to: `${email.addresses.join(',')}`,
			subject: name,
			html: template[1](
				name,
				linkToSite,
				title,
				text1,
				text2,
				link1,
				link1text,
				link2,
				link2text,
				link3,
				link3text
			),
        });
        
        const send = new Sendes({address: emails, type: 'EMAIL', user_id: req.user.id})
        await send.save()

		res.status(200).json({ message: 'Рассылка успешно отправлена' });
	} catch (e) {
		res.status(400).json({ message: 'Что-то пошло не так...' });
	}
});
router.post('/sometemplate', auth, async (req, res) => {
	const { name, html, emails } = req.body;
	try {
		const email = await AddressBook.findById(emails);
		await transporter.sendMail({
			from: '"nodejs@example.com',
			to: `${email.addresses.join(',')}`,
			subject: name,
			html,
		});

        const send = new Sendes({address: emails, type: 'EMAIL', user_id: req.user.id})
        await send.save()

		res.status(200).json({ message: 'Рассылка успешно отправлена' });
	} catch (error) {
		res.status(400).json({ message: 'Что-то пошло не так...' });
	}
});

router.post('/sms', auth, async (req, res) => {
	const { text, phones } = req.body;
	try {
		const phone = await AddressBook.findById(phones);
		sms.sms_send(
			{
				to: `${phone.addresses.join(',')}`,
				text,
			},
			async () => {
                const send = new Sendes({address: phones, type: 'PHONE', user_id: req.user.id})
                await send.save()

				res.status(201).json({
					message: 'Рассылка успешно отправлена',
				});
			}
		);
	} catch (error) {
		res.status(400).json({ message: 'Что-то пошло не так...' });
	}
});

module.exports = router;
