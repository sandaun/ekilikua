const mongoose = require('mongoose');

const { Schema } = mongoose;
const { ObjectId } = Schema.Types;

const mySchema = new Schema({
  title: String,
  level: {
    type: String,
    enum: ['asy Peasy', 'Amateur Chef', 'UltraPro Chef'],
  },
  ingredients: Array,
  cuisine: {
    type: String,
    required: true,
  },
  dishType: {
    type: String,
    enum: ['Breakfast', 'Dish', 'Snack', 'Drink', 'Dessert', 'Other']
  },
  image: {
    type: String,
    default: 'https://images.media-allrecipes.com/images/75131.jpg',
  },
  duration: {
    type: Number,
    min: 0,
  },
  creator: String,
  created: {
    type: Date,
    default: Date.now,
  },
});

const myModel = mongoose.model('myModel', mySchema);

module.exports = myModel;
