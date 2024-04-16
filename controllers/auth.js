const User = require('../models/user');
const bcrypt = require('bcryptjs');

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

    const user = await User.findOne({
        email: email
    });

    if (!user) {
        req.flash('error123', 'Invalid email.');
        return res.redirect('/auth789/login789');
    }

    try {
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

    if (user) {
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
        errorMessage: message
    });
}

exports.postSignUp = async (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    const confirmPassword = req.body.confirmPassword;

    try {
        const existingUser = await User.findOne({
            email: email
        });

        if (existingUser) {
            req.flash('error789', 'E-Mail already exists.');
            return res.redirect('/auth789/signup789');
        }

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