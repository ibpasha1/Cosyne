var mongoose = require('mongoose');
var Schema = mongoose.Schema;

let Business = mongoose.Schema({
  name: String,
  type: String
});

module.exports = mongoose.model('Business', userSchema);
