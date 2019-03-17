const mongoose = require('mongoose');

const { Schema } = mongoose;

const point = new Schema({
  type: {
    type: String,
    enum: ['Point'],
    default: 'Point',
    required: true,
  },
  coordinates: {
    type: [Number],
    required: true,
  },
});

const myModel = mongoose.model('Point', point);

module.exports = myModel;
