const Cart = require('../models/cart');
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
    let innerProduct;
    req.user.getCart()
        .then(cart => {
            fetchedCart = cart;
            return cart.getProducts({ where: { id: retrievedProdId } });
        })
        .then(products => {
            if (products.length > 0) {
                product = products[0];
            }
            let newQuantity = 1;
            if (product) {
                console.log(products);
                return product.cartItem.update({
                    quantity: product.cartItem.quantity + 1
                })
                    .then(data => {
                        return fetchedCart.update({
                            totalPrice: fetchedCart.totalPrice + product.price
                        })
                    })
                    .catch(err => console.log(err));
            }
            return Product.findByPk(retrievedProdId)
                .then(product => {
                    innerProduct = product;
                    return fetchedCart.addProduct(product, {
                        through: { quantity: newQuantity }
                    });
                })
                .then(data => {
                    return fetchedCart.update({
                        totalPrice: fetchedCart.totalPrice + innerProduct.price
                    })
                        // TO BE DELETED
                        .then(data => {
                            console.log(data);
                        })
                        .catch(err => {
                            console.log(err);
                        });
                })
                .catch(err => console.log(err));
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
    res.render('shop123/orders', {
        path123: '/orders',
        pageTitle123: 'Orders'
    })
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
    Product.getById(productId)
        .then(([product]) => {
            Cart.deleteProduct(productId, product[0].price, () => res.redirect('/cart'));
        });
}

exports.clearCart = (req, res, next) => {
    Cart.clearCart(() => res.redirect('/cart'));
}