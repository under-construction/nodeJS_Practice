const express = require('express');
const path = require('path');
const router = express.Router();

const rootDir = require('../util/path');

const adminController = require('../controllers/admin');

router.get('/add-product', adminController.getAddProduct);

router.post('/add-product1234', adminController.postAddProduct);

router.get('/product-list123', adminController.getProducts);

router.get('/edit-product/:productId123', adminController.getEditProduct);

module.exports = router;