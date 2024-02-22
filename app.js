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

app.use('/admin123', adminRoutes);
app.use(shopRoutes);

app.use(notFound404Controller.notFound404);

Product.belongsTo(User, { constraints: true, onDelete: 'CASCADE' });
User.hasMany(Product);

sequelize.sync({ force: true })
    .then(res => {
        // console.log(res);
        const server = app.listen(3080);
    })
    .catch(err => console.log(err));