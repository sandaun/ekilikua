const express = require('express');
const bcrypt = require('bcrypt');
const assets = require('../assets');
const Model = require('../models/example');

const router = express.Router();

/* GET home page. */
router.get('/', (req, res) => {
  res.render('index');
});

router.post('/login', assets.annonRoute, async (req, res, next) => {
  const { password, email } = req.body;

  if (password === '' || email === '') {
    req.flash('error', 'Email or password empty.');
    console.log('Email or password empty.');
    return res.redirect('/login');
  }

  try {
    const userFound = await Model.findOne({ email });
    if (!userFound) {
      console.log("User doesn't exists");
      return res.redirect('/signup');
    }
    if (bcrypt.compareSync(password, userFound.password)) {
      req.session.currentUser = userFound;
      return res.redirect('/success');
    }
    console.log('Email or password incorrect.');
    return res.redirect('/login');
  } catch (error) {
    next(error);
  }
});

router.get('/signup', assets.annonRoute, (req, res) => {
  res.render('auth/signup', { errorMessage: req.flash('error') });
});

router.post('/signup', assets.annonRoute, async (req, res, next) => {
  const { username, password, email } = req.body;

  if (username === '' || password === '' || email === '') {
    req.flash('error', 'No empty filds allowed.');
    console.log('No empty filds allowed.');
    return res.redirect('/signup');
  }

  try {
    const userFound = await Model.findOne({ email });
    if (userFound) {
      req.flash('error', `${email} already exists`);
      console.log(`${email} already exists`);
      return res.redirect('/signup');
    }
    const hashedpassword = bcrypt.hashSync(password, 10);
    await Model.create({ username, password: hashedpassword, email });
    req.flash('success', 'User succesfully created.');
    return res.redirect('/');
  } catch (error) {
    next(error);
  }
});

module.exports = router;
