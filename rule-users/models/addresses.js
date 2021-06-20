const {Schema, model} = require('mongoose')

const AddressBook = new Schema({
    name: {type: String, default: new Date().toISOString()},
    addresses: {type: Array, required: true},
    user_id: {type: Schema.Types.ObjectId, required: true, ref: 'User'},
    type: {type: String, required: true, enum: ['PHONE', 'EMAIL']}
})
module.exports = model('AddressBook', AddressBook)