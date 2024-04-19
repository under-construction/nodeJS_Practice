const express = require('express');
const { check, body } = require('express-validator');
const User = require('../models/user');
const router = express.Router();

const authController = require('../controllers/auth');

router.get('/login789', authController.getLogin);

router.post('/postLogin456', authController.postLogin);

router.post('/postLogout456', authController.postLogout);

router.get('/signup789', authController.getSignUp);

router.post('/signup789',
    [
        check('email')
            .isEmail()
            .withMessage('please enter a valid email')
            .custom((value, { req }) => {
                // if (value === 'test@test.com') {
                //     throw new Error('this email address is forbidden');
                // }
                // return true;
                return User.findOne({ email: value })
                    .then(userDoc => {
                        return Promise.reject('email already exists');
                    });
            }),
        body('password', 'please enter a password with only numbers and text and at least 5 characters')
            .isLength({ min: 5 })
            .isAlphanumeric(),
        body('confirmPassword')
            .custom((value, { req }) => {
                if (value !== req.body.password) {
                    throw new Error('passwords must match');
                }
                return true;
            })
    ],
    authController.postSignUp);

router.get('/resetPassword', authController.getResetPassword);

router.post('/resetPassword', authController.postResetPassword);

router.get('/resetPassword/:token', authController.getNewPassword);

router.post('/newPassword', authController.postNewPassword);

module.exports = router;