const productModel = require('../models/product');

exports.getAddProduct = (req, res, next) => {
    console.log('In middleware for add product (admin.js)');
    res.render('add-product', { 
        path123: '/admin/add-product', 
        pageTitle123: 'Add Product', 
        formsCSS: true, 
        productsCSS: true, 
        activeAddProduct: true 
    });
}

exports.postAddProduct = (req, res, next) => {
    const product = new productModel(req.body.title);
    product.save();
    res.redirect('/');
}

exports.getProducts = (req, res, next) => {
    productModel.fetchAll(products => {
        res.render('shop123', { 
            prods: products, 
            pageTitle123: 'Shop123', 
            path123: '/shop', 
            hasProducts: products.length > 0, 
            activeShop: true, 
            productsCSS: true 
        });
    });
}

//another edit from forked repo
