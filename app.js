const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({extended: false}));

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use('/admin', adminRoutes);
app.use('/shop123', shopRoutes);

app.use((req, res, next) => {
    res.status(404).send('<h1>Page not found (404)</h1>');
})

const server = app.listen(3080);