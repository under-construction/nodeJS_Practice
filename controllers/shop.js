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

// exports.deleteProductFromCart = (req, res, next) => {
//     const productId = req.body.productId123;

//     let userCart;
//     let retrievedProduct;

//     req.user.getCart()
//         .then(cart => {
//             userCart = cart;
//             return cart.getProducts({ where: { id: productId } });
//         })
//         .then(products => {
//             retrievedProduct = products[0];
//             if (retrievedProduct.cartItem.quantity == 1) {
//                 return retrievedProduct.cartItem.destroy();
//             }
//             else {
//                 return retrievedProduct.cartItem.update({
//                     quantity: retrievedProduct.cartItem.quantity - 1
//                 });
//             }
//         })
//         .then(() => {
//             return userCart.update({
//                 totalPrice: userCart.totalPrice - retrievedProduct.price
//             });
//         })
//         .then(() => {
//             res.redirect('/cart');
//         })
//         .catch(err => {
//             console.log(err);
//         });
// }

// exports.clearCart = (req, res, next) => {
//     let fetchedCart;

//     req.user.getCart()
//         .then(cart => {
//             fetchedCart = cart;
//             return cart.setProducts(null);
//         })
//         .then(data => {
//             fetchedCart.update({
//                 totalPrice: 0
//             });
//         })
//         .then(() => {
//             res.redirect('/cart');
//         })
//         .catch(err => console.log(err));
// }