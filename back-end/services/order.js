const Orders = require('../models/order')
const Products = require('../models/products')
const cartService = require('./cart')

const orderService = {
    find: async () => await Orders.find({}),

    findById: async _id => await Orders.findById(_id),

    findByStatus: async situation => await Orders.find({ situation }),

    findByClientId: async _id => await Orders.find({ 'client._id': _id }),

    findByClientEmail: async email => await Orders.find({ 'client.email': email }),

    new: async order => {
        const newOrder = await Orders.create(order)

        if(newOrder){
            for(let product of order.products){
                let {sku, quantity} = product
                let _id = (sku.split('-'))[1]

                let stock = (await Products.findById(_id, 'stock')).stock
                stock.set(sku, parseInt(stock.get(sku)) - parseInt(quantity))

                await Products.findByIdAndUpdate(_id, {stock})
            }

            const {_id} = order.client
            await cartService.empty(_id)
        }

        return newOrder
    },

    edit: async (_id, situation) => await Orders.findByIdAndUpdate(_id, {situation}, {new: true})
}

module.exports = orderService