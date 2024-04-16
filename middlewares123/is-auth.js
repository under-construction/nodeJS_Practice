module.exports = async (req, res, next) => {
    if (!req.session.isLoggedIn) {
        return res.redirect('/auth789/login789');
    }
    next();
}