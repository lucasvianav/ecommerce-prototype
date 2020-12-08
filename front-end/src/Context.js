import React from 'react'
import $ from 'jquery'

import api from './requests/connection'

export const DataContext = React.createContext()

export class DataProvider extends React.Component {
    constructor(props){
        super(props)
        
        this.state = {
            home: [
                {img: process.env.PUBLIC_URL + '/img/home/moletom001.png', alt: `Menina sorrindo usando um moletom cinza com detalhes pretos com 'ENFERMAGEM UFPG' estampado no centro. Em ambos lados de 'UFPG' há duas linhas horirontais e paralelas.`},
                {img: process.env.PUBLIC_URL + '/img/home/moletom002.png', alt: `Menina sorrindo usando um moletom cinza com detalhes vermelhos com 'IFCAT ENGENHARIA CIVIL' estampado no centro. Em ambos lados de 'IFCAT' há uma linha horirontal e paralela.`},
                {img: process.env.PUBLIC_URL + '/img/home/moletom003.png', alt: `Menina usando um moletom branco com detalhes vermelhos com 'ODONTO' estampado no centro. No canto inferior direito há um brasão.`},
                {img: process.env.PUBLIC_URL + '/img/home/moletom004.png', alt: `Menina sorrindo usando um moletom preto com detalhes verdes com 'NUTRIÇÃO UFGD' estampado no centro. No canto inferior direito há um brasão.`},
                {img: process.env.PUBLIC_URL + '/img/home/moletom005.png', alt: `Menina sorrindo usando um moletom branco com detalhes pretos com 'MEDICIDA UniCEUB' estampado no centro.`},
                {img: process.env.PUBLIC_URL + '/img/home/moletom006.png', alt: `Menina usando um moletom azul escuro com detalhes brancos com 'ENFERMAGEM' estampado no centro. Brasão na cor amarela na parte de cima de uma das mangas.`},
                {img: process.env.PUBLIC_URL + '/img/home/moletom007.png', alt: `Menino usando um moletom preto com detalhes vermelhos e amarelos com 'ATLETICA MALDITA MEDICINA UNEMAT' estampado no centro. No canto inferior direito há um brasão.`}
            ],
    
            data: [],
    
            cart: [
                // {
                //     sku: 'PR-P1-VOID-MASC-M', // PR = type (PRoduct) --- P1 = id --- VOID = color --- MASC = template (MASC x FEMI) --- M = size
                //     quantity: 2,
                //     specs: {color: '', template: 'Masculino', size: 'M'}
                // },
                // {
                //     sku: 'EV-E1', // EV = type (EVent) --- E1 = id
                //     quantity: 1,
                //     specs: {color: '', template: '', size: ''}
                // }
            ],
    
            orders: [
                /*
                {
                    id: '', //id do pedido
                    product:[
                        {
                            sku: '',    //sku do produto
                            quantity: '',    //quantidade (número)
                            specs: {color: '', template:'', size:''},
                            price: '' // preço do produto no momento da compra
                        }
                    ],
                    client: '',   //email do cliente
                    date: '', // data do pedido
                    time: '', // horário do pedido
                    payment: '', // método de pagamento escolhido
                    situation: '',   //AA - aguardando aprovação, PA - pagamento aprovado, PPR - pronto para retirada, FF - finalizado
                    discount: '',      // Desconto provindo de cupon, em R$ (número)
                    total: '' // Valor total da compra
                },
                */
                {
                    id: '1',
                    product: [
                        {
                            sku: 'PR-P1-VOID-FEMI-GG',   
                            quantity: '1',
                            specs: {color: '', template:'Feminino', size:'GG'},
                            price: 130
                        },
                        {
                            sku: 'PR-P1-VOID-MASC-EXG',   
                            quantity: '1',
                            specs: {color: '', template:'Masculino', size:'EXG'},
                            price: 130
                        },
                    ],
                    client: 'fionagatinha74@gmail.com', 
                    date: '20/11/2020',
                    time: '11:45:45 AM',
                    payment: 'Transferência/Depósito bancário',
                    situation: 'AA',
                    discount: 10,
                    total: 250
                },
                {
                    id: '2',
                    product:[
                        {
                            sku: 'EV-E1',   
                            quantity: '2',
                            specs: {color: '', template: '', size: ''},
                            price: 40
                        },
                    ],
                    client: 'biscoitodamassa@gmail.com', 
                    date: '16/11/2020',
                    time: '7:31:12 PM',
                    payment: 'Transferência por Picpay',
                    situation: 'FF',
                    discount: 0,
                    total: 40
                }

            ],

            accounts: [ 
                {   name: 'Fiona',
                    type: 'client', // client x admin
                    email: 'fionagatinha74@gmail.com',
                    password: 'souLinda123',
                    birthday: '01/01/2000',
                    cpf: '666.666.666-66',
                    phoneNumber: '+55 99 99999-9999'
                },
                {
                    name: 'Biscoito',
                    type: 'client',
                    email: 'biscoitodamassa@gmail.com',
                    password: 'nhameNhame123',
                    birthday: '01/01/2000',
                    cpf: '666.666.666-66',
                    phoneNumber: '+55 99 99999-9999'
                },
                {
                    name: 'Usuario',
                    type: 'client',
                    email: 'teste@gmail.com',
                    password: 'Teste123',
                    birthday: '01/01/2000',
                    cpf: '666.666.666-66',
                    phoneNumber: '+55 99 99999-9999'
                },
                {
                    name: 'admin',
                    type: 'admin',
                    email: 'admin@admin.adm',
                    password: 'Admin123',
                    birthday: '01/01/2000',
                    cpf: '666.666.666-66',
                    phoneNumber: '+55 99 99999-9999'
                }
            ],

            isLogged: {status: false, user: {}},
    
            coupons: [
                {
                    str: 'FLIPRULEZ10',
                    type: 'percentage', // 'percentage' x 'absolute'
                    discount: 10 // 10%
                },
                {
                    str: 'FLIPRULEZ25',
                    type: 'absolute',
                    discount: 25 // R$25
                }
            ],

            activeCoupon: {
                status: false,
                coupon: '',
                discount: 0
            },

            categories: [
                {
                    name: 'Moletons',
                    parent: 'PR'
                }, 
                {
                    name: 'Cervejada',
                    parent: 'EV'
                }
            ],

            darkTheme: this.getInitialTheme(),

            id: {
                PR: 1,
                EV: 1,
                order: 2
            }
        }

        $('*').removeClass('dark-theme light-theme')
        $('*').addClass(this.state.darkTheme ? 'dark-theme' : 'light-theme')

        this.addToCart = this.addToCart.bind(this)
        this.removeFromCart = this.removeFromCart.bind(this)
        this.deleteFromCart = this.deleteFromCart.bind(this)
        this.toggleTheme = this.toggleTheme.bind(this)
        this.redeemCoupon = this.redeemCoupon.bind(this)
        this.clearCoupon = this.clearCoupon.bind(this)
        this.login = this.login.bind(this)
        this.logout = this.logout.bind(this)
        this.signup = this.signup.bind(this)
        this.getCurrentAccount = this.getCurrentAccount.bind(this)
        this.getId = this.getId.bind(this)
        this.getOrderId = this.getOrderId.bind(this)
        this.createProduct = this.createProduct.bind(this)
        this.updateProduct = this.updateProduct.bind(this)
        this.deleteProduct = this.deleteProduct.bind(this)
        this.deleteAllProducts = this.deleteAllProducts.bind(this)
        this.placeOrder = this.placeOrder.bind(this)
        this.updateCurrentAccount = this.updateCurrentAccount.bind(this)
        this.getInitialLogin = this.getInitialLogin.bind(this)
    }

