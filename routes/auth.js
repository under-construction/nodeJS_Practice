const express = require('express');
const { check, body } = require('express-validator');
const User = require('../models/user');
const router = express.Router();

const authController = require('../controllers/auth');

router.get('/login789', authController.getLogin);

router.post(
    '/postLogin456',
    [
        body('email')
            .isEmail()
            .normalizeEmail()
            .custom(async value => {
                const userDoc = await User.findOne({ email: value })

                if (!userDoc) {
                    return Promise.reject('no such user');
                }
            }),
        body('password', 'please enter a valid password')
            .isLength({ min: 5 })
            .isAlphanumeric()
            .trim()
    ],
    authController.postLogin
);

router.post('/postLogout456', authController.postLogout);

router.get('/signup789', authController.getSignUp);

router.post(
    '/signup789',
    [
        check('email')
            .isEmail()
            .normalizeEmail()
            .custom(async value => {
                // if (value === 'test@test.com') {
                //     throw new Error('this email address is forbidden');
                // }
                // return true;

                const userDoc = await User.findOne({ email: value });

                if (userDoc) {
                    return await Promise.reject('email already exists123');
                }
            }),
        body('password', 'please enter a password with only numbers and text and at least 5 characters')
            .isLength({ min: 5 })
            .isAlphanumeric()
            .trim(),
        body('confirmPassword')
            .trim()
            .custom((value, { req }) => {
                if (value !== req.body.password) {
                    throw new Error('passwords must match');
                }
                return true;
            })
    ],
    authController.postSignUp
);

router.get('/resetPassword', authController.getResetPassword);

router.post('/resetPassword', authController.postResetPassword);

router.get('/resetPassword/:token', authController.getNewPassword);

router.post('/newPassword', authController.postNewPassword);

module.exports = router;