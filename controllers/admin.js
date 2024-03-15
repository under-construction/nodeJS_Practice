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

    const product = new Product(title, price, description, imageUrl);

    product
        .save()
        .then(result => {
            res.redirect('/admin123/product-list123');
        })
        .catch(err => console.log(err));
}

// exports.getEditProduct = (req, res, next) => {
//     const editMode = req.query.edit123;

//     if (!editMode) {
//         return res.redirect('/');
//     }

//     const productId = req.params.productId123;

//     req.user.getProducts({ where: { id: productId } })
//         .then(products => {
//             const product = products[0];
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

//     req.user.getProducts({ where: { id: prodId } })
//         .then(product => {
//             product.title = updatedTitle;
//             product.imageUrl = updatedImageURL;
//             product.price = updatedPrice;
//             product.description = updatedDesc;
//             return product.save(); // return IS IMPORTANT HERE SINCE IT MUST RETURN A VALUE TO THE NEXT then BLOCK
//         })
//         .then(() => {
//             res.redirect('/admin123/product-list123') // ANOTHER then BLOCK MAKING SURE THAT redirect OPERATION IS DONE ONLY AFTER THE PRODUCT WAS SAVED (PREVIOUS then BLOCK)
//         })
//         .catch(err => console.log(err))
// }

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
    Product.delete(req.params.productId123)
        .then(() => {
            res.redirect('/admin123/product-list123');
        })
        .catch(err => console.log(err));
}