    componentDidMount(){
        localStorage.setItem('darkTheme', JSON.stringify(this.state.darkTheme))
    }
    
    async getInitialLogin(){
        const token = JSON.parse(localStorage.getItem('session'))
        await api.get('/auth/authenticate', { headers: {'Authorization': 'Bearer ' + token} })
            .then(r => this.setState({isLogged: {status: true, user: r.data}}))
            .catch(e => {
                this.setState({isLogged: {status: false, user: null}})
                localStorage.removeItem('session')
            })
    }

    updateCurrentAccount(){
        if(this.state.isLogged.status){
            api.get('/accounts/id/' + this.state.isLogged.user._id)
                .then(r => this.setState({isLogged: {status: true, user: r.data}}))
        }
    }

    getInitialTheme(){
        const userPrefersDark = () => !window.matchMedia ? false : window.matchMedia("(prefers-color-scheme: dark)").matches
        return ("darkTheme" in localStorage) ? JSON.parse(localStorage.getItem('darkTheme')) : userPrefersDark()
    }

    toggleTheme(){
        $('*').removeClass('dark-theme light-theme')
        $('*').addClass(!this.state.darkTheme ? 'dark-theme' : 'light-theme')
        
        localStorage.setItem('darkTheme', JSON.stringify(!this.state.darkTheme))
        this.setState(prevState => {return {darkTheme: !prevState.darkTheme}})
    }
    
