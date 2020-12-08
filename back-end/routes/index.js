const express = require('express')
const router = express.Router()

const productsRouter = require('./routes/products')
const accountRouter = require('./routes/account')
const authRouter = require('./routes/auth')

router.use('/products', productsRouter)
router.use('/accounts', accountRouter)
router.use('/auth', authRouter)

module.exports = router