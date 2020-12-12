const mongoose = require('mongoose')

const specsSchema = mongoose.Schema({
    color: {
        type: String,
        default: '',
    },
    template: {
        type: String,
        default: '',
    },
    size: {
        type: String,
        default: '',
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