const {Schema, model} = require('mongoose')

const Sendes = new Schema({
    address: {type: Schema.Types.ObjectId, required: true, ref: 'AddressBook'},
    type: {type: String, enum: ['PHONE', 'EMAIL']},
    date: {type: Date, default: new Date()},
    user_id: {type: Schema.Types.ObjectId, required: true, ref: 'User'},

})
module.exports = model('Sendes', Sendes)