const mongoose = require('mongoose');

const { Schema } = mongoose;
const { ObjectId } = Schema.Types;

const classSchema = new Schema({
  title: String,
  userID: {
    type: ObjectId,
    ref: 'User',
  },
  categoryID: {
    type: ObjectId,
    ref: 'Category',
    required: true,
  },
  subcategoryID: {
    type: ObjectId,
    ref: 'Category',
    required: true,
  },
  level: {
    type: String,
    enum: ['ABC Principals', 'Amateur iniciation', 'Advanced', 'Madafaking Pro'],
  },
  days: {
    type: String,
    enum: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
  },
  schedule: {
    type: Number,
    min: 0,
    max: 24,
  },
  description: String,
  alumns: Array,
  price: {
    type: Number,
    min: 1,
  },
  duration: {
    type: Number,
    min: 15,
  },
  created: {
    type: Date,
    default: Date.now,
  },
  signon: {
    type: Boolean,
    default: false,
  },
}, {
  timestamps: true,
});

const myModel = mongoose.model('Class', classSchema);

module.exports = myModel;
