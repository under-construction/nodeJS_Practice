const express = require('express');

const app = express();

app.use('/', (req, res, next) => {
    console.log('In middleware for root path (always runs)');
    next();
});

app.use('/add-product', (req, res, next) => {
    console.log('In middleware for add product');
    res.send('<h1>Hello from add product page</h1>');
});

app.use('/', (req, res, next) => {
    console.log('In middleware for express.js page');
    res.send('<h1>Hello from Express.js</h1>');
});

const server = app.listen(3080);