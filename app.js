const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoDBStore123 = require('connect-mongodb-session')(session);
const csrf = require('csurf');
const flash = require('connect-flash');

const errorController = require('./controllers/404');
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
});
const csrfProtection = csrf();

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
app.use(csrfProtection);
app.use(flash());

app.use(async (req, res, next) => {
    if (!req.session.user) {
        return next();
    }

    try {
        const user = await User.findById(req.session.user._id);

        if (!user) {
            return next();
        }

        req.user = user;

        next(); // stops sending request-based operations to the next middleware after this 
    } catch (error) {
        throw new Error(error);
    }
});

app.use((req, res, next) => {
    res.locals.isAuthenticated = req.session.isLoggedIn;
    res.locals.csrfToken = req.csrfToken();
    next();
});

app.use('/admin123', adminRoutes);
app.use(shopRoutes);
app.use('/auth789', authRoutes);

// app.use('/favicon.ico', (req, res, next) => {
//     res.status(404).end();
// });

// run(() => {
//     app.listen(PORT);
// });

// app.listen(PORT, () => {
//     run();
// })

app.use('/500', errorController.internalServer500);
app.use(errorController.notFound404);

app.use((err, req, res, next) => {
    res.redirect('/500');
});

async function main() {
    await mongoose.connect(uri);
    app.listen(PORT);
}

main().catch(err => {
    console.log(err);
});