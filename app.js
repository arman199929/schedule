const express = require('express');
const app = express();
const path = require('path');
const eL = require('express-ejs-layouts');
const session = require('express-session')
// const fontAwesome = require('@fortawesome/fontawesome-free')

const backRouter = require('./routes/backend/route.js');
const frontRouter = require('./routes/frontend/route.js');


app.use(express.urlencoded({extended: false}));
app.set('views', path.join(__dirname, 'views'));
app.set("view engine", "ejs");

app.use(express.static(path.join(__dirname, 'public')));


app.use(eL)

app.set('layout', './layouts/frontend.ejs');

app.use(session({
    secret: 'Arman',
    resave: false,
    saveUninitialized: true,
    cookie: {}

}))

app.use('/backend', backRouter)
app.use('/', frontRouter);


app.listen(3001, () => {
    console.log('Server started...')
})