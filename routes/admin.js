const express = require('express');
const path = require('path');
const router = express.Router();

const rootDir = require('../util/path');

const products = [];

router.get('/add-product', (req, res, next) => {
    console.log('In middleware for add product (admin.js)');
    res.render('add-product', { path123: '/admin/add-product', pageTitle123: 'Add Product', formsCSS: true, productsCSS: true, activeAddProduct: true });
    
});

router.post('/add-product1234', (req, res, next) => {
    products.push({ title: req.body.title });
    res.redirect('/');
});


exports.routes = router;
exports.products = products;