const mongoose = require('mongoose');

const { Schema } = mongoose;
const { ObjectId } = Schema.Types;

const location = new Schema({
  city: String,
  coordinates: {
    type: [Number],
    required: true,
  },
});

const myModel = mongoose.model('Location', location);

module.exports = myModel;
