const express = require('express')
const router = express.Router()

const cors = require('cors')
router.use(cors())

const cartController = require('../controllers/cart')

router.get('/:_id', cartController.find)

router.post('/', cartController.substitute)

router.patch('/', cartController.edit)

router.put('/', cartController.update)

router.delete('/', cartController.remove)

module.exports = router