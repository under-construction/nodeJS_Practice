const { getDB } = require('../util/database');
const { ObjectId } = require('mongodb');

class Product {
    constructor(title, price, description, imageUrl) {
        this.title = title;
        this.price = price;
        this.description = description;
        this.imageUrl = imageUrl;
    }

    save() {
        const db = getDB();
        return db.collection('products')
            .insertOne(this)
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
}

module.exports = Product;