const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoDBStore123 = require('connect-mongodb-session')(session);

const notFound404Controller = require('./controllers/404');
const { run } = require('./util/database');
const User = require('./models/user');

const PORT = 3080;

const uri = 'mongodb+srv://sa:123@mongodbpractice123.zxtp6fe.mongodb.net/shopDatabase987?w=majority&appName=mongoDBPractice123';

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const authRoutes = require('./routes/auth');

const app = express();
const store123 = new MongoDBStore123({
    uri: uri,
    collection: 'mySessions987'
})

app.set('view engine', 'ejs');
app.set('views', 'views123');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public1234')));
app.use(session({
    secret: 'secret-key-123',
    resave: false,
    saveUninitialized: false,
    // cookie: {
    //     maxAge: 60000
    // },
    store: store123
}));


app.use((req, res, next) => {
    if (!req.session.user) {
        return next();
    }

    User.findById(req.session.user._id)
        .then(user => {
            req.user = user;
            next();
        })
        .catch(err => {
            console.error(err);
        });
});

app.use('/admin123', adminRoutes);
app.use(shopRoutes);
app.use('/auth789', authRoutes);

// run(() => {
//     app.listen(PORT);
// });

// app.listen(PORT, () => {
//     run();
// })

app.use(notFound404Controller.notFound404);

async function main() {
    await mongoose.connect(uri);
    // const ifAUserExists = await User.findOne();
    // if (!ifAUserExists) {
    //     const user = new User({
    //         name: 'ercu',
    //         email: 'ercu@test.com',
    //         cart: {
    //             items: [],
    //             totalPrice: 0
    //         }
    //     });
    //     await user.save();
    // }
    app.listen(PORT);
}

main().catch(err => {
    console.log(err);
});