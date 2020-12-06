const authService = require('../services/auth')

const authController = {
    signup: async (req, res) => {
        const {name, type, email, password, birthday, cpf, phoneNumber} = req.body

        const createdAccount = await authService.signup({name, type, email, password, birthday, cpf, phoneNumber})

        return createdAccount ? res.json(createdAccount) : res.status(400).json()
    },

    login: async (req, res) => {
        const {email, password: hash} = req.body

        const user = await authService.login(email, hash)

        return user ? res.json(user) : res.status(401).json()
    },

    validate: async (req, res, next) => {
        const token = req.get('Authorization').replace('Bearer ', '')

        if(authService.validate(token)){ next() }
        else{ return res.status(401).json() }
    },
    
    authenticate: async (req, res) => {
        const token = req.get('Authorization').replace('Bearer ', '')
        const user = await authService.authenticate(token)

        return user ? user : res.status(401).json()
    }
}

module.exports = authController