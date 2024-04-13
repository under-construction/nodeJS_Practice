exports.getLogin = (req, res, next) => {
    console.log(req.session.isLoggedIn);

    res.render('auth456/login456', {
        path123: '/auth444/login444',
        pageTitle123: 'Login',
        isAuthenticated: false
    });
}

exports.postLogin = (req, res, next) => {
    const sessionData = req.session;
    // console.log(sessionData);
    sessionData.isLoggedIn = true;
    res.redirect('/');
}