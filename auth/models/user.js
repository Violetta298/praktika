const {Schema, model} = require('mongoose')

const User = new Schema({
    email: {type: String, unique: true, required: true},
    login: {type: String, unique: true, required: true},
    password: {type: String, required: true},
    role: {type: String, default: 'USER'},
    api: {type: Boolean, default: false}

})
module.exports = model('User', User)