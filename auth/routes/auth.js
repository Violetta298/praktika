const {Router} = require('express')
const User = require('../models/user')
const bcrypt = require('bcrypt')
const {SECRET} = require('../config/config')
const jwt = require('jsonwebtoken')
const router = new Router()


router.post('/register', async (req, res) => {

  try {
      const {login, password} = req.body

      const candidate = await User.findOne({login})

      if(candidate) {
          return res.status(400).json({message: 'Пользователь уже существует!'})
      }

      const hash = await bcrypt.hash(password, 10)

      const user = new User({login, password: hash})

      await user.save()

	  res.status(201).json({message: 'Пользователь упешно зарегестрирован!'})

  } catch (e) {
    res.status(400).json({message: 'Что-то пошло не так...'})
  }  
})

router.post('/login', async (req, res) => {
  try {
    const {login, password} = req.body

    const user = await User.findOne({login})

    if(!user) {
        return res.status(404).json({message: 'Некоректные логин или проль'})
    }

    const isMatch = await bcrypt.compare(password, user.password)

    if(!isMatch) {
        return res.status(400).json({message: 'Некоректные логин или проль'})
    }

    const token = jwt.sign(
        {
            data: user.id
        },
        SECRET,
        {
            expiresIn: '1h'
        }
    )

    res.status(200).json({message: 'Вы вошли!', token})
  } catch (e) {
    res.status(400).json({message: 'Что-то пошло не так...'})
  }  
})

module.exports = router
