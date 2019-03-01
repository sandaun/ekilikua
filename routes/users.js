const express = require('express');
const assets = require('../assets');
const User = require('../models/user');

const router = express.Router();
router.use(assets.authRoute);

//User homepage
router.get('/', (req, res) => {
  res.render('user/index');
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
  const { name, description, password } = req.body;
  const userID = res.locals.currentUser._id;

  if (name === '' || password === '') {
    req.flash('error', 'No empty fields allowed.');
    console.log('No empty filds allowed.');
    return res.redirect('/profile');
  }

  try {
    const hashedpassword = bcrypt.hashSync(password, 10);
    await User.findByIdAndUpdate(userID, { name, description, password: hashedpassword });
    req.flash('success', 'User succesfully updated.');
    console.log('User succesfully updated.');
    return res.redirect('/');
  } catch (error) {
    next(error);
  }
});

// Renders User classes (own, attending, learning) main view
router.get('/classes', (req, res) => {
  res.render('user/classes', { title: 'User classes' });
});

//User classes: own
router.get('/classes/own', async (req, res) => {
  const userID = res.locals.currentUser._id;
  try {
    const { classes } = await User.find({ userID });
    const userOwnClasses = [];
    classes.forEach(class => {
      userOwnClasses.push(await Class.find({ class }));
    });
    console.log('User own classes: ', userOwnClasses);
    res.render('/classes/teaching', { userOwnClasses, title: 'Own classes' });
  } catch (error) {
    next(error);
  }
});

//User classes: own
router.get('/classes/own/:classID', async (req, res) => {
  const { classID } = req.params;
  try {
    const userOwnClass = await Class.find({ classID });
    console.log('Attending class: ', userOwnClass);
    res.render('/classes/own/class', { userOwnClass, title: 'Own class' });
  } catch (error) {
    next(error);
  }
});

//submits User classes: own
router.post('/classes/own/:classID', async (req, res) => {
  const { classID } = req.params;
  try {
    await Class.findByIdAndDelete({ classID });
    console.log('Own class succesfully deleted.');
    res.redirect('/classes/own');
  } catch (error) {
    next(error);
  }
});

//Form to create new own class
router.get('/classes/new', async (req, res) => {
  res.render('/classes/newclass');
});

//Submits form to create new own class for the user
router.post('/classes/new', async (req, res) => {
  const userID = res.locals.currentUser._id;
  const { title, categoryID, subcategoryID, level, description, price, duration } = req.body;
  try {
    await Class.create({ title, userID, categoryID, subcategoryID, level, description, price, duration });
    console.log('Class succesfully created.');
    res.redirect('user/classes');
  } catch (error) {
    next(error);
  }
});

//List of all user attending classes
router.get('/classes/attending', async (req, res) => {
  const userID = res.locals.currentUser._id;
  
  try {
    const { classes:userAttendingClasses } = await Class.find({ userID });
    console.log('User attending clases: ', userAttendingClasses);
    res.render('/classes/attending', { userAttendingClasses, title: 'Classes to Attend' });
  } catch (error) {
    next(error);
  }
});

//View one user attending classes
router.get('/classes/attending/:classID', async (req, res) => {
  const { classID } = req.params;
  
  try {
    //discriminar en la busqueda en las que el user sea teacher
    const userAttendingClass = await Class.find({ classID });
    console.log('Attending class: ', userAttendingClass);
    res.render('/classes/attending', { userAttendingClass, title: 'Class to Attend' });
  } catch (error) {
    next(error);
  }
});

//Submits join/leave button
router.post('/classes/attending/:classID', async (req, res) => {
  const { classID } = req.params;
  
  try {
    //borro el currentuser_ID de esa clase
    //const { classes:userAttendingClasses } = await Class.find({ classID });
    console.log('Succesfully leaved.');
    res.redirect('/classes/attending');
  } catch (error) {
    next(error);
  }
});

//List of all user teaching classes
router.get('/classes/teaching', async (req, res) => {
  const userID = res.locals.currentUser._id;
  
  try {
    const { classes } = await User.find({ userID });
    const userTeachingClasses = [];
    classes.forEach(class => {
      userTeachingClasses.push(await Class.find({ class }));
    });
    console.log('User teaching classes: ', userTeachingClasses);
    res.render('/classes/teaching', { userTeachingClasses, title: 'Classes to teach' });
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
    res.render('/classes/teaching', { userTeachingClass, title: 'Class to teach' });
  } catch (error) {
    next(error);
  }
});

//Submits join/leave button
router.post('/classes/teaching/:classID', async (req, res) => {
  const { classID } = req.params;
  
  try {
    await Class.findByIdAndDelete({ classID });
    console.log('Teaching class deleted.');
    res.redirect('/classes/teaching');
  } catch (error) {
    next(error);
  }
});

// User logout
router.get('/logout', (req, res) => {
  req.session.destroy((err) => {
    res.redirect('/');
  });
});

module.exports = router;
