const express = require('express')
const router = express.Router()

const productsRouter = require('./products')
const accountRouter = require('./account')
const authRouter = require('./auth')
const cartRouter = require('./cart')

router.use('/products', productsRouter)
router.use('/accounts', accountRouter)
router.use('/auth', authRouter)
router.use('/cart', cartRouter)

module.exports = router