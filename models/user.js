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
        // const cartProduct = this.cart.findIndex(cp => cp._id === product._id);
        const updatedCart = { items: [{ ...product, quantity: 1 }] };
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