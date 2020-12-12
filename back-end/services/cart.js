const Accounts = require('../models/account')
const Products = require('../models/products')

const cartService = {
    find: async _id => (await Accounts.findById(_id, 'cart')).cart,

    substitute: async (_id, cart) => await Accounts.findByIdAndUpdate(_id, { cart }),

    edit: async (_id, sku, quantity, specs) => {
        if(-1 < quantity && quantity < 1){ return null }
        
        let cart = (await Accounts.findById(_id, 'cart'))['cart']

        if(quantity >= 1){
            const [type, id] = sku.split('-')
            const product = await Products.findById(id)
            const stock = product.stock.get(sku) ? parseInt(product.stock.get(sku)) : 0

            if(cart.some(item => item.sku === sku)){
                cart = cart.map(item => {
                    if(item.sku === sku){ 
                        parseInt(item.quantity) + parseInt(quantity) <= parseInt(stock) 
                            ? item.quantity += parseInt(quantity)
                            : item.quantity = parseInt(stock)
                    }

                    return item
                })
            }

            else{
                cart.push({
                    sku: sku,
                    quantity: Math.min(parseInt(quantity), parseInt(stock)),
                    specs: {
                        color: specs.color || '',
                        template: specs.template || '',
                        size: specs.size || ''
                    }
                })
            }
        }
        
        else{
            const qty = Math.abs(quantity)
            
            cart = cart.map(item => {
                if(item.sku === sku && item.quantity > qty){ item.quantity -= qty }
                return item
            })
        }
        
        await Accounts.findByIdAndUpdate(_id, { cart })

        return cart
    },
    
    update: async (_id) => {
        let cart = (await Accounts.findById(_id, 'cart'))['cart']

        cart = await cart.reduce(async (acc, item) => {
            const [type, id] = item.sku.split('-')
            const product = await Products.findById(id)
            
            if(product && product.visibility){
                const stock = product.stock.get(item.sku) ? parseInt(product.stock.get(item.sku)) : 0
                
                if(stock > 0){
                    item.quantity = Math.min(parseInt(item.quantity), stock)
                    acc.push(item)
                }
            }
            
            return acc
        }, [])

        await Accounts.findByIdAndUpdate(_id, { cart })
    
        return cart
    },

    remove: async (_id, sku) => {
        await Accounts.findByIdAndUpdate(_id, { $pull: { cart: { sku } } })

        return await Accounts.findById(_id, 'cart')
    },

    empty: async _id => await Accounts.findByIdAndUpdate(_id, {cart: []}, {new: true})
}

module.exports = cartService