module.exports = {
  authRoute: (req, res, next) => {
    delete req.session.returnTo;
    if (req.session.currentUser) {
      next();
    } else {
      req.session.returnTo = req.originalUrl;
      res.redirect('/auth');
    }
  },
  anonRoute: (req, res, next) => {
    if (req.session.currentUser) {
      // res.redirect(req.originalUrl);
      res.redirect('/');
    } else {
      next();
    }
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
