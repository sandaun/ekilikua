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
  description: String,
  // alumns: Array,
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
});

const myModel = mongoose.model('Class', classSchema);

module.exports = myModel;
