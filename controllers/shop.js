const Product = require('../models/product');

exports.getProducts = async (req, res, next) => {
    try {
        const findResult = await Product.find();
        res.render('shop123/shop-product-list', {
            prods: findResult,
            pageTitle123: 'Shop123',
            path123: '/products'
        });
    } catch (err) {
        console.error(err);
    }
}

exports.getIndex = async (req, res, next) => {
    try {
        const findResult = await Product.find()
        // .select('title price -_id')
        // .populate('userId', 'name')
        res.render('shop123/index', {
            prods: findResult,
            pageTitle123: 'Shop123',
            path123: '/shop'
        });
    } catch (err) {
        console.error(err);
    }
}

// exports.getCart = (req, res, next) => {
//     let cartTotalPrice;
//     req.user.getCart()
//         .then(products => {
//             res.render('shop123/cart', {
//                 path123: '/cart',
//                 pageTitle123: 'Your Cart',
//                 cartItems: products
//             });
//         })
//         .catch(err => console.log(err));
// }

exports.postCart = async (req, res, next) => {
    const retrievedProdId = req.body.productId123;

    try {
        const product = await Product.findById(retrievedProdId);
        if (product) {
            const addToCartResult = await req.user.addToCart(product);
            res.redirect('/cart');
        }
    } catch (err) {
        console.error(err);
    }
}

// exports.deleteProductFromCart = (req, res, next) => {
//     const productId = req.body.productId123;

//     req.user.deleteProductFromCart(productId)
//         .then(result => {
//             res.redirect('/cart');
//         });
// }

// exports.clearCart = (req, res, next) => {
//     req.user.clearCart()
//         .then(result => {
//             res.redirect('/cart');
//         })
// }

// // exports.getCheckOut = (req, res, next) => {
// //     res.render('shop123/checkout', {
// //         path123: '/checkout',
// //         pageTitle123: 'Checkout'
// //     });
// // }

// exports.getOrders = (req, res, next) => {
//     req.user.getOrders()
//         .then(orders => {
//             res.render('shop123/orders', {
//                 path123: '/orders',
//                 pageTitle123: 'Orders',
//                 orders: orders
//             });
//         })
//         .catch(err => {
//             console.log(err);
//         })
// }

// exports.postOrder = (req, res, next) => {
//     req.user.addOrder()
//         .then(() => {
//             res.redirect('/');
//         })
//         .catch(err => {
//             console.log(err);
//         });
// }

exports.getProductDetail = async (req, res, next) => {
    const productId = req.params.productId123;

    try {
        const findResult = await Product.findById(productId);
        res.render('shop123/product-detail', {
            path123: `/products`,
            pageTitle123: `Product Detail: ${findResult.title}`,
            product: findResult
        });
    } catch (err) {
        console.error(err);
    }
}