
var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var storeSchema = new Schema({
    name:  String,
    manager: String,
    highSaleDay:   { type: Number, ref: 'Sale' },
    highSaleWeek:  { type: Number, ref: 'Sale' },
    highSaleMonth: { type: Number, ref: 'Sale' }
});

var Store = mongoose.model('Store', storeSchema);

module.exports = Store;

