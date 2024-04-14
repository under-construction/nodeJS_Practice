const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {
    res.render('admin123/edit-product', {
        path123: '/admin/add-product',
        pageTitle123: 'Add Product',
        editing: false,
        isAuthenticated: req.session.isLoggedIn
    });
}

exports.postAddProduct = async (req, res, next) => {
    const product = new Product({
        title: req.body.title,
        price: req.body.price,
        description: req.body.description,
        imageUrl: req.body.imageUrl,
        userId: req.session.user // mongoose will only pick up _id property here
    });

    try {
        const saveResult = await product.save();
        res.redirect('/');
    } catch (err) {
        console.error(err);
    } finally {
        console.log('product was successfully saved');
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
            isAuthenticated: req.session.isLoggedIn
        });
    } catch (err) {
        console.error(err);
    }
}

exports.postEditProduct = async (req, res, next) => {
    const prodId = req.body.prodId123;

    const updatedTitle = req.body.title;
    const updatedImageURL = req.body.imageUrl;
    const updatedPrice = req.body.price;
    const updatedDesc = req.body.description;

    try {
        const retrievedProduct = await Product.findById(prodId);
        retrievedProduct.title = updatedTitle;
        retrievedProduct.price = updatedPrice;
        retrievedProduct.description = updatedDesc;
        retrievedProduct.imageUrl = updatedImageURL;
        const saveResult = await retrievedProduct.save();

        res.redirect('/');
    } catch (err) {
        console.error(err);
    }
}

exports.getProducts = async (req, res, next) => {
    try {
        const findResult = await Product.find();
        res.render('admin123/admin-product-list', {
            prods: findResult,
            pageTitle123: 'Admin Products',
            path123: '/admin/product-list',
            isAuthenticated: req.session.isLoggedIn
        });
    } catch (err) {
        console.error(err);
    }
}

exports.deleteProduct = async (req, res, next) => {
    try {
        const productToBeDeleted = await Product.findById(req.params.productId123);

        if (!productToBeDeleted) {
            res.redirect('/');
            return;
        }

        if (await req.session.user.isInCart(req.params.productId123)) {
            await req.session.user.removeDeletedProductFromCart(productToBeDeleted);
        }

        const deleteResult = await productToBeDeleted.deleteOne();
        res.redirect('/admin123/product-list123');

    } catch (err) {
        console.error(err);
    }
}