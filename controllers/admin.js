const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {
    res.render('admin123/edit-product', {
        path123: '/admin/add-product',
        pageTitle123: 'Add Product',
        editing: false
    });
}

exports.postAddProduct = async (req, res, next) => {
    const product = new Product({
        title: req.body.title,
        price: req.body.price,
        description: req.body.description,
        imageUrl: req.body.imageUrl
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

// exports.getEditProduct = (req, res, next) => {
//     const editMode = req.query.edit123;

//     if (!editMode) {
//         return res.redirect('/');
//     }

//     const productId = req.params.productId123;

//     Product.getById(productId)
//         .then(product => {
//             if (!product) {
//                 res.redirect('/');
//             }
//             res.render('admin123/edit-product', {
//                 path123: '/admin/edit-product',
//                 pageTitle123: 'Edit Product',
//                 editing: true,
//                 product: product
//             });
//         })
//         .catch(err => console.log(err))
// }

// exports.postEditProduct = (req, res, next) => {
//     const prodId = req.body.prodId123;

//     const updatedTitle = req.body.title;
//     const updatedImageURL = req.body.imageUrl;
//     const updatedPrice = req.body.price;
//     const updatedDesc = req.body.description;

//     const product = new Product(
//         updatedTitle,
//         updatedPrice,
//         updatedDesc,
//         updatedImageURL,
//         prodId
//     );

//     product
//         .save()
//         .then(result => {
//             return req.user.calculateCartTotalPrice();
//         })
//         .then(result => {
//             res.redirect('/admin123/product-list123')
//         })
//         .catch(err => {
//             console.log(err);
//         });
// }

// exports.getProducts = (req, res, next) => {
//     Product.fetchAll()
//         .then(data => {
//             res.render('admin123/admin-product-list', {
//                 prods: data,
//                 pageTitle123: 'Admin Products',
//                 path123: '/admin/product-list'
//             });
//         })
//         .catch(err => console.log(err));
// }

// exports.deleteProduct = (req, res, next) => {
//     const isInCart = req.user.isInCart(req.params.productId123);

//     if (isInCart) {
//         return req.user.removeDeletedProductFromCart(req.params.productId123)
//             .then(result => {
//                 return Product.delete(req.params.productId123)
//             })
//             .then(result => {
//                 res.redirect('/admin123/product-list123');
//             })
//             .catch(err => console.log(err));
//     }
//     else {
//         return Product.delete(req.params.productId123)
//             .then(result => {
//                 res.redirect('/admin123/product-list123');
//             })
//             .catch(err => console.log(err));
//     }
// }