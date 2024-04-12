exports.getLogin = (req, res, next) => {
    res.render('auth456/login456', {
        path123: '/auth444/login444',
        pageTitle123: 'Login'
    });
}

exports.postLogin = (req, res, next) => {
    console.log('login request has been sent');
    res.redirect('/');
}