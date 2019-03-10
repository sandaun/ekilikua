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
  level: String,
  days: {
    type: String,
    default: 'Not',
    enum: ['Not', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
  },
  schedule: Date,
  repeat: {
    type: String,
    default: 'Not',
    enum: ['Not', 'Daily', 'Weekly', 'Monthly', 'Yearly'],
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
