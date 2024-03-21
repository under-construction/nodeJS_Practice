const Product = require('../models/product');

exports.getProducts = (req, res, next) => {
    Product.fetchAll()
        .then(data => {
            res.render('shop123/shop-product-list', {
                prods: data,
                pageTitle123: 'Shop123',
                path123: '/products'
            });
        })
        .catch(err => console.log(err));
}

exports.getIndex = (req, res, next) => {
    Product.fetchAll()
        .then(data => {
            res.render('shop123/index', {
                prods: data,
                pageTitle123: 'Shop123',
                path123: '/shop'
            });
        })
        .catch(err => console.log(err));
}

exports.getCart = (req, res, next) => {
    let cartTotalPrice;
    req.user.getCart()
        .then(products => {
            res.render('shop123/cart', {
                path123: '/cart',
                pageTitle123: 'Your Cart',
                cartItems: products
            });
        })
        .catch(err => console.log(err));
}

exports.postCart = (req, res, next) => {
    const retrievedProdId = req.body.productId123;

    Product.getById(retrievedProdId)
        .then(product => {
            return req.user.addToCart(product);
        })
        .then(result => {
            res.redirect('/cart');
        });
}

exports.deleteProductFromCart = (req, res, next) => {
    const productId = req.body.productId123;

    req.user.deleteProductFromCart(productId)
        .then(result => {
            res.redirect('/cart');
        });
}

exports.clearCart = (req, res, next) => {
    req.user.clearCart()
        .then(result => {
            res.redirect('/cart');
        })
}

// exports.getCheckOut = (req, res, next) => {
//     res.render('shop123/checkout', {
//         path123: '/checkout',
//         pageTitle123: 'Checkout'
//     });
// }

// exports.getOrders = (req, res, next) => {
//     req.user.getOrders({ include: Product })
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
//     let retrievedProducts;

//     req.user.getCart()
//         .then(cart => {
//             return cart.getProducts();
//         })
//         .then(products => {
//             retrievedProducts = products;
//             return req.user.createOrder();
//         })
//         .then(order => {
//             return order.addProducts(
//                 retrievedProducts.map(i => {
//                     i.orderItem = { quantity: i.cartItem.quantity }
//                     return i;
//                 }));
//         })
//         .then(() => {
//             return this.clearCart(req, res, next);
//         })
//         .then(() => {
//             res.redirect('/');
//         })
//         .catch(err => {
//             console.log(err);
//         });
// }

exports.getProductDetail = (req, res, next) => {
    const productId = req.params.productId123;
    Product.getById(productId)
        .then(product => {
            res.render('shop123/product-detail', {
                path123: `/products`,
                pageTitle123: `Product Detail: ${product.title}`,
                product: product
            });
        })
        .catch(err => console.log(err));
}