const productModel = require('../models/product');

exports.getAddProduct = (req, res, next) => {
    console.log('In middleware for add product (admin.js)');
    res.render('admin123/add-product', { 
        path123: '/admin/add-product', 
        pageTitle123: 'Add Product', 
        formsCSS: true, 
        productsCSS: true, 
        activeAddProduct: true 
    });
}

exports.postAddProduct = (req, res, next) => {
    const title = req.body.title;
    const imageUrl = req.body.imageUrl;
    const description = req.body.description;
    const price = req.body.price;

    const product = new productModel(title, imageUrl, description, price);
    product.save();
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