var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');

var userSchema = mongoose.Schema({
  email: String,
  username: {type: String},
  password: String,
  first_name: String,
  last_name: String,
  user_name: String,
  verified: Boolean,
  addr_line1: String,
  addr_line2: String,
  city: String,
  state: String,
  zip: String,
  account_type: { type: String, default: "influencer"},
  verification_hash: String,
  create_date: { type: Date, default: Date.now}
});

userSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

userSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model('User', userSchema);
