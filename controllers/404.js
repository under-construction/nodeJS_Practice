exports.notFound404 = (req, res, next) => {
    res.render('404', {
        pageTitle123: 'Page Not Found!',
        path123: 'ssss'
    });
}

exports.internalServer500 = (req, res, next) => {
    res.render('500', {
        pageTitle123: 'Internal server error!',
        path123: 'ssss'
    });
}