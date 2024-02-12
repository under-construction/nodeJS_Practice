const Product = require('../models/product');
const productModel = require('../models/product');

exports.getAddProduct = (req, res, next) => {
    console.log('In middleware for add product (admin.js)');
    res.render('admin123/edit-product', { 
        path123: '/admin/add-product', 
        pageTitle123: 'Add Product',
        editing: false
    });
}

exports.postAddProduct = (req, res, next) => {
    const title = req.body.title;
    const imageUrl = req.body.imageUrl;
    const description = req.body.description;
    const price = req.body.price;

    const product = new productModel(null, title, imageUrl, description, price);
    product.save();
    res.redirect('/');
}

exports.getEditProduct = (req, res, next) => {
    const editMode = req.query.edit123;

    if (!editMode) {
        return res.redirect('/');
    }

    const productId = req.params.productId123;

    Product.getById(productId, product => {
        if (!product) {
            res.render('/');
        }
        res.render('admin123/edit-product', {
            path123: '/admin/edit-product', 
            pageTitle123: 'Edit Product',
            editing: true,
            product: product
        });
    });
}

exports.postEditProduct = (req, res, next) => {
    const prodId = req.body.prodId123;

    const updatedTitle = req.body.title;
    const updatedImageURL = req.body.imageUrl;
    const updatedPrice = req.body.price;
    const updatedDesc = req.body.description;

    const updatedProduct = new Product(prodId, updatedTitle, updatedImageURL, updatedDesc, updatedPrice);
    updatedProduct.save();

    res.redirect('/');
}

exports.getProducts = (req, res, next) => {
    productModel.fetchAll(products => {
        res.render('admin123/admin-product-list', { 
            prods: products, 
            pageTitle123: 'Admin Products', 
            path123: '/admin/product-list' 
        });
    });
}