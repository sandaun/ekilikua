const mongoose = require('mongoose');

const { Schema } = mongoose;
const { ObjectId } = Schema.Types;

const userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  description: String,
  avatar: {
    type: String,
    default: 'https://pbs.twimg.com/profile_images/2899683123/8b8ad05c106fb752bff97738b46040db_400x400.png',
  },
  classes: [{ type: ObjectId, ref: 'Class' }],
  kuas: {
    type: Number,
    default: 200,
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('User', userSchema);
