module.exports = {
  authRoute: (req, res, next) => {
    if (req.session.currentUser) {
      next();
    } else {
      res.redirect('/login');
    }
  },
  anonRoute: (req, res, next) => {
    if (req.session.currentUser) {
      res.redirect('/');
    } else {
      next();
    }
  },
  roleCheck: (role) => {
    return (req, res, next) => {
      if (req.session.currentUser.role === role) {
        next();
      } else {
        res.redirect('/login');
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
