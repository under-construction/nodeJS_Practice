const express = require('express');
const path = require('path');
const router = express.Router();

const rootDir = require('../util/path');

const products = [];

router.get('/add-product', (req, res, next) => {
    console.log('In middleware for add product (admin.js)');
    res.sendFile(path.join(rootDir, 'views', 'add-product.html'));
});

router.post('/add-product1234', (req, res, next) => {
    products.push({ title: req.body.title });
    res.redirect('/');
});


exports.routes = router;
exports.products = products;