const express = require('express')
const {PORT, DB_URI} = require('./config/config')
const cors = require('cors')
const mongoose = require('mongoose')

const app = express()
app.use(express.json())
app.use(express.urlencoded({extended: true}));
app.use(cors())


app.use('/', require('./routes/auth'))



async function start() {
    try {
        await mongoose.connect(DB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
       app.listen(PORT, () => {
           console.log('server strted on ' + PORT);
       })
    } catch (e) {
        console.log(e);
    }
}
start()
