const express = require('express')
const router = express.Router()

const cors = require('cors')
router.use(cors())

const accountController = require('../controllers/account')

router.get('/', accountController.find)

router.get('/email/:email', accountController.findByEmail)

router.get('/id/:_id', accountController.findById)

router.get('/check/:email', accountController.checkExitence)

router.put('/', accountController.update)

router.delete('/', accountController.delete)

module.exports = router