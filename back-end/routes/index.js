const express = require('express')
const router = express.Router()

const productsRouter = require('./products')
const accountRouter = require('./account')
const authRouter = require('./auth')
const cartRouter = require('./cart')
const orderRouter = require('./order')

router.use('/products', productsRouter)
router.use('/accounts', accountRouter)
router.use('/auth', authRouter)
router.use('/cart', cartRouter)
router.use('/orders', orderRouter)

module.exports = router