var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt   = require('bcrypt-nodejs');

let Instagram = new Schema({
    username: String,
    num_followers: Number,
    tier: Number
});

let Address = new Schema({
  addr_line1: String,
  addr_line2: String,
  position: String,
  city: String,
  state: String,
  zip: String,
});

let User = mongoose.Schema({
  email: String,
  username: {type: String},
  password: String,
  active: Boolean,
  first_name: String,
  last_name: String,
  verified: Boolean,
  address: Address,
  instagram: Instagram,
  business: String,
  account_type: { type: String, enum: ['business', 'influencer'], default: "influencer"},
  verification_hash: String,
  create_date: { type: Date, default: Date.now}
});

User.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null);
};

User.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model('User', User);
