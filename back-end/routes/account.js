const express = require('express')
const router = express.Router()

const cors = require('cors')
router.use(cors())

const accountController = require('../controllers/account')

router.get('/', accountController.find)

router.get('/find', accountController.findByEmail)

router.get('/check', accountController.checkExitence)

router.put('/', accountController.update)

router.delete('/', accountController.delete)

module.exports = router