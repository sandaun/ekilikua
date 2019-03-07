const express = require('express');
const Class = require('../models/class');
const User = require('../models/user');

const router = express.Router();

// List of all available classes
router.get('/', async (req, res, next) => {
  try {
    const classes = await Class.find();
    console.log('All the available classes ', classes);
    res.render('classes/classlist', { classes, view: 'all' });
  } catch (error) {
    next(error);
  }
});

// View one class detail
router.get('/:classID', async (req, res, next) => {
  const { classID } = req.params;
  try {
    const selectedClass = await Class.findById(classID).populate('professor alumns');
    res.render('classes/classcard', { lesson: selectedClass, view: 'all' });
  } catch (error) {
    next(error);
  }
});

// Join one class
router.get('/:classID/join', async (req, res, next) => {
  const { classID } = req.params;
  const userID = res.locals.currentUser._id;
  try {
    const user = await User.findById(userID);
    const lesson = await Class.findById(classID);
    let kuas = user.kuas - lesson.price;
    console.log(await User.findByIdAndUpdate(userID, { kuas }, { new: true }));
    const professor = await User.findById(lesson.professor);
    kuas = professor.kuas + lesson.price;
    console.log(await User.findByIdAndUpdate(lesson.professor, { kuas }, { new: true }));
    console.log(await Class.findByIdAndUpdate(classID, { $push: { alumns: [userID] } }, { new: true }));
    res.redirect(`/classes/${classID}`);
  } catch (error) {
    next(error);
  }
});

// Leave one class
router.get('/:classID/leave', async (req, res, next) => {
  const { classID } = req.params;
  const userID = res.locals.currentUser._id;
  try {
    const user = await User.findById(userID);
    const lesson = await Class.findById(classID);
    let kuas = user.kuas + lesson.price;
    console.log(await User.findByIdAndUpdate(userID, { kuas }, { new: true }));
    const professor = await User.findById(lesson.professor);
    kuas = professor.kuas - lesson.price;
    console.log(await User.findByIdAndUpdate(lesson.professor, { kuas }, { new: true }));
    console.log(await Class.findByIdAndUpdate(classID, { $pullAll: { alumns: [userID] } }, { new: true }));
    res.redirect(`/classes/${classID}`);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
