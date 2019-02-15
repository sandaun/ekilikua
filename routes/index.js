var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('layouts/main.ejs', { title: 'JdeJ', copyright: '© 2019 JdeJ'});
});

module.exports = router;
