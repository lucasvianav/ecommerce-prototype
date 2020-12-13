const express = require('express')
const router = express.Router()

const cors = require('cors')
router.use(cors())

const orderController = require('../controllers/order')

router.get('/', orderController.find) 

router.get('/:_id', orderController.findById)

router.get('/status/:status', orderController.findByStatus)

router.get('/clientId/:_id', orderController.findByClientId)

router.get('/clientEmail/:email', orderController.findByClientEmail)

router.post('/', orderController.new)

router.patch('/', orderController.edit)

module.exports = router