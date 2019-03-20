const express = require('express');
const Class = require('../models/class');
const Location = require('../models/location');

const router = express.Router();

// Renders homepage
router.get('/', async (req, res, next) => {
  try {
    const classes = await Class.find().populate('professor alumns location');

    // Object with class to draw in map
    const points = {
      type: 'FeatureCollection',
      features: [],
    };

    // Fill feautres array with objects with classes data
    classes.forEach((lesson) => {
      const feature = {
        type: 'Feature',
        geometry: lesson.location,
        properties: {
          title: lesson.title,
          description: lesson.description,
          link: `/classes/${lesson.id}`,
        },
      };
      points.features.push(feature);
    });


    res.render('index', { classes, points, view: 'all' });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
