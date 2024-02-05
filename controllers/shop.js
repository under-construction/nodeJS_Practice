const productModel = require('../models/product');

exports.getProducts = (req, res, next) => {
    productModel.fetchAll(products => {
        res.render('shop123/shop-product-list', { 
            prods: products, 
            pageTitle123: 'Shop123', 
            path123: '/products' 
        });
    });
}

exports.getIndex = (req, res, next) => {
    productModel.fetchAll(products => {
        res.render('shop123/index', { 
            prods: products, 
            pageTitle123: 'Shop123', 
            path123: '/shop'
        });
    });
}

exports.getCart = (req, res, next) => {
    res.render('shop123/cart', {
       path123: '/cart',
       pageTitle123: 'Your Cart'
    });
}

exports.getCheckOut = (req, res, next) => {
    res.render('shop123/checkout', {
        path123: '/checkout',
        pageTitle123: 'Checkout'
    });
}

exports.getOrders = (req, res, next) => {
    res.render('shop123/orders', {
        path123: '/orders',
        pageTitle123: 'Orders'
    })
}

exports.getProductDetail = (req, res, next) => {
    const productId = req.params.productId123;
    console.log(`productId: ${productId}`);
    res.redirect('/');
}