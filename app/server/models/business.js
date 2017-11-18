const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Loc = require('./location.js');
const Campaign = require('./campaign.js');

let Business = mongoose.Schema({
  _id: Schema.Types.ObjectId,
  name: String,
  type: String,
  active: Boolean,
  description: String,
  email: String,
  phone: String,
  admins: [String],
  reps: [String],
  //location: Loc
});

module.exports = mongoose.model('Business', Business);
