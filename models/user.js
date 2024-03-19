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
            })
        }
        const updatedCart = { items: updatedCartItems };

        const db = getDB();
        return db
            .collection('users')
            .updateOne(
                { _id: this._id },
                { $set: { cart: updatedCart } }
            );
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