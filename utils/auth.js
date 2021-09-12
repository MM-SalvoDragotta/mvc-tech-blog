const withAuth = (req, res, next) => {
  // If the user is not logged in, redirect the request to the login route
  if (!req.session.logged_in) {
    res.redirect('/login');
  } else {
    // res.locals.user = req.user.toJSON() || null;
    // console.log(res.locals.user)
    next();
  }
};

module.exports = withAuth;
