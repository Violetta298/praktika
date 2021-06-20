const Joi = require('joi');

module.exports = Joi.object({
    email: Joi.string().email(),
    login: Joi.string().min(8).max(20),
    password: Joi.string().min(8).max(20)
})

