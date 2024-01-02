const express = require('express');

const router = express.Router();

router.get('/', (req, res, next) => {
    console.log('In middleware for express.js page (shop.js)');
    res.send('<h1>Hello from Express.js</h1>');
});




module.exports = router;