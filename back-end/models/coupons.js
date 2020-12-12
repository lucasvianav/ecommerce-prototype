var mongoose = require('mongoose');

var couponsSchema = require('./schemas/coupons');

var Coupons = mongoose.model('Coupons', couponsSchema);

module.exports = Coupons;