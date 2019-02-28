const mongoose = require('mongoose');

const { Schema } = mongoose;
const { ObjectId } = Schema.Types;

const subcategorySchema = new Schema({
  name: {
    type: String,
    enum: ['Piano', 'Violin', 'Esqui', '...'], // Como lo hacemos para no mezclar
  },
  categoryID: {
    type: ObjectId,
    ref: 'Category',
    required: true,
  },
});

const myModel = mongoose.model('Subcategorie', subcategorySchema);

module.exports = myModel;
