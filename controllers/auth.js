const crypto = require('crypto');

const User = require('../models/user');
const bcrypt = require('bcryptjs');
const mailHandler = require('../util/mailHandler');

const { validationResult } = require('express-validator');

exports.getLogin = (req, res, next) => {
    let message = req.flash('error123');

    if (message.length > 0) {
        message = message[0];
    } else {
        message = null;
    }

    res.render('auth456/login456', {
        path123: '/auth444/login444',
        pageTitle123: 'Login',
        errorMessage: message
    });
}

exports.postLogin = async (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;

    const errorResult = validationResult(req);

    if (!errorResult.isEmpty()) {
        return res.status(422)
            .render('auth456/login456', {
                path123: '/auth444/login444',
                pageTitle123: 'Login',
                errorMessage: errorResult.array()[0].msg
            });
    }

    try {
        const user = await User.findOne({ email: email });
        const pwComparison = await bcrypt.compare(password, user.password);

        if (pwComparison) {
            req.session.user = user;
            req.session.isLoggedIn = true;
            return req.session.save(err => {
                console.error(err);
                res.redirect('/');
            });
        }

        req.flash('error123', 'Invalid password.');
        res.redirect('/auth789/login789');
    } catch (err) {
        console.error(err);
        return res.redirect('/auth789/login789');
    }
}

exports.getSignUp = async (req, res, next) => {
    let message = req.flash('error789');

    if (message.length > 0) {
        message = message[0];
    } else {
        message = null;
    }

    res.render('auth456/signup456', {
        path123: '/auth444/signup444',
        pageTitle123: 'Sign Up',
        errorMessage: message,
        oldInput: {
            email: '',
            password: '',
            confirmPassword: ''
        },
        errorArray: []
    });
}

exports.postSignUp = async (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    const confirmPassword = req.body.confirmPassword;
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(422)
            .render('auth456/signup456', {
                path123: '/auth444/signup444',
                pageTitle123: 'Sign Up',
                errorMessage: errors.array()[0].msg,
                oldInput: {
                    email: email,
                    password: password,
                    confirmPassword: req.body.confirmPassword
                },
                errorArray: errors.array()
            });
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 12);

        const newUser = new User({
            email: email,
            password: hashedPassword,
            cart: {
                items: [],
                totalPrice: 0
            }
        });

        await newUser.save();

        await mailHandler.sendMail(
            mailHandler.SIGN_UP_MAIL,
            email,
            'log in succeed'
        );

        res.redirect('/auth789/login789');
    } catch (err) {
        console.error(err);
    }
}

exports.postLogout = async (req, res, next) => {
    await req.session.destroy(err => {
        console.error(err);
        res.redirect('/');
    });
}

exports.getResetPassword = (req, res, next) => {
    let message = req.flash('error');

    if (message.length > 0) {
        message = message[0];
    } else {
        message = null;
    }

    res.render('auth456/resetPassword', {
        path123: '/reset',
        pageTitle123: 'Reset Password',
        errorMessage: message
    });
}

exports.postResetPassword = async (req, res, next) => {
    crypto.randomBytes(32, async (err, buffer) => {
        try {
            if (err) {
                console.log(err);
                return res.redirect('/auth789/resetPassword');
            }

            const token = buffer.toString('hex');
            const user = await User.findOne({
                email: req.body.email
            });

            if (!user) {
                req.flash('error', 'no account with that email found!');
                return res.redirect('/auth789/resetPassword');
            }

            user.resetToken = token;
            user.resetTokenExpiration = Date.now() + 3600000;

            const userSave = await user.save();

            if (userSave) {
                mailHandler.sendMail(
                    mailHandler.PASSWORD_RESET_MAIL,
                    req.body.email,
                    'password reset',
                    token
                );
            }

            res.redirect('/');
        } catch (err) {
            console.error(err);
        }
    });
}

exports.getNewPassword = async (req, res, next) => {
    const token = req.params.token;

    try {
        const user = await User.findOne({
            resetToken: token,
            resetTokenExpiration: {
                $gt: Date.now()
            }
        });

        if (user) {
            let message = req.flash('error');

            if (message.length > 0) {
                message = message[0];
            } else {
                message = null;
            }

            res.render('auth456/newPassword', {
                path123: '/new-password',
                pageTitle123: 'New Password',
                errorMessage: message,
                userId: user._id.toString(),
                passwordToken: token
            });
        }
    } catch (err) {
        console.error(err);
    }
}

exports.postNewPassword = async (req, res, next) => {
    const newPassword = req.body.password;
    const userId = req.body.userId;
    const passwordToken = req.body.passwordToken;
    let resetUser;

    try {
        const user = await User.findOne({
            resetToken: passwordToken,
            resetTokenExpiration: {
                $gt: Date.now()
            },
            _id: userId
        });

        if (user) {
            resetUser = user;
            const newPasswordHashed = await bcrypt.hash(newPassword, 12);
            resetUser.password = newPasswordHashed;
            resetUser.resetToken = undefined;
            resetUser.resetTokenExpiration = undefined;
            await resetUser.save();
            res.redirect('/auth789/login789');
        }
    } catch (err) {
        console.error(err);
    }
}