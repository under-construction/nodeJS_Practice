const Cart = require('../models/cart');
const CartItem = require('../models/cart-item');
const Product = require('../models/product');

exports.getProducts = (req, res, next) => {
    Product.findAll()
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
    Product.findAll()
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
        .then(cart => {
            cartTotalPrice = cart.totalPrice;
            return cart.getProducts();
        })
        .then(products => {
            res.render('shop123/cart', {
                path123: '/cart',
                pageTitle123: 'Your Cart',
                cartItems: products,
                totalPrice: cartTotalPrice
            });
        })
        .catch(err => console.log(err));
}

exports.postCart = (req, res, next) => {
    const retrievedProdId = req.body.productId123;
    let fetchedCart;
    let product;
    let innerProductPrice;
    let newQuantity;

    req.user.getCart()
        .then(cart => {
            fetchedCart = cart;
            return cart.getProducts({ where: { id: retrievedProdId } });
        })
        .then(products => {
            if (products.length > 0) {
                product = products[0];
            }

            if (product) {
                newQuantity = product.cartItem.quantity + 1;
            }
            else {
                newQuantity = 1;
            }

            return Product.findByPk(retrievedProdId);
        })
        .then(product => {
            innerProductPrice = product.price;

            return fetchedCart.addProduct(product, { through: { quantity: newQuantity } });
        })
        .then(() => {
            return fetchedCart.update({
                totalPrice: fetchedCart.totalPrice + innerProductPrice
            });
        })
        .then(() => {
            res.redirect('/cart');
        })
        .catch(err => console.log(err));
}

exports.getCheckOut = (req, res, next) => {
    res.render('shop123/checkout', {
        path123: '/checkout',
        pageTitle123: 'Checkout'
    });
}

exports.getOrders = (req, res, next) => {
    req.user.getOrders({ include: Product })
        .then(orders => {
            res.render('shop123/orders', {
                path123: '/orders',
                pageTitle123: 'Orders',
                orders: orders
            });
        })
        .catch(err => {
            console.log(err);
        })
}

exports.postOrder = (req, res, next) => {
    let retrievedProducts;

    req.user.getCart()
        .then(cart => {
            return cart.getProducts();
        })
        .then(products => {
            retrievedProducts = products;
            return req.user.createOrder();
        })
        .then(order => {
            return order.addProducts(
                retrievedProducts.map(i => {
                    i.orderItem = { quantity: i.cartItem.quantity }
                    return i;
                }));
        })
        .then(() => {
            return this.clearCart(req, res, next);
        })
        .then(() => {
            res.redirect('/');
        })
        .catch(err => {
            console.log(err);
        });
}

exports.getProductDetail = (req, res, next) => {
    const productId = req.params.productId123;
    // Product.findByPk(productId)
    //     .then(product => {
    //         res.render('shop123/product-detail', {
    //             path123: `/products`,
    //             pageTitle123: `Product Detail: ${product.title}`,
    //             product: product
    //         });
    //     })
    //     .catch(err => console.log(err));

    // ANOTHER APPROACH
    Product.findAll({ where: { id: productId } })
        .then(
            products => {
                res.render('shop123/product-detail', {
                    path123: `/products`,
                    pageTitle123: `Product Detail: ${products[0].title}`,
                    product: products[0]
                });
            })
        .catch(err => console.log(err));
}

exports.deleteProductFromCart = (req, res, next) => {
    const productId = req.body.productId123;

    let userCart;
    let retrievedProduct;

    req.user.getCart()
        .then(cart => {
            userCart = cart;
            return cart.getProducts({ where: { id: productId } });
        })
        .then(products => {
            retrievedProduct = products[0];
            if (retrievedProduct.cartItem.quantity == 1) {
                return retrievedProduct.cartItem.destroy();
            }
            else {
                return retrievedProduct.cartItem.update({
                    quantity: retrievedProduct.cartItem.quantity - 1
                });
            }
        })
        .then(() => {
            return userCart.update({
                totalPrice: userCart.totalPrice - retrievedProduct.price
            });
        })
        .then(() => {
            res.redirect('/cart');
        })
        .catch(err => {
            console.log(err);
        });
}

exports.clearCart = (req, res, next) => {
    let fetchedCart;

    req.user.getCart()
        .then(cart => {
            fetchedCart = cart;
            return cart.setProducts(null);
        })
        .then(data => {
            fetchedCart.update({
                totalPrice: 0
            });
        })
        .then(() => {
            res.redirect('/cart');
        })
        .catch(err => console.log(err));
}