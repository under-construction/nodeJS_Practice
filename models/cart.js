const fs = require('fs');
const path = require('path');
const rootDir = require('../util/path');

const filePath = path.join(rootDir, 'data123', 'cart123.json');

module.exports = class Cart {
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
}