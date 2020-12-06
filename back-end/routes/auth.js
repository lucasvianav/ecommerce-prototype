const express = require('express')
const router = express.Router()

const cors = require('cors')
router.use(cors())

const authController = require('../controllers/auth')

router.post('/signup', authController.signup)

router.post('/login', authController.login)

module.exports = router