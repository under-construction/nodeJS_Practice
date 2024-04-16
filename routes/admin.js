const express = require('express');
const path = require('path');
const router = express.Router();
const isAuth = require('../middlewares123/is-auth');

const rootDir = require('../util/path');

const adminController = require('../controllers/admin');

router.get('/add-product', isAuth, adminController.getAddProduct);

router.post('/add-product1234', isAuth, adminController.postAddProduct);

router.get('/product-list123', isAuth, adminController.getProducts);

router.get('/edit-product/:productId123', isAuth, adminController.getEditProduct);

router.post('/edit-product', isAuth, adminController.postEditProduct);

router.post('/delete-product123/:productId123', isAuth, adminController.deleteProduct);

module.exports = router;