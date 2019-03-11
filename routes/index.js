const express = require('express');
const Class = require('../models/class');

const router = express.Router();

// Renders homepage
router.get('/', async (req, res, next) => {
  try {
    const classes = await Class.find();
    console.log('All the available classes ', classes);
    res.render('index',
      {
        classes,
        view: 'all',
      });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
