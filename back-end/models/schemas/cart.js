const mongoose = require('mongoose')

const specsSchema = mongoose.Schema({
    color: {
        type: String,
        trim: true,
        default: '',
    },
    template: {
        type: String,
        trim: true,
        default: '',
    },
    size: {
        type: String,
        trim: true,
        default: '',
    }
})

const cartItemSchema = mongoose.Schema({
    sku: {
        type: String,
        trim: true,
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