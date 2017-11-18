const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Campaign = require('./campaign');
const Loc = require('./location');

let Instagram = new Schema({
  _id: Schema.Types.ObjectId,
  num_followers: Number,
  tier: Number
});

module.exports = mongoose.model('Instagram', Instagram);
