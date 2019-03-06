const mongoose = require('mongoose');

const { Schema } = mongoose;
const { ObjectId } = Schema.Types;

const classSchema = new Schema({
  title: String,
  professor: {
    type: ObjectId,
    ref: 'User',
  },
  categoryID: String,
  subcategoryID: String,
  // categoryID: {
  //   type: ObjectId,
  //   ref: 'Category',
  //   required: true,
  // },
  // subcategoryID: {
  //   type: ObjectId,
  //   ref: 'Category',
  //   required: true,
  // },
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
  alumns: [{ type: ObjectId, ref: 'User' }],
  price: {
    type: Number,
    min: 1,
  },
  duration: {
    type: Number,
    min: 15,
  },
  signon: {
    type: Boolean,
    default: false,
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('Class', classSchema);
