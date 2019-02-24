const express = require('express');
const assets = require('../assets');
const Model = require('../models/example');

const router = express.Router();
router.use(assets.authRoute);

/* GET users listing. */
router.get('/', (req, res) => {
  res.render('index');
});

module.exports = router;
