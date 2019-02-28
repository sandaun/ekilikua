const mongoose = require('mongoose');

const { Schema } = mongoose;
// const { ObjectId } = Schema.Types;

const categorySchema = new Schema({
  name: {
    type: String,
    enum: ['Academic', 'Sports', 'Music', 'Leisure'],
  },
});

const myModel = mongoose.model('Categorie', categorySchema);

module.exports = myModel;
