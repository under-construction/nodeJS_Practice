const { getDB } = require('../util/database');
const { ObjectId } = require('mongodb');

class Product {
    constructor(title, price, description, imageUrl, id) {
        this.title = title;
        this.price = price;
        this.description = description;
        this.imageUrl = imageUrl;
        this._id = id ? ObjectId.createFromHexString(id) : 0;
    }

    save() {
        const db = getDB();
        let dbOp;
        if (this._id) {
            dbOp = db.collection('products').
                updateOne(
                    {
                        _id: this._id
                    },
                    {
                        $set: this
                    });
        }
        else {
            dbOp = db.collection('products').insertOne(this);
        }
        return dbOp
            .then(result => {
                console.log(result);
            })
            .catch(err => {
                console.log(err);
            });
    }

    static fetchAll() {
        const db = getDB();
        return db
            .collection('products')
            .find()
            .toArray()
            .then(products => {
                // console.log(products);
                return products;
            })
            .catch(err => console.log(err));
    }

    static getById(id) {
        const db = getDB();
        return db
            .collection('products')
            .findOne({ _id: ObjectId.createFromHexString(id) })
            .then(res => {
                // console.log(res);
                return res;
            })
            .catch(err => {
                console.log(err);
            });
    }

    static delete(id) {
        const db = getDB();
        return db
            .collection('products')
            .deleteOne({ _id: ObjectId.createFromHexString(id) })
            .then(res => {
                // console.log(res);
                return res;
            })
            .catch(err => {
                console.log(err);
            });
    }
}

module.exports = Product;