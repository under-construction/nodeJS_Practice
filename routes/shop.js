const express = require('express');

const router = express.Router();
const isAuth = require('../middlewares123/is-auth');

const shopController = require('../controllers/shop');

router.get('/', shopController.getIndex);

router.get('/products', shopController.getProducts);

router.get('/products/:productId123', shopController.getProductDetail);

router.get('/cart', isAuth, shopController.getCart);

router.post('/cart', isAuth, shopController.postCart);

router.get('/orders', isAuth, shopController.getOrders);

router.get('/checkout', isAuth, shopController.getCheckOut);

router.get('/checkout/success', shopController.postOrder);

router.get('/checkout/cancel', shopController.getCheckOutCancel);

router.post('/delete-product', isAuth, shopController.deleteProductFromCart);

router.get('/clearCart', isAuth, shopController.clearCart);

router.post('/create-order', isAuth, shopController.postOrder);

router.get('/orders/:orderId', isAuth, shopController.getInvoice);

module.exports = router;