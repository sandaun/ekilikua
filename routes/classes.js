const express = require('express');
const Class = require('../models/class');
const User = require('../models/user');
const assets = require('../assets');

const router = express.Router();

// List of all available classes
router.get('/', async (req, res, next) => {
  try {
    const classes = await Class.find();
    console.log('All the available classes ', classes);
    res.render('classes/classlist', { classes, view: 'all' });
  } catch (error) {
    next(error);
  }
});

// View for any word search
router.get('/query', async (req, res, next) => {
  const { query } = req.query;
  let found = true;
  try {
    let classes = await Class.find({ $or: [ { 'title' : { $regex: new RegExp(query, "i") }}, 
                                              { 'categoryID' : { $regex: new RegExp(query, "i") }}, 
                                              { 'level' : { $regex: new RegExp(query, "i") }}, 
                                              { 'description' : { $regex: new RegExp(query, "i") }}]});
    console.log('Query classes ', classes);

    // If 0 coincidences, suggested class
    if (classes.length === 0) {
      found = false;
      const random = Math.floor(Math.random() * await Class.count());
      classes = await Class.findOne().skip(random);
    }

    res.render('classes/searchlist', { classes, found, view: 'all' });
  } catch (error) {
    next(error);
  }
});

// View one class detail
router.get('/:classID', async (req, res, next) => {
  const { classID } = req.params;
  try {
    const selectedClass = await Class.findById(classID).populate('professor alumns');
    res.render('classes/classcard', { lesson: selectedClass, view: 'all' });
  } catch (error) {
    next(error);
  }
});

// Join one class
router.get('/:classID/join', assets.authRoute, async (req, res, next) => {
  const { classID } = req.params;
  const userID = res.locals.currentUser._id;
  try {
    const user = await User.findById(userID);
    let lesson = await Class.findById(classID).populate('professor alumns');
    let booked = false;
    let kuas;
    lesson.alumns.forEach((alumn) => {
      if (alumn.name === user.name) {
        booked = true;
      }
    });
    if (!booked) {
      // Add user to alumns array
      lesson = await Class.findByIdAndUpdate(classID, { $push: { alumns: [userID] } }, { new: true });

      // Professor receive kuas
      if (lesson.alumns.length === 1) {
        const professor = await User.findById(lesson.professor);
        kuas = professor.kuas + lesson.price;
        await User.findByIdAndUpdate(lesson.professor, { kuas }, { new: true });
        const paid = user.kuas - lesson.price;
        await User.findByIdAndUpdate(userID, { kuas: paid }, { new: true });
      } else {
        // Shared price calc
        kuas = lesson.price / lesson.alumns.length;

        // Alumn pay kuas
        let paid = user.kuas - kuas;
        await User.findByIdAndUpdate(userID, { kuas: paid }, { new: true });

        // Classmates receive share price
        const classmates = lesson.alumns.filter(al => al._id.toString() !== userID);
        const sharedPrice = kuas / classmates.length;
        classmates.forEach(async (id) => {
          const compi = await User.findById(id._id.toString());
          paid = compi.kuas + sharedPrice;
          await User.findByIdAndUpdate(compi.id, { kuas: paid }, { new: true });
        });
      }
    }
    res.redirect(`/classes/${classID}`);
  } catch (error) {
    next(error);
  }
});

// Leave one class
router.get('/:classID/leave', assets.authRoute, async (req, res, next) => {
  const { classID } = req.params;
  const userID = res.locals.currentUser._id;
  try {
    const user = await User.findById(userID);
    let lesson = await Class.findById(classID).populate('professor alumns');
    let kuas;
 
    // Remove user from alumns array
    lesson = await Class.findByIdAndUpdate(classID, { $pullAll: { alumns: [userID] } }, { new: true }).populate('professor alumns');

    // Professor return kuas
    if (lesson.alumns.length === 0) {
      const professor = await User.findById(lesson.professor);
      kuas = professor.kuas - lesson.price;
      await User.findByIdAndUpdate(lesson.professor, { kuas }, { new: true });
      kuas = user.kuas + lesson.price;
      await User.findByIdAndUpdate(userID, { kuas }, { new: true });
    } else {
      // Shared price calc
      kuas = lesson.price / (lesson.alumns.length + 1);

      // Alumn receive kuas
      const returned = user.kuas + kuas;
      await User.findByIdAndUpdate(userID, { kuas: returned }, { new: true });

      // Classmates return share price
      const returnedPrice = kuas / lesson.alumns.length;
      lesson.alumns.forEach(async (alumn) => {
        const paid = alumn.kuas - returnedPrice;
        await User.findByIdAndUpdate(alumn.id, { kuas: paid }, { new: true });
      });
    }
    res.redirect(`/classes/${classID}`);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
