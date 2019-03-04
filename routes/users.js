const express = require('express');
const bcrypt = require('bcrypt');
const assets = require('../assets');
const User = require('../models/user');
const Class = require('../models/class');

const router = express.Router();
router.use(assets.authRoute);

// User homepage
router.get('/', (req, res) => {
  res.render('user/index', { title: res.locals.currentUser.name });
});

// GETS the user profile landing page, where he can directly edit over his information (no image yet)
router.get('/profile', async (req, res) => {
  const userID = res.locals.currentUser._id;
  try {
    const userFound = await User.find({ userID });
    res.render('user/profile', { userFound, title: 'Profile' });
  } catch (error) {
    next(error);
  }
});

// POST submits profile edit form
router.post('/profile', async (req, res) => {
  //el email no debería poder cambiarlo
  //const { name, description, password } = req.body;
  const { name, description } = req.body;
  const userID = res.locals.currentUser._id;

  if (name === '' || description === '') {
    req.flash('error', 'No empty fields allowed.');
    console.log('No empty filds allowed.');
    return res.redirect('/profile');
  }

  try {
    //const hashedpassword = bcrypt.hashSync(password, 10);
    //await User.findByIdAndUpdate(userID, { name, description, password: hashedpassword });
    const userModifiedData = await User.findByIdAndUpdate(userID, { name, description }, { new:true });
    req.session.currentUser = userModifiedData;
    req.flash('success', 'User succesfully updated.');
    console.log('User succesfully updated.');
    return res.redirect('/users');
  } catch (error) {
    next(error);
  }
});

// Renders User classes (own, attending, learning) main view
router.get('/classes', (req, res) => {
  res.render('user/classes', { title: 'User classes' });
});

// List user classes own
router.get('/classes/own', async (req, res, next) => {
  const userID = res.locals.currentUser._id;
  try {
    const { classes } = await User.findById(userID).populate('classes');
    console.log('User own classes: ', classes);
    res.render('user/classes/own', { classes, title: 'Own classes' });
  } catch (error) {
    next(error);
  }
});

// View one user class
router.get('/classes/own/:classID', async (req, res, next) => {
  const { classID } = req.params;
  try {
    const userOwnClass = await Class.findById(classID);
    console.log('Own class: ', userOwnClass);
    res.render('user/classes/classcard', { userOwnClass, title: 'Own class' });
  } catch (error) {
    next(error);
  }
});

// Update one user class
router.get('/classes/own/:classID/update', async (req, res, next) => {
  const { classID } = req.params;
  try {
    const userOwnClass = await Class.findById(classID);
    console.log('Own class: ', userOwnClass);
    res.render('user/classes/update', { userOwnClass, title: 'Own class' });
  } catch (error) {
    next(error);
  }
});

// Submits one user class update
router.post('/classes/own/:classID/update', async (req, res, next) => {
  const { classID } = req.params;
  const { title, category, subcategory, level, description, days, schedule, price, duration } = req.body;
  try {
    const updatedClass = await Class.findByIdAndUpdate(classID, { title, categoryID: category, subcategoryID: subcategory, level, description, days, schedule, price, duration }, { new:true });
    console.log('Class succesfully updated: ', updatedClass);
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
    const deletedClass = await Class.findByIdAndDelete(classID);
    await User.findByIdAndUpdate(userID, { $pullAll: { classes: [classID] } }, { new: true });
    console.log('Own class succesfully deleted: ', deletedClass);
    res.redirect('/users/classes/own');
  } catch (error) {
    next(error);
  }
});

// Form to create new own class
router.get('/classes/new', async (req, res) => {
  res.render('user/classes/newclass', { title: 'New Class' });
});

//Submits form to create new own class for the user
router.post('/classes/new', async (req, res) => {
  const userID = res.locals.currentUser._id;
  const { title, category, subcategory, level, description, days, schedule, price, duration } = req.body;
  try {
    const createdClass = await Class.create({ title, userID, categoryID: category, subcategoryID: subcategory, level, description, days, schedule, price, duration });
    const userModifiedData = await User.findByIdAndUpdate(userID, { $push: { classes: createdClass._id  } }, { new:true });
    req.session.currentUser = userModifiedData;
    console.log('Class succesfully created.');
    res.redirect('/users/classes/own');
  } catch (error) {
    next(error);
  }
});

//List of all user learning classes
router.get('/classes/learning', async (req, res) => {
  const userID = res.locals.currentUser._id;  

  try {
    const { classes:userLearningClasses } = await Class.find({ userID });
    console.log('User learning clases: ', userLearningClasses);
    res.render('user/classes/learning', { userLearningClasses, title: 'Classes to Attend' });
  } catch (error) {
    next(error);
  }
});

//View one user learning classes
router.get('/classes/learning/:classID', async (req, res) => {
  const { classID } = req.params;

  try {
    //discriminar en la busqueda en las que el user sea teacher
    const userLearningClass = await Class.find({ classID });
    console.log('learning class: ', userLearningClass);
    res.render('user/classes/learning', { userLearningClass, title: 'Class to Attend' });
  } catch (error) {
    next(error);
  }
});

//Submits join/leave button
router.post('/classes/learning/:classID', async (req, res) => {
  const { classID } = req.params;
  
  try {
    //borro el currentuser_ID de esa clase
    //const { classes:userlearningClasses } = await Class.find({ classID });
    console.log('Succesfully leaved.');
    res.redirect('user/classes/learning');
  } catch (error) {
    next(error);
  }
});

//List of all user teaching classes
router.get('/classes/teaching', async (req, res, next) => {

  const userID = res.locals.currentUser._id;
  try {
    const { userOwnClasses } = await User.findById(userID).populate('classes');
    const classes = [];
    userOwnClasses.forEach((element) => {
      if (element.alumns.length > 0) {
        classes.push(element);
      }
    });
    console.log('User own classes: ', classes);
    res.render('user/classes/teaching', { classes, title: 'Teaching classes' });
  } catch (error) {
    next(error);
  }
});

//View one user teaching classes
router.get('/classes/teaching/:classID', async (req, res) => {
  const { classID } = req.params;
  
  try {
    const userTeachingClass = await Class.find({ classID });
    console.log('User teaching class: ', userTeachingClass);
    res.render('user/classes/teaching', { userTeachingClass, title: 'Class to teach' });
  } catch (error) {
    next(error);
  }
});

//Submits cancell button
router.post('/classes/teaching/:classID', async (req, res, next) => {
  const { classID } = req.params;
  const userID = res.locals.currentUser._id;

  try {
    const deletedClass = await Class.findByIdAndDelete(classID);
    await User.findByIdAndUpdate(userID, { $pullAll: { classes: [classID] } }, { new: true });
    console.log('Teaching class cancelled: ', deletedClass);
    res.redirect('user/classes/teaching');
  } catch (error) {
    next(error);
  }
});

// User logout
router.get('/logout', (req, res) => {
  req.session.destroy((err) => {
    if(err) {
      return next(err);
    }
    return res.redirect('/');
  });
});

module.exports = router;
