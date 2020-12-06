const Accounts = require('../models/account')
const bcrypt = require('bcrypt')
const accountService = require('./account')
const jwt = require('jsonwebtoken')

const formatResponse = user => { user.name, user.type, user.email, user.birthday, user.cpf, user.phoneNumber }

const insertToken = user => {
    const token = jwt.sign({ userId: user._id }, process.env.JWT_PRIVATE_KEY, { expiresIn: '36h' })
    return { user: formatResponse(user), token }
}

const authService = {
    signup: async account => {
        account.password = await bcrypt.hash(account.password, 10)  
        return (await accountService.checkExistence(email)) ? null : formatResponse(await Accounts.create(account))
    },

    login: async (email, hash) => {
        const account = await Accounts.findOne({email})
        return (account && await bcrypt.compare(hash, account.password)) ? insertToken(account) : null
    },

    validate: async token => {
        const decodedId = jwt.verify(token, process.env.JWT_PRIVATE_KEY)
        return await accountService.checkExistence({_id: decodedId})
    },

    authenticate: async token => {
        const decodedId = jwt.verify(token, process.env.JWT_PRIVATE_KEY)
        return await accountService.findById({_id: decodedId})
    }
}

module.exports = authService