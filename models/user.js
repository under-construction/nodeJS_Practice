const mongoose = require('mongoose');
const Product = require('./product');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
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
    return this;
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

userSchema.methods.recalculateCartTotalPrice = function (productId) {

}

module.exports = mongoose.model('User', userSchema);