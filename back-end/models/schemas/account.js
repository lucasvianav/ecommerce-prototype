const mongoose = require('mongoose')

const accountSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    type: { // client x admin
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: { // password hash
        type: String,
        required: true
    },
    birthday: {
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

module.exports = accountSchema