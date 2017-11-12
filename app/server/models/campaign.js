var mongoose = require('mongoose');
var Schema = mongoose.Schema;

let Campaign = mongoose.Schema({
  name: String,
  type: String
});

module.exports = mongoose.model('Campaign', Campaign);
