const express = require('express');

const path = require('path');

const router = express.Router();

const rootDir = require('../util/path');
const adminData = require('./admin');

router.get('/', (req, res, next) => {
    res.render('shop123', { prods: adminData.products, pageTitle123: 'Shop123', path123: '/shop', hasProducts: adminData.products.length > 0, activeShop: true, productsCSS: true });
});




module.exports = router;