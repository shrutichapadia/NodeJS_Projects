var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var VegSchema = new Schema({
  name: String
});

module.exports = mongoose.model('Veg', VegSchema);
