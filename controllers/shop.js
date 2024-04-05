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

exports.getCart = async (req, res, next) => {
    try {
        const result = await req.user.getCart();

        // .populate('cart.items.productId');

        // const getCartMth = await req.user.getCart();
        // console.log(user);
        // console.log(getCartMth);
        // console.log(user === getCartMth); // PRINTS true

        res.render('shop123/cart', {
            path123: '/cart',
            pageTitle123: 'Your Cart',
            cart: result
        })
    } catch (err) {
        console.error(err);
    }
}

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

exports.deleteProductFromCart = async (req, res, next) => {
    const productId = req.body.productId123;

    try {
        const item = await req.user.deleteProductFromCart(productId);
        res.redirect('/cart');
    } catch (err) {
        console.error(err);
    }
}

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