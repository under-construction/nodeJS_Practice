const express = require('express');

const router = express.Router();

const shopController = require('../controllers/shop');

router.get('/', shopController.getIndex);

router.get('/products', shopController.getProducts);

router.get('/products/:productId123', shopController.getProductDetail);

router.get('/cart', shopController.getCart);

router.post('/cart', shopController.postCart);

router.get('/orders', shopController.getOrders);

// router.get('/checkout', shopController.getCheckOut);

router.post('/delete-product', shopController.deleteProductFromCart);

router.get('/clearCart', shopController.clearCart);

router.post('/create-order', shopController.postOrder);

module.exports = router;