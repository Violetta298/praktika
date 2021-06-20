const {Router} = require('express')
const User = require('../models/user')
const bcrypt = require('bcrypt')
const router = new Router()
const schema = require('../validation')
const notAuth = require('../middleware/notAuth.moddleware')

router.get('/login', notAuth, (req, res) => {
	res.render('login', {title: 'Войти', lang: 'RU'})
})
router.get('/register', notAuth, (req, res) => {
	res.render('register', {title: 'Зарегестрироваться', lang: 'RU', })
})

router.get('/logout', (req, res) => {
  req.session.destroy(() => {
      res.redirect('/login')
  })
})

router.post('/register', async (req, res) => {
  const {error} = schema.validate(req.body)

  if(error) {
    return res.status(400).json({message: 'Ошибка валидации'})
  }
  try {
      const {email, login, password} = req.body

      const confirm = await User.findOne({login})

      if(confirm) {
          return res.status(400).json({message: 'Пользователь c таким логином существует!'})
      }

      const candidate = await User.findOne({email})

      if(candidate) {
        return res.status(400).json({message: 'Пользователь c таким Email существует!'})
    }

      const hash = await bcrypt.hash(password, 10)

      const user = new User({login, password: hash, email})

      await user.save()

	  res.status(201).json({message: 'Пользователь упешно зарегестрирован!'})

  } catch (e) {
    res.status(400).json({message: 'Что-то пошло не так...'})
  }  
})

router.post('/login', async (req, res) => {

  try {
    const {login, password} = req.body

    const user = await User.findOne({$or: [{login}, {email: login}]})

    if(!user) {
        return res.status(404).json({message: 'Некоректные логин или проль'})
    }

    const isMatch = await bcrypt.compare(password, user.password)

    if(!isMatch) {
        return res.status(400).json({message: 'Некоректные логин или проль'})
    }

    if(user.blocked) {
      return res.status(400).json({message: 'Пользователь заблокирован'})
    }

    req.session.isAuthenticated = true
    req.session.user = user
    req.session.save(err => {
        if (err) {
            throw err
        }
        res.redirect('/main')
    })

  } catch (e) {
    res.status(400).json({message: 'Что-то пошло не так...'})
  }  
})

module.exports = router
