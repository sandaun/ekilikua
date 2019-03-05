const express = require('express');
const Class = require('../models/class');

const router = express.Router();

// List of all available classes
router.get('/', async (req, res) => {
  try {
    const availableClasses = await Class.find({});
    console.log('All the available classes ', availableClasses);
    res.render('classes/classlist', { availableClasses, view: 'All' });
  } catch (error) {
    next(error);
  }
});

router.get('/:id', async (req, res, next) => {
  const { id } = req.params;
  console.log(id);
  try {
    const selectedClass = await Class.findById(id);
    res.render('classes/classcard', { lesson: selectedClass, view: 'All' });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
