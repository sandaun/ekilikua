const express = require('express');

const router = express.Router();

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index', { title: 'JdeJ', copyright: '© 2019 JdeJ' });
});

module.exports = router;
