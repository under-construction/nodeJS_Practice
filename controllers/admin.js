const productModel = require('../models/product');

exports.getAddProduct = (req, res, next) => {
    console.log('In middleware for add product (admin.js)');
    res.render('admin123/edit-product', { 
        path123: '/admin/add-product', 
        pageTitle123: 'Add Product'
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

exports.getEditProduct = (req, res, next) => {
    const editMode = req.query.edit;
    if (!editMode) {
        return res.redirect('/');
    }

    res.render('admin123/edit-product', {
        path123: '/admin/edit-product', 
        pageTitle123: 'Edit Product',
        editing: true
    });
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