const express = require('express');

const router = express.Router();

const authController = require('../controllers/auth');

router.get('/login789', authController.getLogin);

router.post('/postLogin456', authController.postLogin);

router.post('/postLogout456', authController.postLogout);

module.exports = router;