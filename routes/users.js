const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const moment = require('moment');
const assets = require('../assets');
const User = require('../models/user');
const Class = require('../models/class');
const Category = require('../models/category');
const Level = require('../models/level');
const Location = require('../models/location');

const router = express.Router();
router.use(assets.authRoute);

// User homepage
router.get('/', (req, res) => {
  res.render('user/index', { title: res.locals.currentUser.name });
});

// GETS the user profile landing page, where he can directly edit over his information (no image yet)
router.get('/profile', async (req, res, next) => {
  const userID = res.locals.currentUser._id;
  try {
    const user = await User.findById(userID);
    res.render('user/profile', { user, title: 'Profile' });
  } catch (error) {
    next(error);
  }
});

// POST submits profile edit form
router.post('/profile', async (req, res, next) => {
  //el email no debería poder cambiarlo
  //const { name, description, password } = req.body;
  const { name, description } = req.body;
  const userID = res.locals.currentUser._id;

  if (name === '' || description === '') {
    req.flash('error', 'No empty fields allowed.');
    res.redirect('/profile');
  }

  try {
    //const hashedpassword = bcrypt.hashSync(password, 10);
    //await User.findByIdAndUpdate(userID, { name, description, password: hashedpassword });
    const userModifiedData = await User.findByIdAndUpdate(userID, { name, description }, { new:true });
    req.session.currentUser = userModifiedData;
    req.flash('success', `User ${name} succesfully updated.`);
    res.redirect('/users');
  } catch (error) {
    next(error);
  }
});

// GETS the user card
router.get('/:userID/profile', async (req, res, next) => {
  const { userID } = req.params;
  try {
    const user = await User.findById(userID);
    res.render('user/usercard', { user, view: 'user', title: `Profile: ${user.name}`});
  } catch (error) {
    next(error);
  }
});

// List user classes own
router.get('/classes/own', async (req, res, next) => {
  const userID = res.locals.currentUser._id;
  try {
    const { classes } = await User.findById(userID).populate('classes');
    res.render('classes/classlist', { classes, view: 'own' });
  } catch (error) {
    next(error);
  }
});

// View one own user class
router.get('/classes/own/:classID', async (req, res, next) => {
  const { classID } = req.params;
  try {
    const lesson = await Class.findById(classID).populate('professor alumns');
    res.render('classes/classcard', { lesson, view: 'own' });
  } catch (error) {
    next(error);
  }
});

// Update one user class
router.get('/classes/own/:classID/update', async (req, res, next) => {
  const { classID } = req.params;
  try {
    const lesson = await Class.findById(classID);
    const categories = await Category.find();
    const levels = await Level.find();
    res.render('user/classes/update', { lesson, categories, levels, moment, view: 'own' });
  } catch (error) {
    next(error);
  }
});

// Submits one user class update
router.post('/classes/own/:classID/update', async (req, res, next) => {
  const { classID } = req.params;
  const { title, category, subcategory, level, description, days, schedule, price, duration, repeat } = req.body;
  try {
    const updatedClass = await Class.findByIdAndUpdate(classID, { title, categoryID: category, subcategoryID: subcategory, level, description, days, schedule, price, duration, repeat }, { new:true });
    req.flash('success', `Class ${title} succesfully updated.`);
    res.redirect('/users/classes/own');
  } catch (error) {
    next(error);
  }
});

// Delete user own class
router.post('/classes/own/:classID/delete', async (req, res, next) => {
  const { classID } = req.params;
  const userID = res.locals.currentUser._id;

  try {
    const { name } = await Class.findByIdAndDelete(classID);
    await User.findByIdAndUpdate(userID, { $pullAll: { classes: [classID] } }, { new: true });
    req.flash('success', `Class ${name} succesfully deleted.`);
    res.redirect('/users/classes/own');
  } catch (error) {
    next(error);
  }
});

// Form to create new own class
router.get('/classes/new', async (req, res, next) => {

  try {
    const categories = await Category.find();
    const levels = await Level.find();
    const classes = await Class.find().populate('professor alumns location');
    // Object with class to draw in map
    const points = {
      type: 'FeatureCollection',
      features: [],
    };
    res.render('user/classes/newclass', { classes, points, categories, levels, view: 'newClass' });
  } catch (error) {
    next(error);
  }
});

// Submits form to create new own class for the user
router.post('/classes/new', async (req, res, next) => {
  const professor = res.locals.currentUser._id;
  const { title, category, subcategory, level, description, days, schedule, price, duration, repeat, lng, lat } = req.body;
  try {
    const location = await Location.create({ coordinates: [lng, lat] });
    const createdClass = await Class.create({ title, professor, categoryID: category, subcategoryID: subcategory, level, description, days, schedule, price, duration, repeat, location });
    const userModifiedData = await User.findByIdAndUpdate(professor, { $push: { classes: createdClass._id  } }, { new:true });
    req.session.currentUser = userModifiedData;
    req.flash('success', `Class ${title} succesfully created.`);
    res.redirect('/users/classes/own');
  } catch (error) {
    next(error);
  }
});

// List of all user attending classes
router.get('/classes/attending', async (req, res, next) => {
  const userID = res.locals.currentUser._id;  

  try {
    const classes = await Class.find({ alumns: { $in: [userID] } });
    res.render('classes/classlist', { classes, view: 'attending' });
  } catch (error) {
    next(error);
  }
});

// View one user attending classes
router.get('/classes/attending/:classID', async (req, res, next) => {
  const { classID } = req.params;

  try {
    const lesson = await Class.findById(classID).populate('professor alumns');
    res.render('classes/classcard', { lesson, view: 'attending' });
  } catch (error) {
    next(error);
  }
});

// Submits leave button
router.post('/classes/attending/:classID', async (req, res, next) => {
  const { classID } = req.params;
  const userID = res.locals.currentUser._id;

  try {
    const deletedClass = await Class.findByIdAndUpdate(classID, { $pullAll: { alumns: [userID] } }, { new: true });
    req.flash('success', `Succesfully leave of ${deletedClass.title}`);
    res.redirect('user/classes/attending');
  } catch (error) {
    next(error);
  }
});

// List of all user teaching classes
router.get('/classes/teaching', async (req, res, next) => {

  const userID = res.locals.currentUser._id;
  try {
    const { classes } = await User.findById(userID).populate('classes');
    const teachingClasses = [];
    classes.forEach((lesson) => {
      if (lesson.alumns.length > 0) {
        teachingClasses.push(lesson);
      }
    });
    res.render('classes/classlist', { classes: teachingClasses, view: 'teaching' });
  } catch (error) {
    next(error);
  }
});

// View one user teaching classes
router.get('/classes/teaching/:classID', async (req, res, next) => {
  const { classID } = req.params;

  try {
    const lesson = await Class.findById(classID).populate('professor alumns');
    res.render('classes/classcard', { lesson, view: 'teaching' });
  } catch (error) {
    next(error);
  }
});

// Submits cancell button
router.post('/classes/teaching/:classID', async (req, res, next) => {
  const { classID } = req.params;
  const userID = res.locals.currentUser._id;

  try {
    const deletedClass = await Class.findByIdAndDelete(classID);
    await User.findByIdAndUpdate(userID, { $pullAll: { classes: [classID] } }, { new: true });
    req.flash('success', `Class ${deletedClass.tittle} succesfully cancelled.`);
    res.redirect('user/classes/teaching');
  } catch (error) {
    next(error);
  }
});

module.exports = router;
