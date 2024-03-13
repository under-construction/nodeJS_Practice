const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const notFound404Controller = require('./controllers/404');
const { mongoConnect } = require('./util/database');

const PORT = 3080;

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views123');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public1234')));

// const adminRoutes = require('./routes/admin');
// const shopRoutes = require('./routes/shop');

app.use((req, res, next) => {
    // User.findByPk(1)
    //     .then(user => {
    //         // ANYTHING CAN BE ATTACHED TO ANY REQUEST VIA MIDDLEWARES FOR FURTHER USE ANYWHERE.
    //         req.user = user;
    //         req.x = 1;
    //     })
    //     .then(() => {
    //         console.log('*****************');
    //         next();
    //     })
    //     .catch(err => console.log(err));
});

// app.use('/admin123', adminRoutes);
// app.use(shopRoutes);

app.use(notFound404Controller.notFound404);

mongoConnect(client => {
    app.listen(PORT);
});