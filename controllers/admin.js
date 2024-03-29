const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {
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

    const product = new Product(title, price, description, imageUrl, null, req.user._id);

    product
        .save()
        .then(result => {
            res.redirect('/admin123/product-list123');
        })
        .catch(err => console.log(err));
}

exports.getEditProduct = (req, res, next) => {
    const editMode = req.query.edit123;

    if (!editMode) {
        return res.redirect('/');
    }

    const productId = req.params.productId123;

    Product.getById(productId)
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

    const product = new Product(
        updatedTitle,
        updatedPrice,
        updatedDesc,
        updatedImageURL,
        prodId
    );

    product
        .save()
        .then(result => {
            return req.user.calculateCartTotalPrice();
        })
        .then(result => {
            res.redirect('/admin123/product-list123')
        })
        .catch(err => {
            console.log(err);
        });
}

exports.getProducts = (req, res, next) => {
    Product.fetchAll()
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
    const isInCart = req.user.isInCart(req.params.productId123);

    if (isInCart) {
        return req.user.removeDeletedProductFromCart(req.params.productId123)
            .then(result => {
                return Product.delete(req.params.productId123)
            })
            .then(result => {
                res.redirect('/admin123/product-list123');
            })
            .catch(err => console.log(err));
    }
    else {
        return Product.delete(req.params.productId123)
            .then(result => {
                res.redirect('/admin123/product-list123');
            })
            .catch(err => console.log(err));
    }
}