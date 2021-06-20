const {Router} = require('express')
const router = new Router()
const User = require('../models/user')
const SMSru = require('sms_ru');
const nodemailer = require('nodemailer');
const { EMAIL_LOGIN, EMAIL_PASSWORD, SMS_API_KEY } = require('../config/config')

const sms = new SMSru(SMS_API_KEY);

const transporter = nodemailer.createTransport({
	service: 'gmail',

	auth: {
		user: EMAIL_LOGIN,
		pass: EMAIL_PASSWORD,
	},
});


router.post('/:id/sms', async (req, res) => {
    const id = req.params.id
    const user = await User.findById(id)

    if(!user) {
        return req.status(404).json('Пользователь не найден')
    }

    if(!user.api) {
        return req.status(403).json('Запрещен доступ')
    }

    const {address, text} = req.body

    sms.sms_send(
        {
            to: `${address.join(',')}`,
            text,
        },
        async () => {
            res.status(200).json({
                message: 'Рассылка успешно отправлена',
            });
        }
    );

})

router.post('/:id/email', (req, res) => {
    const id = req.params.id
    const user = await User.findById(id)

    if(!user) {
        return req.status(404).json('Пользователь не найден')
    }

    if(!user.api) {
        return req.status(403).json('Запрещен доступ')
    }

    const {address, text, title} = req.body

    await transporter.sendMail({
        from: '"nodejs@example.com',
        to: `${address.join(',')}`,
        subject: title,
        text,
    });


    res.status(200).json({ message: 'Рассылка успешно отправлена' });
})

module.exports = router