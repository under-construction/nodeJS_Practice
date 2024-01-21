const express = require('express');
const path = require('path');
const router = express.Router();

const rootDir = require('../util/path');

const productsController = require('../controllers/products');



router.get('/add-product', productsController.getAddProduct);

router.post('/add-product1234', productsController.postAddProduct);


module.exports = router;