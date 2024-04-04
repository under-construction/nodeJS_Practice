const mongoose = require('mongoose');

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

module.exports = mongoose.model('User', userSchema);