require('dotenv').config()

module.exports = {
    PORT: process.env.PORT,
    DB_URI: process.env.DB_URI,
    SECRET: process.env.SECRET,
    EMAIL_LOGIN: process.env.EMAIL_LOGIN,
    EMAIL_PASSWORD: process.env.EMAIL_PASSWORD,
    SMS_API_KEY: process.env.SMS_API_KEY
}