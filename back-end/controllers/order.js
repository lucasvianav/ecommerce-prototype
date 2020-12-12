const orderService = require('../services/order')

const orderController = {
    find: async (req, res) => {
        const orders = await orderService.find()
        return res.json(orders)
    },

    new: async (req, res) => {
        const {products, client, date, time, payment, situation, discount, total} = req.body
        const order = {products, client, date, time, payment, situation, discount, total}
        const newOrder = await orderService.new(order)

        return res.json(newOrder._id)
    },

    edit: async (req, res) => {
        const {_id, situation} = req.body
        const order = await orderService.edit(_id, { situation })

        return res.json(order)
    }
}

module.exports = orderController