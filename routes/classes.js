const express = require('express');
const Class = require('../models/class');

const router = express.Router();

/* GET home page. */
router.get('/', (req, res, next) => {
  Class.find()
    .then((element) => {
      res.render('index', { element });
    })
    .catch((error) => {
      next(error);
    });
});

router.get('/:id', async (req, res, next) => {
  const { id } = req.params;
  try {
    const classes = await Class.findById(id); // Name to be changed but class is reserved
    res.render('index/show', { classes }); // Render to be defined
  } catch (error) {
    next(error);
  }
});

module.exports = router;
