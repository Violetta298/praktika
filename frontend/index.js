const express = require('express')
const {PORT, DB_URI, SECRET} = require('./config/config')
const cors = require('cors')
const mongoose = require('mongoose')
const path = require('path')
const app = express()
const session = require('express-session')
const MongoStore = require('connect-mongodb-session')(session)

app.use(express.json())
app.use(express.urlencoded({extended: true}));
app.use(cors())
app.use(express.static(path.join(__dirname, 'public')))
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

const store = new MongoStore({
    collection: 'sessions',
    uri: DB_URI
})

app.use(session({
    secret: SECRET,
    resave: false,
    saveUninitialized: false,
    store
}))

app.use(require('./middleware/user.middleware'))

app.use('/', require('./routes/auth'))
app.use('/', require('./routes/start'))
app.use('/', require('./routes/main'))
app.use('/sender', require('./routes/sender'))
app.use('/sender', require('./routes/addressBook'))
app.use('/admin', require('./routes/admin'))

async function start() {
    try {
        await mongoose.connect(DB_URI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false })
       app.listen(PORT, () => {
           console.log('server strted on ' + PORT);
       })
    } catch (e) {
        console.log(e);
    }
}
start()
