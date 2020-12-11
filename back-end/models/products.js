var mongoose = require('mongoose');

var productsSchema = require('./schemas/products');

var Products = mongoose.model('Products', productsSchema);

module.exports = Products;