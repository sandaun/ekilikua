const mongoose = require('mongoose');

const { Schema } = mongoose;
const { ObjectId } = Schema.Types;

const userSchema = new Schema({
  // username: { type: String, required: true, unique: true },
  // password: { type: String, required: true },
  // username: { type: String },
  // email: { type: String },
  // password: { type: String },

  name: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, unique: true },
  description: String,
  avatar: {
    type: String,
    default: 'http://illustrationfriday.com/wp-content/uploads/2018/09/food-460x650.png',
  },
  classes: [{ type: ObjectId, ref: 'Class' }],
}, {
  timestamps: true,
});

module.exports = mongoose.model('User', userSchema);
