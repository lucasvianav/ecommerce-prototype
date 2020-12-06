const accountService = require('../services/account')

const accountController = {
  find: async (req, res) => {
    const accounts = await accountService.find()

    return res.json(accounts)
  },

  findByEmail: async (req, res) => {
    const {email} = req.body
    const account = await accountService.findByEmail(email)

    return res.json(account)
  },

  findById: async (req, res) => {
    const {_id} = req.body
    const account = await accountService.findById(_id)

    return res.json(account)
  },

  checkExitence: async (req, res) => {
    const {email} = req.body
    const exists = await accountService.checkExistence({email})

    return res.json(exists)
  },

  update: async (req, res) => {
    try{
      const {email, updates} = req.body
      await accountService.update(email, updates)
      return true
    }

    catch{ return false }
  },

  delete: async (req, res) => {
    try{
      const {email} = req.body
      await accountService.delete(email)
      return true
    }

    catch{ return false }
  }
}

module.exports = accountController