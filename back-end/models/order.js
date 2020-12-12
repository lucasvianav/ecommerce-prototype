const mongoose = require('mongoose')
const orderSchema = require('./schemas/order')

const Order = mongoose.model('Order', orderSchema)

module.exports = Order