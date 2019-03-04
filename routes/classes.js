const express = require('express');
const Class = require('../models/class');

const router = express.Router();

/* GET home page. */
// router.get('/', (req, res, next) => {
//   Class.find()
//     .then((element) => {
//       res.render('index', { element });
//     })
//     .catch((error) => {
//       next(error);
//     });
// });

// List of all available classes
router.get('/', async (req, res) => {
  try {
    const availableClasses = await Class.find({});
    console.log('All the available classes ', availableClasses);
    res.render('classes/index', { availableClasses, title: 'Choose your class' });
  } catch (error) {
    next(error);
  }
});

router.get('/:id', async (req, res, next) => {
  const { id } = req.params;
  console.log(id);
  try {
    const selectedClass = await Class.findById(id);
    res.render('classes/classcard', { selectedClass, title: selectedClass.title });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
