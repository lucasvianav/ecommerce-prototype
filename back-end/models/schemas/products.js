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
    full: {
        type: Number,
        required: true
    },
    sale: {
        type: Number,
        required: true
    }
});

var imgSchema = mongoose.Schema({
    path: String,
    alt: String
});

var productSchema = mongoose.Schema({
    _id: String,
    name: {
        type: String,
        required: true
    },
    type: {
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
    price: {
        type: priceSchema,
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