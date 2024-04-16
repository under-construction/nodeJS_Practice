const mongoose = require('mongoose');
const Product = require('./product');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    cart: {
        items: [
            {
                productId: {
                    type: mongoose.Schema.Types.ObjectId,
                    required: true,
                    ref: 'Product'
                },
                quantity: {
                    type: Number,
                    required: true
                }
            }
        ],
        totalPrice: {
            type: Number,
            required: true
        }
    }
});

userSchema.methods.addToCart = async function (product) {
    if (!this.cart) {
        this.cart = {
            items: [],
            totalPrice: 0
        };
    }

    const cartProductIndex = this.cart.items.findIndex(cp => {
        return cp.productId.toString() === product._id.toString();
    });

    let newQuantity = 1;
    let updatedCartItems = [...this.cart.items];

    if (cartProductIndex >= 0) {
        newQuantity = this.cart.items[cartProductIndex].quantity + 1;
        updatedCartItems[cartProductIndex].quantity = newQuantity;
    } else {
        updatedCartItems.push({
            productId: product._id,
            quantity: newQuantity
        });
    }

    this.cart.totalPrice += (+product.price);

    const updatedCart = {
        items: updatedCartItems,
        totalPrice: this.cart.totalPrice
    }

    this.cart = updatedCart;

    return await this.save();
}

userSchema.methods.getCart = async function () {

    const cartItemIds = this.cart.items.map(i => {
        return i.productId;
    });

    const productPrices = await Product
        .find({
            _id: {
                $in: cartItemIds
            }
        })
        .select('title price');

    const cartItemsWithPrices = this.cart.items.map(i => {
        return {
            productId: i.productId,
            title: productPrices.find(j => j._id.toString() === i.productId.toString()).title,
            quantity: i.quantity,
            price: productPrices.find(j => j._id.toString() === i.productId.toString()).price
        }
    });

    return {
        items: cartItemsWithPrices,
        totalPrice: this.cart.totalPrice
    };
}

userSchema.methods.deleteProductFromCart = async function (productId) {
    const removedCartItemIndex = this.cart.items.findIndex(i => {
        return i.productId.toString() === productId.toString();
    });

    let newQuantity;
    let newCartTotalPrice;
    let updatedCartItems = [...this.cart.items];

    const removedProduct = await Product
        .findById(productId)
        .select('price -_id');

    newQuantity = updatedCartItems[removedCartItemIndex].quantity - 1;
    newCartTotalPrice = this.cart.totalPrice - removedProduct.price;
    updatedCartItems[removedCartItemIndex].quantity = newQuantity;

    if (newQuantity === 0) {
        updatedCartItems = updatedCartItems.filter(i => {
            return i.productId.toString() !== productId.toString();
        });
    }

    const updatedCart = {
        items: updatedCartItems,
        totalPrice: newCartTotalPrice
    };

    this.cart = updatedCart;

    return await this.save();
}

userSchema.methods.clearCart = async function () {
    this.cart = {
        items: [],
        totalPrice: 0
    }

    return await this.save();
}

userSchema.methods.removeDeletedProductFromCart = async function (product) {
    const cartItem = this.cart.items.find(i => {
        return i.productId.toString() === product._id.toString();
    });

    const updatedCartItems = this.cart.items.filter(i => {
        return i.productId.toString() !== product._id.toString();
    });

    const updatedCartTotalPrice = this.cart.totalPrice - product.price * cartItem.quantity;

    this.cart = {
        items: updatedCartItems,
        totalPrice: updatedCartTotalPrice
    }

    await this.save();
}

userSchema.methods.isInCart = function (productId) {
    const cartItem = this.cart.items.find(i => i.productId.toString() === productId.toString());
    return cartItem;
}

module.exports = mongoose.model('User', userSchema);