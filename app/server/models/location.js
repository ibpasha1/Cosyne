const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Coordinates = mongoose.Schema({
  x: Number,
  y: Number
});

let Loc = mongoose.Schema({
  _id: Schema.Types.ObjectId,
  addr_line1: String,
  addr_line2: String,
  city: String,
  state: String,
  country: String,
  zip: String,
  //coordinates: Coordinates
});

module.exports = mongoose.model('Loc', Loc);
