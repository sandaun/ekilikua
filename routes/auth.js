const express = require('express');
const bcrypt = require('bcrypt');
const assets = require('../assets');
const User = require('../models/user');

const router = express.Router();

// Renders log in form
router.get('/', assets.anonRoute, (req, res) => {
  res.render('auth/login', { view: 'login' });
});

// Submits login form
router.post('/', assets.anonRoute, async (req, res, next) => {
  const { password, email } = req.body;

  if (password === '' || email === '') {
    req.flash('error', 'Email or password empty.');
    res.redirect('/auth');
  }

  try {
    const userFound = await User.findOne({ email });
    if (!userFound) {
      req.flash('error', "User doesn't exist.");
      res.redirect('/auth/signup');
    }
    if (bcrypt.compareSync(password, userFound.password)) {
      req.session.currentUser = userFound;
      req.flash('error', 'User succesfully logged.');
      // setTimeout(() => delete req.session.returnTo, 1000);
      return res.redirect(req.session.returnTo || '/');
      // delete req.session.returnTo;
    }
    req.flash('error', 'Email or password incorrect.');
    res.redirect('/auth');
  } catch (error) {
    next(error);
  }
});

// Renders sign up form
router.get('/signup', assets.anonRoute, (req, res) => {
  res.render('auth/signup', { view: 'signup' });
});

// Submits sign up form
router.post('/signup', assets.anonRoute, async (req, res, next) => {
  const { name, password, email, description } = req.body;

  if (name === '' || password === '' || email === '' || description === '') {
    req.flash('error', 'No empty fields allowed.');
    return res.redirect('/signup');
  }

  try {
    const userFound = await User.findOne({ email });
    if (userFound) {
      req.flash('error', `Sorry, ${email} already exists`);
      return res.redirect('/signup');
    }
    const hashedpassword = bcrypt.hashSync(password, 10);
    await User.create({ name, email, description, password: hashedpassword });
    req.flash('success', `User ${name} succesfully created.`);
    return res.redirect('/auth');
  } catch (error) {
    next(error);
  }
});

module.exports = router;
