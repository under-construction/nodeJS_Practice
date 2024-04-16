const Product = require('../models/product');
const Order = require('../models/order');

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
        });
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

exports.clearCart = async (req, res, next) => {
    try {
        const result = await req.user.clearCart();
        res.redirect('/cart');
    } catch (err) {
        console.error(err);
    }
}

exports.getOrders = async (req, res, next) => {
    try {
        const orders = await Order.find({
            'user.userId': req.user._id
        });

        res.render('shop123/orders', {
            path123: '/orders',
            pageTitle123: 'Orders',
            orders: orders
        });
    } catch (err) {
        console.error(err);
    }
}

exports.postOrder = async (req, res, next) => {
    try {
        const populatedUser = await req.user.populate('cart.items.productId');

        const orderProducts = await populatedUser.cart.items.map(i => {
            return {
                product: { ...i.productId },
                quantity: i.quantity
            }
        });

        const orderUser = {
            email: req.user.email,
            userId: req.user
        }

        const order = new Order({
            products: orderProducts,
            user: orderUser,
            totalPrice: req.user.cart.totalPrice
        })

        await order.save();

        await req.user.clearCart();

        res.redirect('/orders');
    } catch (err) {
        console.error(err);
    }
}

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