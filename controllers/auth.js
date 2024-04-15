const User = require('../models/user');

exports.getLogin = (req, res, next) => {
    res.render('auth456/login456', {
        path123: '/auth444/login444',
        pageTitle123: 'Login',
        isAuthenticated: false
    });
}

exports.postLogin = async (req, res, next) => {
    const user = await User.findById('6606cc7783bd47644d4022ba');

    if (user) {
        req.session.user = user;
        req.session.isLoggedIn = true;
        req.session.save(err => {
            console.error(err);
            res.redirect('/');
        });
    }
}

exports.getSignUp = async (req, res, next) => {
    res.render('auth456/signup456', {
        path123: '/auth444/signup444',
        pageTitle123: 'Sign Up',
        isAuthenticated: false
    });
}

exports.postSignUp = async (req, res, next) => {

}

exports.postLogout = async (req, res, next) => {
    req.session.destroy(err => {
        console.error(err);
        res.redirect('/');
    });
}