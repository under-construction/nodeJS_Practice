const express = require('express');
const path = require('path');
const router = express.Router();
const isAuth = require('../middlewares123/is-auth');
const { check, body } = require('express-validator');

const rootDir = require('../util/path');

const adminController = require('../controllers/admin');

router.get('/add-product', isAuth, adminController.getAddProduct);

router.post(
    '/add-product1234',
    isAuth,
    [
        body('title')
            .isString()
            .withMessage('title must be a proper string')
            .isLength({ min: 5 })
            .withMessage('title must be at least 5 characters long'),
        body('price')
            .isNumeric()
            .withMessage('price must be a number')
            .custom(value => {
                if (value > 900) {
                    throw new Error('price can not be higher than 900');
                }
                return true;
            }),
        body('description')
            .isLength({ min: 10, max: 400 })
            .withMessage('product description must be at least 10 characters')
            .isString()
            .withMessage('product description should not include number')
    ],
    adminController.postAddProduct
);

router.get('/product-list123', isAuth, adminController.getProducts);

router.get('/edit-product/:productId123', isAuth, adminController.getEditProduct);

router.post('/edit-product',
    isAuth,
    [
        body('title')
            .isString()
            .withMessage('title must be a proper string')
            .isLength({ min: 5 })
            .withMessage('title must be at least 5 characters long')
            .trim(),
        body('price')
            .isNumeric()
            .withMessage('price must be a number')
            .custom(value => {
                if (value > 900) {
                    throw new Error('price can not be higher than 900');
                }
                return true;
            }),
        body('description')
            .isLength({ min: 10, max: 400 })
            .withMessage('product description must be at least 10 characters')
            .isString()
            .withMessage('product description should not include number')
    ],
    adminController.postEditProduct);

router.post('/delete-product123/:productId123', isAuth, adminController.deleteProduct);

module.exports = router;