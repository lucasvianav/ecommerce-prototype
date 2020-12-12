const mongoose = require('mongoose')
const cartItemSchema = require('./cart')
const accountSchema = require('./account')

const clientSchema = mongoose.Schema({
    _id: String,
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    cpf: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        required: true
    }
})

const orderSchema = mongoose.Schema({
    products: {
        type: [cartItemSchema],
        required: true,
    },
    client: {
        type: clientSchema,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    time: {
        type: String,
        required: true
    },
    payment: {
        type: String,
        required: true
    },
    situation: {
        type: String,
        required: true
    },
    discount: {
        type: Number,
        required: true
    },
    total: {
        type: Number,
        required: true
    }
})

module.exports = orderSchema