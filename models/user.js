const { getDB } = require('../util/database');
const { ObjectId } = require('mongodb');

class User {
    constructor(name, email, cart, id) {
        this.name = name;
        this.email = email;
        this.cart = cart;
        this._id = id;
    }

    save() {
        let db = getDB();
        return db
            .collection('users')
            .insertOne(this)
            .then(result => {
                return result;
            })
            .catch(err => {
                console.log(err);
            });
    }

    addToCart(product) {
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
        };

        const db = getDB();
        return db
            .collection('users')
            .updateOne(
                { _id: this._id },
                { $set: { cart: updatedCart } }
            );
    }

    getCart() {
        const db = getDB();
        const productIDs = this.cart.items.map(i => i.productId);
        const totalPrice = this.cart.totalPrice;
        return db
            .collection('products')
            .find({ _id: { $in: productIDs } })
            .toArray()
            .then(products => {
                return {
                    products: products.map(p => {
                        return {
                            ...p,
                            quantity: this.cart.items.find(i => {
                                return i.productId.toString() === p._id.toString();
                            }).quantity
                        };
                    }),
                    totalPrice: totalPrice
                };
            });
    }

    static getById(id) {
        let db = getDB();
        return db
            .collection('users')
            .findOne({
                _id: ObjectId.createFromHexString(id)
            })
            .then(result => {
                return result;
            })
            .catch(err => {
                console.log(err);
            });
    }
}

module.exports = User;