const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Product = mongoose.Schema({
  _id: Schema.Types.ObjectId,
  name: String,
  sku: String,
  description: String,
  qty: Number
});

module.exports = mongoose.model('Product', Product);
