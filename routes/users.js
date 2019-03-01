const express = require('express');
const assets = require('../assets');
const User = require('../models/user');

const router = express.Router();
router.use(assets.authRoute);

/* GET users listing. */
router.get('/', (req, res) => {
  res.render('index');
});

// Lleva al perfil del usuario (sin imagen aún), que es modificable en ese mismo instante pero tiene los datos ya puestos por si apreta accept no se queden los campos vacios
router.get('/profile', (req, res) => {
  res.render('user/profile', { title: 'Profile' });
});

// Lleva a las clases que imparte el usuario (Las modelo)
router.get('/classes', (req, res) => {
  res.render('user/classes', { title: 'The classes I teach' });
});

// Lleva a las clases que imparte el usuario (Las modelo)
router.get('/classes/attending', (req, res) => {
  res.render('user/classes/attending', { title: 'Classes to Attend' });
});

// Lleva a las clases que imparte el usuario (Las modelo)
router.get('/classes/teaching', (req, res) => {
  res.render('user/classes/teaching', { title: 'Classes to teach' });
});

// Brings you to create a new class
router.get('/classes/newclass', (req, res) => {
  res.render('user/classes/newclass', { title: 'Create a new class' });
});

module.exports = router;
