var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var FruitSchema = new Schema({
    name: String
});

//id,protein(vitamins),calories,type(sweet,sour),fat

module.exports = mongoose.model('Fruit', FruitSchema);
