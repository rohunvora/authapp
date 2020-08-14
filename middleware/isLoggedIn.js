module.exports = (req, res, next) => {
  if (!req.user) {
    req.flash('Error', 'You must be signed up to access this page');
    res.redirecct('/auth/login');
  } else {
    next();
  }
}
