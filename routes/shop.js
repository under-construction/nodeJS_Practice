const express = require('express');

const path = require('path');

const router = express.Router();

const rootDir = require('../util/path');
const adminData = require('./admin');

const productsController = require('../controllers/products');

router.get('/', productsController.getProducts);

router.get('/product-detail123', productsController.getProductDetail);


module.exports = router;