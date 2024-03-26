const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const mongoose = require('mongoose');

const notFound404Controller = require('./controllers/404');
const { run } = require('./util/database');

const PORT = 3080;

const uri = 'mongodb+srv://sa:123@mongodbpractice123.zxtp6fe.mongodb.net/?retryWrites=true&w=majority&appName=mongoDBPractice123';

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views123');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public1234')));

// const adminRoutes = require('./routes/admin');
// const shopRoutes = require('./routes/shop');

// app.use((req, res, next) => {
// User.getById('65f99bd4f6142d4838219906')
//     .then(user => {
//         // ANYTHING CAN BE ATTACHED TO ANY REQUEST VIA MIDDLEWARES FOR FURTHER USE ANYWHERE.
//         req.user = new User(user.name, user.email, user.cart, user._id);
//         req.x = 1;
//         next();
//     })
//     .then(() => {
//         console.log('*****************');
//         // next();
//     })
//     .catch(err => console.log(err));
// next();
// });

// app.use('/admin123', adminRoutes);
// app.use(shopRoutes);


// run(() => {
//     app.listen(PORT);
// });

// app.listen(PORT, () => {
//     run();
// })

app.use('/', (req, res, next) => {
    res.send('hello world!');
})

app.use(notFound404Controller.notFound404);

async function main() {
    await mongoose.connect(uri);
    app.listen(PORT);
}

main().catch(err => {
    console.log(err);
});