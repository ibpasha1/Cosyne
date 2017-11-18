const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt   = require('bcrypt-nodejs');
const Campaign = require('./campaign');
const Loc = require('./location');
const Instagram = require('./instagram.js');
const Business = require('./business.js');

let User = mongoose.Schema({
  email: Schema.Types.ObjectId,
  username: {type: String},
  password: String,
  active: Boolean,
  first_name: String,
  last_name: String,
  verified: Boolean,
  address: { type: Schema.Types.ObjectId, ref: 'Loc'},
  instagram: [{ type: Schema.Types.ObjectId, ref: 'Instagram'}],
  business: [{ type: Schema.Types.ObjectId, ref: 'Business'}],
  account_type: { type: String, enum: ['business', 'influencer'], default: "influencer"},
  verification_hash: String,
  campaigns: [{type: Schema.ObjectId, ref: "Campaign"}],
  create_date: { type: Date, default: Date.now}
});

User.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null);
};

User.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model('User', User);
