module.exports = {
  authRoute: (req, res, next) => {
    if (req.session.currentUser) {
      next();
    } else {
      req.session.returnTo = req.originalUrl;
      res.redirect('/auth');
    }
  },
  anonRoute: (req, res, next) => {
    if (req.session.currentUser) {
      res.redirect('/');
    } else {
      req.session.returnTo = req.session.returnTo || req.originalUrl;
      next();
    }
  },
  roleCheck: (role) => {
    return (req, res, next) => {
      if (req.session.currentUser.role === role) {
        next();
      } else {
        res.redirect('/auth');
      }
    };
  },
  messages: (req, res, next) => {
    res.locals.errorMessages = req.flash('error');
    res.locals.infoMessages = req.flash('info');
    res.locals.dangerMessages = req.flash('danger');
    res.locals.successMessages = req.flash('success');
    res.locals.warningMessages = req.flash('warning');
    next();
  },
};
