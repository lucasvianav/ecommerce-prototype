const express = require('express')
const router = express.Router()

const cors = require('cors')
router.use(cors())

const orderController = require('../controllers/order')

router.get('/', orderController.find)

router.post('/', orderController.new)

router.patch('/', orderController.edit)

module.exports = router