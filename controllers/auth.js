exports.getLogin = (req, res, next) => {
    const cookie = req.get('Cookie');
    let isLoggedIn = false;

    if (cookie) {
        isLoggedIn = cookie.split('=')[1];
    }

    res.render('auth456/login456', {
        path123: '/auth444/login444',
        pageTitle123: 'Login',
        isAuthenticated: isLoggedIn
    });
}

exports.postLogin = (req, res, next) => {
    res.setHeader('Set-Cookie', 'loggedIn=true');
    res.redirect('/');
}