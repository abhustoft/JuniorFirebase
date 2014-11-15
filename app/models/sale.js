// app/models/nerd.js
// grab the mongoose module
var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var saleSchema = new Schema({
    _store:   { type: Number, ref: 'Store' },
    date: Date,
    amount: Number
});

var Sale = mongoose.model('Sale', saleSchema);

module.exports = Sale;

