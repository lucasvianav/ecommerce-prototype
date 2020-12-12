const Accounts = require('../models/account')
const bcrypt = require('bcrypt')
const accountService = require('./account')
const jwt = require('jsonwebtoken')

const formatResponse = user => {
    const {_id, name, type, email, birthday, cpf, phoneNumber, cart} = user
    return { _id, name, type, email, birthday, cpf, phoneNumber, cart }
}

const insertToken = user => {
    const token = jwt.sign({ userId: user._id }, process.env.JWT_PRIVATE_KEY, { expiresIn: '12h' })
    return { user: formatResponse(user), token }
}

const authService = {
    signup: async account => {
        account.password = await bcrypt.hash(account.password, 10)  
        return (await accountService.checkExistence({email: account.email})) ? null : formatResponse(await Accounts.create(account))
    },

    login: async (email, hash) => {
        const account = await Accounts.findOne({email})
        return (account && await bcrypt.compare(hash, account.password)) ? insertToken(account) : null
    },

    validate: async token => {
        try{
            const decodedId = jwt.verify(token, process.env.JWT_PRIVATE_KEY)
            return await accountService.checkExistence({_id: decodedId.userId})
        } 
        
        catch(e){ return false }
        
    },

    authenticate: async token => {
        try{
            const decodedId = jwt.verify(token, process.env.JWT_PRIVATE_KEY)
            return formatResponse(await accountService.findById(decodedId.userId))
        }
        
        catch(e){ return null }
    }
}

module.exports = authService