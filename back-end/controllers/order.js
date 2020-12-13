const orderService = require('../services/order')

const orderController = {
    find: async (req, res) => {
        const orders = await orderService.find()
        return res.json(orders)
    },

    findById: async (req, res) => {
        const {_id} = req.params
        const order = await orderService.findById(_id)
        return res.json(order)
    },

    findByStatus: async (req, res) => {
        const {status} = req.params
        const order = await orderService.findByStatus(status)
        return res.json(order)
    },

    findByClientId: async (req, res) => {
        const {_id} = req.params
        const orders = await orderService.findByClientId(_id)
        return res.json(orders)
    },

    findByClientEmail: async (req, res) => {
        const {email} = req.params
        const orders = await orderService.findByClientEmail(email)
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
        const order = await orderService.edit(_id, situation)

        return res.json(order)
    }
}

module.exports = orderController