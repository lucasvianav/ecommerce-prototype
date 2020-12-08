const express = require('express')
const router = express.Router()

const productsRouter = require('./products')
const accountRouter = require('./account')
const authRouter = require('./auth')

router.use('/products', productsRouter)
router.use('/accounts', accountRouter)
router.use('/auth', authRouter)

module.exports = router