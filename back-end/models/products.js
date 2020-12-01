var mongoose = require('mongoose');

var productsSchema = require('./schemas/products');

var products = mongoose.model('Products', productsSchema);

module.exports = products;