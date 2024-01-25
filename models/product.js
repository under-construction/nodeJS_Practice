const fs = require('fs');
const path = require('path');

module.exports = class Product {
    constructor(t) {
        this.title = t;
    }

    save() {
        const filePath = path.join(require.main.filename, 'data123', 'products123.json');
        fs.readFile(filePath, (err, fileContent) => {
            let products = [];
            if (!err) {
                products = JSON.parse(fileContent);
            }
            products.push(this);
            fs.writeFile(filePath, JSON.stringify(products), err => console.log(err));
        });
    }

    static fetchAll() {
        const filePath = path.join(require.main.filename, 'data123', 'products123.json');
        fs.readFile(filePath, (err, fileContent) => {
            if (err) {
                return [];
            }
            return JSON.parse(fileContent);
        });
    }
}