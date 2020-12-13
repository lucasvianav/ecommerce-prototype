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

const clientSchema = mongoose.Schema({
    _id: String,
    name: {
        type: String,
        trim: true,
        required: true
    },
    email: {
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
    }
})

const orderItemSchema = mongoose.Schema({
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
    },
    price: {
        type: Number,
        required: true
    }
})

/*
{
    id: '', //id do pedido
    product:[
        {
            sku: '',    //sku do produto
            quantity: '',    //quantidade (número)
            specs: {color: '', template:'', size:''},
            price: '' // preço do produto no momento da compra
        }
    ],
    client: '',   //email do cliente
    date: '', // data do pedido
    time: '', // horário do pedido
    payment: '', // método de pagamento escolhido
    situation: '',   //AA - aguardando aprovação, PA - pagamento aprovado, PPR - pronto para retirada, FF - finalizado
    discount: '',      // Desconto provindo de cupon, em R$ (número)
    total: '' // Valor total da compra
},
*/

const orderSchema = mongoose.Schema({
    products: {
        type: [orderItemSchema],
        required: true,
    },
    client: {
        type: clientSchema,
        required: true
    },
    date: {
        type: String,
        trim: true,
        required: true
    },
    time: {
        type: String,
        trim: true,
        required: true
    },
    payment: {
        type: String,
        trim: true,
        required: true
    },
    situation: {
        type: String,
        trim: true,
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