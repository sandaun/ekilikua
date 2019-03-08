const mongoose = require('mongoose');

const { Schema } = mongoose;

const categorySchema = new Schema({
  name: String,
});

const myModel = mongoose.model('Level', categorySchema);

module.exports = myModel;
