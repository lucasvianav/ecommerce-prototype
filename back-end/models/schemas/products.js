var mongoose = require('mongoose');

var descriptionSchema = mongoose.Schema({
    ul: {
        type: [String]
    },
    ol: {
        type: [String]
    },
    txt: {
        type: String
    }
});

var priceSchema = mongoose.Schema({
    full: Number,
    sale: Number
});

var imgSchema = mongoose.Schema({
    file: Buffer,
    alt: String
});

var productSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    id: {
        type: String,
        required: true
    },
    visibility: {
        type: Boolean,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    description: {
        type: descriptionSchema,
        required: true
    },
    templates: {
        type: [String],
        default: []
    },
    sizes: {
        type: [String],
        default: []

    },
    colors: {
        type: [String],
        default: []
    },
    img: {
        type: [imgSchema],
        default: []
    },
    stock: {
        type: Map,
        default: {}
    }
});

module.exports = productSchema;