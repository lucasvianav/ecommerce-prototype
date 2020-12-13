const mongoose = require('mongoose')
const cartItemSchema = require('./cart')

const accountSchema = mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true
    },
    type: { // client x admin
        type: String,
        trim: true,
        required: true
    },
    email: {
        type: String,
        trim: true,
        required: true
    },
    password: { // password hash
        type: String,
        trim: true,
        required: true
    },
    birthday: {
        type: String,
        trim: true,
        required: true
    },
    cpf: {
        type: String,
        trim: true,
        required: true
    },
    phoneNumber: {
        type: String,
        trim: true,
        required: true
    },
    cart: {
        type: [cartItemSchema],
        default: [],
    }
})

module.exports = accountSchema