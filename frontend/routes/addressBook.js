const {Router} = require('express')
const router = new Router()
const auth = require('../middleware/auth.middleware')
const AddressBook = require('../models/addresses')

router.post('/addbook', auth, async (req, res) => {
    try {
        const {name, type, addresses} = req.body
        const addressBook = new AddressBook({name, type, user_id: req.user._id, addresses: addresses.split(' ')})
    
        res.status(200).json({message: 'Книга успешно создана'})
        await addressBook.save()
    } catch (error) {
        res.status(400).json({message: 'Что-то пошло не так...'})
    }
})

router.delete('/deletebook/:id', auth, async (req, res) => {
    try {
        const id = req.params.id
        await AddressBook.findByIdAndDelete(id)
        res.status(200).json({message: 'Книга успешно удалена'})
    } catch (error) {
        res.status(400).json({message: 'Что-то пошло не так...'})
    }
})

module.exports = router