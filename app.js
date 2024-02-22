const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const rootDir = require('./util/path');

const notFound404Controller = require('./controllers/404');

const sequelize = require('./util/database');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views123');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public1234')));

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const Product = require('./models/product');
const User = require('./models/user');

app.use((req, res, next) => {
    User.findByPk(1)
        .then(user => {
            // ANYTHING CAN BE ATTACHED TO ANY REQUEST VIA MIDDLEWARES FOR FURTHER USE ANYWHERE.
            req.user = user;
            req.x = 1;
            next();
        })
        .catch(err => console.log(err));
});

app.use('/admin123', adminRoutes);
app.use(shopRoutes);

app.use(notFound404Controller.notFound404);

Product.belongsTo(User, { constraints: true, onDelete: 'CASCADE' });
User.hasMany(Product);

sequelize.sync()
    .then(res => {
        return User.findByPk(1);
    })
    .then(user => {
        if (!user) {
            return User.create({ name: 'ercument', email: 'ercu@test.com' })
        }
        return user;
    })
    .then(user => {
        // console.log(user);
        app.listen(3080);
    })
    .catch(err => console.log(err));