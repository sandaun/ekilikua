const express = require('express');
const assets = require('../assets');
const User = require('../models/user');

const router = express.Router();
router.use(assets.authRoute);

/* GET users listing. */
router.get('/', (req, res) => {
  res.render('index');
});

// GETS the user profile landing page, where he can directly edit over his information (no image yet)
router.get('/profile', (req, res) => {
  res.render('user/profile', { title: 'Profile' });
});

// GETS the 3 options of user class views (should pass object class but it does not exist yet)
router.get('/classes', (req, res) => {
  res.render('user/classes', { title: 'The classes I teach' });
});

// GETS the model classes that the user has created (should pass object class but it does not exist yet)
router.get('/classes/models', (req, res) => {
  res.render('user/classes/models', { title: 'Classes to Attend' });
});

// GETS the classes that the user has booked to attend (should pass object class but it does not exist yet)
router.get('/classes/attending', (req, res) => {
  res.render('user/classes/attending', { title: 'Classes to Attend' });
});

// GETS the classes that have been booked for the teacher (should pass object class but it does not exist yet)
router.get('/classes/teaching', (req, res) => {
  res.render('user/classes/teaching', { title: 'Classes to teach' });
});

// GETS to the form to create a new class
router.get('/classes/newclass', (req, res) => {
  res.render('user/classes/newclass', { title: 'Create a new class' });
});

module.exports = router;
