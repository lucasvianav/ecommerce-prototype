const mongoose = require('mongoose')

const couponSchema = mongoose.Schema({
    str: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    discount: {
        type: Number,
        required: true
    }
})

module.exports = couponSchema