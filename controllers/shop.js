const Product = require('../models/product');
const Order = require('../models/order');
const fs = require('fs');
const path = require('path');
const PDFDocument = require('pdfkit');

const ITEMS_PER_PAGE = 2;

exports.getProducts = async (req, res, next) => {
    try {
        const findResult = await Product.find();
        res.render('shop123/shop-product-list', {
            prods: findResult,
            pageTitle123: 'Shop123',
            path123: '/products'
        });
    } catch (err) {
        const error = new Error(err);
        error.httpStatusCode = 500;
        return next(err);
    }
}

exports.getIndex = async (req, res, next) => {
    try {
        const page = req.query.page;
        const totalItems = await Product.find().count();
        const findResult = await Product.find()
            .skip((page - 1) * ITEMS_PER_PAGE)
            .limit(ITEMS_PER_PAGE);
        // .select('title price -_id')
        // .populate('userId', 'name')
        res.render('shop123/index', {
            prods: findResult,
            pageTitle123: 'Shop123',
            path123: '/shop',
            totalProducts: totalItems,
            hasNextPage: ITEMS_PER_PAGE * page < totalItems,
            hasPreviousPage: page > 1,
            nextPage: page + 1,
            previousPage: page - 1,
            lastPage: Math.ceil(totalItems / ITEMS_PER_PAGE)
        });
    } catch (err) {
        const error = new Error(err);
        error.httpStatusCode = 500;
        return next(err);
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
        const error = new Error(err);
        error.httpStatusCode = 500;
        return next(err);
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
        const error = new Error(err);
        error.httpStatusCode = 500;
        return next(err);
    }
}

exports.deleteProductFromCart = async (req, res, next) => {
    const productId = req.body.productId123;

    try {
        const item = await req.user.deleteProductFromCart(productId);
        res.redirect('/cart');
    } catch (err) {
        const error = new Error(err);
        error.httpStatusCode = 500;
        return next(err);
    }
}

exports.clearCart = async (req, res, next) => {
    try {
        const result = await req.user.clearCart();
        res.redirect('/cart');
    } catch (err) {
        const error = new Error(err);
        error.httpStatusCode = 500;
        return next(err);
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
        const error = new Error(err);
        error.httpStatusCode = 500;
        return next(err);
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
        const error = new Error(err);
        error.httpStatusCode = 500;
        return next(err);
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
        const error = new Error(err);
        error.httpStatusCode = 500;
        return next(err);
    }
}

exports.getInvoice = async (req, res, next) => {
    const orderId = req.params.orderId;
    try {
        const order = await Order.findById(orderId);

        if (order.user.userId.toString() !== req.user._id.toString()) {
            return next(new Error('no authenticated user'));
        }

        const invoiceName = 'invoice-' + orderId + '.pdf';
        const invoicePath = path.join('data', 'invoices', invoiceName);

        const pdfDoc = new PDFDocument();
        pdfDoc.pipe(fs.createWriteStream(invoicePath));
        pdfDoc.pipe(res);

        pdfDoc
            .fontSize(26)
            .text('Invoice', {
                align: 'center',
                underline: true
            });

        const array = order.products.map(i => {
            return `${i.product.title}: ${i.quantity} x ${i.product.price} = ${i.quantity * i.product.price}`;
        });

        pdfDoc
            .fontSize(14)
            .list(
                array,
                {
                    width: 200,
                    align: 'left',
                    listType: 'bullet',
                    bulletRadius: 1,
                    lineGap: 10
                });

        pdfDoc.text('**********');

        pdfDoc
            .fontSize(24)
            .text(
                `Total Price: ${order.totalPrice}`,
                {
                    align: 'right',
                    lineGap: 50
                }
            );

        pdfDoc
            .fontSize(18)
            .text(
                'End of the document',
                {
                    align: 'center'
                }
            );

        pdfDoc.end();

        const file = fs.createReadStream(invoicePath);

        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', 'inline; filename="' + invoiceName + '"');

        file.pipe(res);

        // fs.readFile(invoicePath, (err, data) => {
        //     if (err) {
        //         return next(err);
        //     }
        //     res.setHeader('Content-Type', 'application/pdf');
        //     res.setHeader('Content-Disposition', 'inline; filename="' + invoiceName + '"');
        //     res.send(data);
        // });
    } catch (err) {
        return next(err);
    }
}