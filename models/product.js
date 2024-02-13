const fs = require('fs');
const path = require('path');
const rootDir = require('../util/path');

const filePath = path.join(rootDir, 'data123', 'products123.json');

const getProductsFromFile = cb => {
    fs.readFile(filePath, (err, fileContent) => {
        if (err) {
            cb([]);
        }
        cb(JSON.parse(fileContent));
    });
}

module.exports = class Product {
    constructor(id, title, imageUrl, description, price) {
        this.id = id;
        this.title = title;
        this.imageUrl = imageUrl;
        this.description = description;
        this.price = price;
    }

    save() {
        getProductsFromFile(products => {
            if (this.id) {
                const existingProductIndex = products.findIndex(p => p.id === this.id);
                const updatedProducts = [...products];
                updatedProducts[existingProductIndex] = this;
                fs.writeFile(filePath, JSON.stringify(updatedProducts), err => {
                    console.log(err);
                });
            }
            else {
                this.id = Math.random().toString();
                products.push(this);
                fs.writeFile(filePath, JSON.stringify(products), err => console.log(err));
            }
        });
    }

    static fetchAll(cb) {
        getProductsFromFile(cb);
    }

    static getById(id, cb) {
        getProductsFromFile(products => {
            const product = products.find(p => p.id === id);
            cb(product);
        });
    }

    static remove(id) {
        getProductsFromFile(products => {
            const existingProductIndex = products.findIndex(p => p.id === id);

            if (existingProductIndex) {
                products = products.filter(i => i.id !== id);
                fs.writeFile(filePath, JSON.stringify(products), err => console.log(err));
            }
        });
    }
}