const express = require('express');

const router = express.Router();

const authController = require('../controllers/auth');

router.get('/login789', authController.getLogin);

module.exports = router;