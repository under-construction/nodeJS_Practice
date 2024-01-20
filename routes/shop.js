const express = require('express');

const path = require('path');

const router = express.Router();

const rootDir = require('../util/path');
const adminData = require('./admin');

router.get('/', (req, res, next) => {
    res.render('shop123', { prods: adminData.products, docTitle123: 'Shop123', path123: '/shop'});
});




module.exports = router;