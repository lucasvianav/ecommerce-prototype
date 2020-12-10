const mongoose = require('mongoose')

const specsSchema = mongoose.Schema({
    color: {
        type: String,
        default: '',
        required: true
    },
    template: {
        type: String,
        default: '',
        required: true
    },
    size: {
        type: String,
        default: '',
        required: true
    }
})

const cartItemSchema = mongoose.Schema({
    sku: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        min: 1,
        required: true,
    },
    specs: {
        type: specsSchema,
        required: true
    }
})

module.exports = cartItemSchema