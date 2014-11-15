// app/models/nerd.js
// grab the mongoose module
var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var storeSchema = new Schema({
    name:  String,
    manager: String,
    _highSaleDay:   { type: Number, ref: 'Sale' },
    _highSaleWeek:  { type: Number, ref: 'Sale' },
    _highSaleMonth: { type: Number, ref: 'Sale' }
});

var Store = mongoose.model('Store', storeSchema);

module.exports = Store;

