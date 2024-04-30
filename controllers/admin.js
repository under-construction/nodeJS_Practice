const Product = require('../models/product');
const { validationResult } = require('express-validator');

exports.getAddProduct = (req, res, next) => {
    try {
        let message = req.flash('error123');

        if (message.length > 0) {
            message = message[0];
        } else {
            message = null;
        }

        if (!req.session.isLoggedIn) {
            return res.redirect('/auth789/login789');
        }

        res.render('admin123/edit-product', {
            path123: '/admin/add-product',
            pageTitle123: 'Add Product',
            editing: false,
            errorMessage: message,
            errorsArray: []
        });
    } catch (err) {
        const error = new Error(err);
        error.httpStatusCode = 500;
        return next(err);
    }
}

exports.postAddProduct = async (req, res, next) => {

    const title = req.body.title;
    const price = req.body.price;
    const description = req.body.description;
    const image = req.file;

    if (!image) {
        return res.status(422).render('admin123/edit-product', {
            path123: '/admin/add-product',
            pageTitle123: 'Add Product',
            editing: false,
            errorMessage: 'Attached file is not an image.',
            errorsArray: [],
            product: {
                title: title,
                price: price,
                description: description
            }
        });
    }

    const errors = validationResult(req);
    const errorsArray = errors.array();

    if (!errors.isEmpty()) {
        return res.status(422).render('admin123/edit-product', {
            path123: '/admin/add-product',
            pageTitle123: 'Add Product',
            editing: false,
            errorMessage: errors.array()[0].msg,
            errorsArray: errorsArray,
            product: {
                title: title,
                price: price,
                description: description
            }
        });
    }

    const product = new Product({
        title: title,
        price: price,
        description: description,
        imageUrl: image.path,
        userId: req.user, // mongoose will only pick up _id property here,
    });

    try {
        const saveResult = await product.save();
        res.redirect('/');
    } catch (err) {
        const error = new Error(err);
        error.httpStatusCode = 500;
        return next(err);
    }
}

exports.getEditProduct = async (req, res, next) => {
    const editMode = req.query.edit123;

    if (!editMode) {
        return res.redirect('/');
    }

    const productId = req.params.productId123;

    try {
        const findResult = await Product.findById(productId);
        if (!findResult) {
            res.redirect('/');
        }
        res.render('admin123/edit-product', {
            path123: '/admin/edit-product',
            pageTitle123: 'Edit Product',
            editing: true,
            product: findResult,
            errorMessage: '',
            errorsArray: []
        });
    } catch (err) {
        const error = new Error(err);
        error.httpStatusCode = 500;
        return next(err);
    }
}

exports.postEditProduct = async (req, res, next) => {
    const prodId = req.body.prodId123;

    const updatedTitle = req.body.title;
    const image = req.file;
    const updatedPrice = req.body.price;
    const updatedDesc = req.body.description;

    try {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(422).render(
                'admin123/edit-product',
                {
                    path123: '/admin/edit-product',
                    pageTitle123: 'Edit Product',
                    editing: true,
                    product: {
                        title: updatedTitle,
                        price: updatedPrice,
                        description: updatedDesc,
                        _id: prodId
                    },
                    errorMessage: errors.array()[0].msg,
                    errorsArray: errors.array()
                });
        }

        const retrievedProduct = await Product.findById(prodId);

        if (retrievedProduct.userId.toString() !== req.user._id.toString()) {
            return res.redirect('/');
        }

        retrievedProduct.title = updatedTitle;
        retrievedProduct.price = updatedPrice;
        retrievedProduct.description = updatedDesc;

        if (image) {
            retrievedProduct.imageUrl = image.path;
        }

        const saveResult = await retrievedProduct.save();

        res.redirect('/');
    } catch (err) {
        const error = new Error(err);
        error.httpStatusCode = 500;
        return next(err);
    }
}

exports.getProducts = async (req, res, next) => {
    try {
        const findResult = await Product.find({
            userId: req.user._id
        });

        // throw new Error('an error occured');

        res.render('admin123/admin-product-list', {
            prods: findResult,
            pageTitle123: 'Admin Products',
            path123: '/admin/product-list'
        });
    } catch (err) {
        const error = new Error(err);
        error.httpStatusCode = 500;
        return next(err);
    }
}

exports.deleteProduct = async (req, res, next) => {
    try {
        const productToBeDeleted = await Product.findById(req.params.productId123);

        if (!productToBeDeleted) {
            res.redirect('/');
            return;
        }

        if (productToBeDeleted.userId.toString() === req.user._id.toString()) {
            if (await req.user.isInCart(req.params.productId123)) {
                await req.user.removeDeletedProductFromCart(productToBeDeleted);
            }
        }

        const deleteResult = await Product.deleteOne({
            _id: req.params.productId123,
            userId: req.user._id
        });

        res.redirect('/admin123/product-list123');
    } catch (err) {
        const error = new Error(err);
        error.httpStatusCode = 500;
        return next(err);
    }
}