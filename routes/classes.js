const express = require('express');
const Class = require('../models/class');

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
  try {
    await Class.findByIdAndUpdate(classID, { $push: { alumns: [res.locals.currentUser._id] } }, { new: true });
    res.redirect(`/classes/${classID}`);
  } catch (error) {
    next(error);
  }
});

// Leave one class
router.get('/:classID/leave', async (req, res, next) => {
  const { classID } = req.params;
  try {
    await Class.findByIdAndUpdate(classID, { $pullAll: { alumns: [res.locals.currentUser._id] } }, { new: true });
    res.redirect(`/classes/${classID}`);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
