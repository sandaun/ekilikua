const express = require('express');
const Class = require('../models/class');
const Location = require('../models/location');

const router = express.Router();

// Renders homepage
router.get('/', async (req, res, next) => {
  try {
    const classes = await Class.find().populate('professor alumns location');
    let points = {
      type: 'FeatureCollection',
      features: [{
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [2.188854217529297, 41.43085452425],
        },
        properties: {
          title: 'Mapbox',
          description: 'Java',
        },
      },
      {
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [2.1865206956863403, 41.40263407490894],
        },
        properties: {
          title: 'Mapbox',
          description: 'Marketing',
        },
      }],
    };

    res.render('index', { classes, points, view: 'all' });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
