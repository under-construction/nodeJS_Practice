const Cart = require('../models/cart');
const Product = require('../models/product');
const productModel = require('../models/product');

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
    Cart.getCart(cart => {
        productModel.fetchAll(products => {
            const cartItems = [];
            for (let product of products) {
                const cartItem = cart.products.find(p => p.id === product.id);
                if (cartItem) {
                    cartItems.push({
                        id: product.id,
                        title: product.title,
                        price: product.price,
                        quantity: cartItem.quantity
                    });
                }
            }
            res.render('shop123/cart', {
                path123: '/cart',
                pageTitle123: 'Your Cart',
                cart: cart,
                cartItems: cartItems
            });
        });
    });
}

exports.postCart = (req, res, next) => {
    const retrievedProdId = req.body.productId123;
    Product.getById(retrievedProdId)
        .then(([product]) => {
            Cart.addProduct(retrievedProdId, product[0].price);
            res.redirect('/cart');
        });
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