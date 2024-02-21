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

    Product.create({
        title: title,
        imageUrl: imageUrl,
        description: description,
        price: price
    })
        .then(res => console.log('Product has been created.'))
        .catch(err => console.log(err));
}

exports.getEditProduct = (req, res, next) => {
    const editMode = req.query.edit123;

    if (!editMode) {
        return res.redirect('/');
    }

    const productId = req.params.productId123;

    Product.findByPk(productId)
        .then(product => {
            if (!product) {
                res.redirect('/');
            }
            res.render('admin123/edit-product', {
                path123: '/admin/edit-product',
                pageTitle123: 'Edit Product',
                editing: true,
                product: product
            });
        })
        .catch(err => console.log(err))
}

exports.postEditProduct = (req, res, next) => {
    const prodId = req.body.prodId123;

    const updatedTitle = req.body.title;
    const updatedImageURL = req.body.imageUrl;
    const updatedPrice = req.body.price;
    const updatedDesc = req.body.description;

    Product.findByPk(prodId)
        .then(product => {
            product.title = updatedTitle;
            product.imageUrl = updatedImageURL;
            product.price = updatedPrice;
            product.description = updatedDesc;
            return product.save(); // return IS IMPORTANT HERE SINCE IT MUST RETURN A VALUE TO THE NEXT then BLOCK
        })
        .then(() => {
            res.redirect('/admin123/product-list123') // ANOTHER then BLOCK MAKING SURE THAT redirect OPERATION IS DONE ONLY AFTER THE PRODUCT WAS SAVED (PREVIOUS then BLOCK)
        })
        .catch(err => console.log(err))
}

exports.getProducts = (req, res, next) => {
    Product.findAll()
        .then(data => {
            res.render('admin123/admin-product-list', {
                prods: data,
                pageTitle123: 'Admin Products',
                path123: '/admin/product-list'
            });
        })
        .catch(err => console.log(err));
}

exports.deleteProduct = (req, res, next) => {
    Product.remove(req.params.productId123)
        .then(res.redirect('/'))
        .catch(err => console.log(err));
}