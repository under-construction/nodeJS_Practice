const express = require('express');

const path = require('path');

const router = express.Router();

const rootDir = require('../util/path');
const adminData = require('./admin');

const shopController = require('../controllers/shop');

router.get('/', shopController.getIndex);

router.get('/products', shopController.getProducts);

router.get('/products/:productId123', shopController.getProductDetail);

router.get('/cart', shopController.getCart);

router.post('/cart', shopController.postCart);

router.get('/orders', shopController.getOrders);

router.get('/checkout', shopController.getCheckOut);

router.post('/delete-product', shopController.deleteProductFromCart);

module.exports = router;