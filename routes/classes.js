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

router.get('/:classID', async (req, res, next) => {
  const { classID } = req.params;
  try {
    const selectedClass = await Class.findById(classID).populate('profesor alumns');
    res.render('classes/classcard', { lesson: selectedClass, view: 'all' });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
