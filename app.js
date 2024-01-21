const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const rootDir = require('./util/path');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views123');

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public1234')));

const adminData = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use('/admin', adminData.routes);
app.use(shopRoutes);

app.use((req, res, next) => {
    res.render('404', {pageTitle123: 'Page Not Found!', path123: 'ssss'});
});

const server = app.listen(3080);