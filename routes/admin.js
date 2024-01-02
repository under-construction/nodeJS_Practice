const express = require('express');

const router = express.Router();

router.get('/add-product', (req, res, next) => {
    console.log('In middleware for add product (admin.js)');
    res.send(
        '<form action="/admin/add-product1234" method="POST"><input type="text" name="title"><button type="submit">Add product</button></form>');
});

router.post('/add-product1234', (req, res, next) => {
    console.log(req.body);
    res.redirect('/shop123');
});



module.exports = router;