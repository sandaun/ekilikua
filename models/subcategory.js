const mongoose = require('mongoose');

const { Schema } = mongoose;
const { ObjectId } = Schema.Types;

const subcategorySchema = new Schema({
  name: String,
  categoryID: {
    type: ObjectId,
    ref: 'Category',
    required: true,
  },
});

const myModel = mongoose.model('Subcategory', subcategorySchema);

module.exports = myModel;
