const Accounts = require('../models/account')
const bcrypt = require('bcrypt')

const accountService = {
  find: async () => await Accounts.find({}, 'name type email birthday cpf phoneNumber'),

  findByEmail: async email => await Accounts.findOne({email}, 'name type email birthday cpf phoneNumber'),

  findById: async _id => await Accounts.findById({_id}, 'name type email birthday cpf phoneNumber'),

  checkExistence: async condition => Boolean(await Accounts.findOne(condition)),

  update: async (_id, updates) => {
    if (updates.password !== undefined){
      updates.password = await bcrypt.hash(updates.password, 10) 
    }
    await Accounts.findByIdAndUpdate(_id, updates)
  },

  delete: async _id => await Accounts.findByIdAndDelete(_id)
}

module.exports = accountService