    async login(email, password){
        try{
            const response = await api.post('/auth/login', {email, password})
            console.log(response)

            if(response.status === 200){
                localStorage.setItem('session', JSON.stringify(response.data.token))
                this.setState({isLogged: {status: true, user: response.data.user}})
                return true
            }

            else{ return false }
        }

        catch(e){ return false }
    }

    logout(){
        localStorage.removeItem('session')
        this.setState({isLogged: {status: false, user: null}}, window.location.reload())
    }
    
    async signup(data){
        const account = {
            name: data.signupName,
            type: 'client',
            email: data.signupEmail,
            password: data.signupPw,
            birthday: data.signupBirthday,
            cpf: data.signupCPF,
            phoneNumber: data.signupPhoneNumber
        }

        return await api.post('auth/signup', {...account})
    }

    getCurrentAccount(){
        const {isLogged} = this.state
        return isLogged.status ? isLogged.user : null
    }

    addToCart(sku, quantity, specs){
        if(quantity < 1){ return false }

        const [type, id] = sku.split('-')

        const product = this.state.data.find(item => (item.id === id && item.type === type))

        let {cart} = this.state

        const stock = product.stock[sku] ? parseInt(product.stock[sku]) : 0

        var output = true

        // If the cart already contains that item
        if(cart.some(item => item.sku === sku)){
            cart = cart.map(item => {
                if(item.sku === sku){ 
                    if(parseInt(item.quantity) + parseInt(quantity) <= parseInt(stock)){ item.quantity += parseInt(quantity) }
                    else{ 
                        output = false
                        item.quantity = parseInt(stock) 
                    }
                }

                return item
            })
        }

        // If it doesn't
        else{
            cart.push({
                sku: sku,
                quantity: Math.min(parseInt(quantity), parseInt(stock)),
                specs: specs
            })
        }

        this.setState({cart: cart})
        this.clearCoupon()

        return output
    }

    removeFromCart(sku, quantity){
        if(quantity < 1){ return false }

        let {cart} = this.state
        var output = true
        
        // If the cart contains that item and the quantity 
        // in cart is higher the quantity to be removed
        cart = cart.map(item => {
            if(item.sku === sku){ item.quantity > quantity ? item.quantity -= quantity : output = false }
            return item
        })

        this.setState({cart: cart})

        return output
    }

    deleteFromCart(sku){
        this.setState(prevState => ({cart: prevState.cart.filter(item => item.sku !== sku)}))
        return true
    }

    redeemCoupon(coupon, subtotal){
        const c = this.state.coupons.find(item => item.str === coupon)
        
        if(c){ 
            const discount = (c.type === 'percentage') ? parseFloat(subtotal) * parseFloat(c.discount)/100 : parseFloat(c.discount)
            this.setState({activeCoupon: {status: true, coupon: c, discount: discount}}) 
            return {status: true, coupon: c, discount: discount}
        }

        return {status: false, coupon: '', discount: 0}
    }

