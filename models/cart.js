const fs = require('fs');
const path = require('path');
const rootDir = require('../util/path');

const filePath = path.join(rootDir, 'data123', 'cart123.json');

module.exports = class Cart {

    static getCart(cb) {
        fs.readFile(filePath, (err, fileContent) => {
            if (err) cb([]);
            cb(JSON.parse(fileContent));
        });
    }

    static addProduct(id, productPrice) {
        fs.readFile(filePath, (err, fileContent) => {
            let cart;

            if (!err) {
                if (fileContent.length === 0) {
                    cart = { products: [], totalPrice: 0 };
                }
                else {
                    cart = JSON.parse(fileContent);
                }
            }

            const existingProductIndex = cart.products.findIndex(p => p.id === id);
            const existingProduct = cart.products[existingProductIndex];
            let updatedProduct;

            if (existingProduct) {
                updatedProduct = { ...existingProduct };
                updatedProduct.quantity++;
                cart.products = [...cart.products];
                cart.products[existingProductIndex] = updatedProduct;
            }
            else {
                updatedProduct = { id: id, quantity: 1 };
                cart.products = [...cart.products, updatedProduct];
            }
            cart.totalPrice += +productPrice;

            fs.writeFile(filePath, JSON.stringify(cart), err => {
                console.log(err);
            });
        });
    }

    static deleteProduct(id, productPrice, cb) {
        this.getCart(cart => {

            const productToDelete = cart.products.find(p => p.id === id);

            if (productToDelete) {
                cart.totalPrice -= productPrice;
                productToDelete.quantity--;

                if (productToDelete.quantity == 0) {
                    const updatedProducts = cart.products.filter(i => i.id !== id);
                    cart.products = updatedProducts;
                }

                fs.writeFile(filePath, JSON.stringify(cart), err => {
                    console.log(err);
                });
            }

            cb();
        });
    }

    static clearProduct(id, price, cb) {
        this.getCart(cart => {
            const productToDelete = cart.products.find(i => i.id === id);

            if (productToDelete) {
                cart.totalPrice -= price * productToDelete.quantity;
                const updatedProducts = cart.products.filter(p => p.id !== id);
                cart.products = updatedProducts;

                fs.writeFile(filePath, JSON.stringify(cart), err => { console.log(err); });
            }

            cb();
        });
    }

    static clearCart(cb) {
        this.getCart(cart => {
            cart.products = [];
            cart.totalPrice = 0;

            fs.writeFile(filePath, JSON.stringify(cart), err => console.log(err));
            cb();
        });
    }
}