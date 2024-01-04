const express = require('express');
const path = require('path');
const router = express.Router();

const rootDir = require('../util/path');

router.get('/add-product', (req, res, next) => {
    console.log('In middleware for add product (admin.js)');
    res.sendFile(path.join(rootDir, 'views', 'add-product.html'));
});

router.post('/add-product1234', (req, res, next) => {
    console.log(req.body);
    res.redirect('/');
});



module.exports = router;