    clearCoupon(){
        this.setState({activeCoupon: {status: false, coupon: '', discount: 0}}) 
    }

    getId(type){
        if(!['EV', 'PR'].includes(type)){ return }

        const newId = type.substring(0,1) + (this.state.id[type] + 1).toString()

        this.setState(prevState => ({
            id: {
                PR: prevState.id.PR + (type === 'PR' ? 1 : 0),
                EV: prevState.id.EV + (type === 'EV' ? 1 : 0),
                order: prevState.id.order
            }
        }))

        return newId
    }

    getOrderId(){
        const newId = this.state.id.order + 1

        this.setState(prevState => ({id: {
            PR: prevState.id.PR,
            EV: prevState.id.EV,
            order: prevState.id.order + 1
        }}))

        return newId
    }

    createProduct(data){
        let {data: products} = this.state
        products.push(data)

        let {categories} = this.state
        if(this.state.categories.every(item => item.name !== data.category)){
            categories.push({
                name: data.category,
                parent: data.type
            })
        }

        this.setState({data: products, categories: categories})
    }

    updateProduct(data){
        this.setState(prevState => ({data: prevState.data.map(item => item.id === data.id ? data : item)}))
    }

    deleteProduct(id){
        this.setState(prevState => ({data: prevState.data.filter(item => item.id !== id)}))
    }

    deleteAllProducts(){
        this.setState({data: [{}]})
    }

    placeOrder(total, payment){
        if(!this.state.isLogged.status || this.state.cart.isEmpty()){ return }
        
        let subtotal = 0
        const cart = this.state.cart.map(item => {
            let id = item.sku.split('-')[1]
            item.price = this.state.data.find(el => id === el.id).price.sale
            subtotal += parseFloat(item.price) * parseInt(item.quantity)
            return item
        })
        
        const order = {
            id: this.getOrderId(),
            product: cart,
            client: this.state.isLogged.email,
            date: (new Date()).toLocaleDateString().replace(/(^\d\d)\/(\d\d)/mg, '$2/$1'),
            time: (new Date()).toLocaleTimeString(),
            payment: payment,
            situation: 'AA',
            discount: this.state.activeCoupon.discount,
            total: subtotal - this.state.activeCoupon.discount
        }

        // data = [{sku: string, quantity: number}]
        const updateStock = (data) => {
            let {data: products} = this.state

            for(let item of data){
                if(isNaN(item.quantity) || parseInt(item.quantity) === 0){ continue }

                let id = item.sku.split('-')[1]
                let product = products.find(el => el.id === id)
                product.stock[item.sku] = parseInt(product.stock[item.sku]) - parseInt(item.quantity)
            }

            this.setState({data: products, cart: [], activeCoupon: {status: false, coupon: '', discount: 0}})

            return true
        }
        
        if(total !== order.total || !updateStock(cart.map(item => ({sku: item.sku, quantity: parseInt(item.quantity)})))){
            alert('Erro!')
            return false
        }

        let {orders} = this.state
        orders.push(order)
        this.setState({orders: orders})

        return true
    }

    render(){
        const {data, cart, accounts, coupons, home, categories, darkTheme, orders, activeCoupon, isLogged} = this.state
        const {addToCart, removeFromCart, deleteFromCart, toggleTheme, redeemCoupon, clearCoupon, login, logout, signup, getCurrentAccount, getId, createProduct, updateProduct, deleteProduct, deleteAllProducts, placeOrder, updateCurrentAccount, getInitialLogin} = this

        return(
            <DataContext.Provider value={{data, cart, accounts, isLogged, coupons, home, categories, darkTheme, orders, activeCoupon, addToCart, removeFromCart, deleteFromCart, toggleTheme, redeemCoupon, clearCoupon, login, logout, signup, getCurrentAccount, getId, createProduct, updateProduct, deleteProduct, deleteAllProducts, placeOrder, updateCurrentAccount, getInitialLogin}}>
                {this.props.children}
            </DataContext.Provider>
        )
    }
}
