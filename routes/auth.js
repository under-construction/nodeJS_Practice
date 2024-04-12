const express = require('express');

const router = express.Router();

router.get('/login789', (req, res, next) => {
    console.log('auth router was called');
    res.redirect('/');
})

module.exports = router;