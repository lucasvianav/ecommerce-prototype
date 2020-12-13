const mongoose = require('mongoose')

const couponSchema = mongoose.Schema({
    str: {
        type: String,
        trim: true,
        required: true
    },
    type: {
        type: String,
        trim: true,
        required: true
    },
    discount: {
        type: Number,
        required: true
    }
})

module.exports = couponSchema