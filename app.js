const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({extended: false}));

app.use('/', (req, res, next) => {
    console.log('In middleware for root path (always runs)');
    next();
});

app.use('/add-product', (req, res, next) => {
    console.log('In middleware for add product');
    res.send(
        '<form action="/product" method="POST"><input type="text" name="title"><button type="submit">Add product</button></form>');
});

app.use('/product', (req, res, next) => {
    console.log(req.body);
    res.redirect('/');
});

app.use('/', (req, res, next) => {
    console.log('In middleware for express.js page');
    res.send('<h1>Hello from Express.js</h1>');
});

const server = app.listen(3080);