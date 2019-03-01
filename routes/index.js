const express = require('express');

const router = express.Router();

//Renders homepage
router.get('/', (req, res) => {
  res.render('index', { title: 'Ekilikua', copyright: '© 2019 Ekilikua' });
});

module.exports = router;
