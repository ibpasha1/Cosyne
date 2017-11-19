const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Campaign = mongoose.Schema({
  _id: Schema.Types.ObjectId,
  business_id: String,
  name: String,
  description: String,
  active: Boolean,
  expiration_date: Date,
  type: String,
  claimers: [String],
  qr_code: String,
  max_claims: Number
});

module.exports = mongoose.model('Campaign', Campaign);
