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
    
            // sku: 'PR-P1-VOID-MASC-M', // PR = type (PRoduct) --- P1 = id --- VOID = color --- MASC = template (MASC x FEMI) --- M = size
            // sku: 'EV-E1', // EV = type (EVent) --- E1 = id
            cart: [],
    
            orders: [],

            accounts: [],

            isLogged: { status: false, user: {} },
    
            coupons: [],

            activeCoupon: {
                status: false,
                coupon: {},
                discount: 0
            },

            categories: [],

            darkTheme: this.getInitialTheme(),
        }

        $('*').removeClass('dark-theme light-theme')
        $('*').addClass(this.state.darkTheme ? 'dark-theme' : 'light-theme')

        this.editCart = this.editCart.bind(this)
        this.removeFromCart = this.removeFromCart.bind(this)
        this.toggleTheme = this.toggleTheme.bind(this)
        this.redeemCoupon = this.redeemCoupon.bind(this)
        this.clearCoupon = this.clearCoupon.bind(this)
        this.login = this.login.bind(this)
        this.logout = this.logout.bind(this)
        this.signup = this.signup.bind(this)
        this.getCurrentAccount = this.getCurrentAccount.bind(this)
        this.createProduct = this.createProduct.bind(this)
        this.updateProduct = this.updateProduct.bind(this)
        this.deleteProduct = this.deleteProduct.bind(this)
        this.deleteAllProducts = this.deleteAllProducts.bind(this)
        this.createCoupon = this.createCoupon.bind(this)
        this.updateCoupon = this.updateCoupon.bind(this)
        this.deleteCoupon = this.deleteCoupon.bind(this)
        this.deleteAllCoupons = this.deleteAllCoupons.bind(this)
        this.deleteAccount = this.deleteAccount.bind(this)
        this.placeOrder = this.placeOrder.bind(this)
        this.updateCurrentAccount = this.updateCurrentAccount.bind(this)
        this.getInitialLogin = this.getInitialLogin.bind(this)
        this.getInitialCart = this.getInitialCart.bind(this)
        this.fetchData = this.fetchData.bind(this)
        this.fetchProducts = this.fetchProducts.bind(this)
        this.refreshCart = this.refreshCart.bind(this)
        this.fetchOrders = this.fetchOrders.bind(this)
        this.updateOrder = this.updateOrder.bind(this)
        this.fetchCoupons = this.fetchCoupons.bind(this)
        this.fetchAccounts = this.fetchAccounts.bind(this)
        this.changeAccountType = this.changeAccountType.bind(this)
    }

    componentDidMount(){
        localStorage.setItem('darkTheme', JSON.stringify(this.state.darkTheme))
    }
    
    async fetchData(){
        await this.getInitialLogin()
        await this.fetchProducts()
        await this.getInitialCart()
        await this.fetchCoupons()
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

    async getInitialCart(){
        if(!this.state.isLogged.status){
            if(!this.state.cart.isEmpty()){
                localStorage.setItem('guestCart', JSON.stringify(this.state.cart))
            }

            else if('guestCart' in localStorage){
                this.setState({cart: JSON.parse(localStorage.getItem('guestCart'))})
            }
        }

        else{
            await api.get('/cart/' + this.state.isLogged.user._id)
                .then(r => {
                    this.setState({cart: r.data})
                    localStorage.removeItem('guestCart')
                })
        }

        return
    }

    async fetchProducts(){
        await api.get('/products').then(r => {
            const {data} = r

            let categories = []
            for(let product of data){
                let {category} = product

                if((!categories.some(e => e.name === category.trim())) && product.visibility){
                    categories.push({
                        name: category.trim(),
                        parent: product.type
                    })
                }
            }

            this.setState({data, categories})
        }).catch(e => console.log('Algo deu errado: ', e))
    }

    async fetchOrders(){
        var orders = []

        if(this.state.isLogged.status){
            const {_id, type} = this.state.isLogged.user
            await api.get('/orders' + (type === 'admin' ? '' : ('/clientId/' + _id))).then(r => orders = r.data)
        }

        this.setState({ orders })
    }

    async fetchCoupons(){
        await api.get('/coupons').then(r => {
            const {data: coupons} = r
            this.setState({ coupons })
        })
    }

    async fetchAccounts(){
        await api.get('/accounts').then(r => {
            const {data: accounts} = r
            this.setState({ accounts })
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
        this.setState(prevState => ({ darkTheme: !prevState.darkTheme }), () => {
            $('*').removeClass('dark-theme light-theme')
            $('*').addClass(this.state.darkTheme ? 'dark-theme' : 'light-theme')
            
            localStorage.setItem('darkTheme', JSON.stringify(this.state.darkTheme))
        })
    }
    
    async login(email, password){
        try{
            const response = await api.post('/auth/login', {email, password})
            
            if(response.status === 200){
                let {cart} = this.state
                const {_id} = response.data.user

                cart = !cart.isEmpty() ? await api.post('/cart', { _id, cart }) : await api.get('/cart/' + response.data.user._id)
                cart = cart.data

                this.setState({ isLogged: {status: true, user: response.data.user}, cart })
                localStorage.removeItem('guestCart')
                localStorage.setItem('session', JSON.stringify(response.data.token))

                return true
            }

            else{ return false }
        }

        catch(e){ 
            console.log('Ocorreu um erro: ', e)
            return false 
        }
    }

    logout(){
        localStorage.setItem('guestCart', JSON.stringify(this.state.cart))
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
            phoneNumber: data.signupPhoneNumber,
            cart: this.state.cart
        }

        return await api.post('auth/signup', {...account})
    }

    getCurrentAccount(){
        const {isLogged} = this.state
        return isLogged.status ? isLogged.user : null
    }

    async editCart(sku, quantity, specs, callback){
        if(-1 < quantity && quantity < 1){ return false; }
        
        var {cart} = this.state

        if(!this.state.isLogged.status){
            if(quantity >= 1){
                const stock = (await api.get('/products/stock/' + sku)).data

                // If the cart already contains that item
                if(cart.some(item => item.sku === sku)){
                    cart = cart.map(item => {
                        if(item.sku === sku){ 
                            if(parseInt(item.quantity) + parseInt(quantity) <= parseInt(stock)){ item.quantity += parseInt(quantity) }
                            else{ item.quantity = parseInt(stock) }
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
            }
            
            else if(quantity <= -1){
                const qty = Math.abs(quantity)

                // If the cart contains that item and the quantity 
                // in cart is higher the quantity to be removed
                cart = cart.map(item => {
                    if(item.sku === sku && item.quantity > qty){ item.quantity -= qty }
                    return item
                })
            }

            localStorage.setItem('guestCart', JSON.stringify(cart))
        }

        else{
            const {_id} = this.state.isLogged.user
            cart = (await api.patch('/cart', {_id, sku, quantity, specs})).data
        }
        
        this.setState({cart}, () => callback ? callback() : null)
        this.clearCoupon()
    }

    async removeFromCart(sku, callback){
        var {cart} = this.state
        const {status: isLogged} = this.state.isLogged

        cart = isLogged ? (await api.delete('/cart', { data: { _id: this.state.isLogged.user._id, sku } })).data : cart.filter(item => item.sku !== sku)

        if(!isLogged){ localStorage.setItem('guestCart', JSON.stringify(cart)) }
        this.setState({cart}, () => callback ? callback() : null)
        this.clearCoupon()
    }

    async refreshCart(callback){
        if(this.state.isLogged.status){
            const {_id} = this.state.isLogged.user
            await api.put('/cart', {_id}).then(r => {
                const cart = r.data
                this.setState({ cart }, callback ? callback() : null)
            })
        }
    }

    redeemCoupon(coupon, subtotal){
        const c = this.state.coupons.find(item => item.str === coupon)
        
        if(c){ 
            const discount = (c.type === 'percentage') ? parseFloat(subtotal) * parseFloat(c.discount)/100 : parseFloat(c.discount)
            this.setState({activeCoupon: {status: true, coupon: c, discount: discount}}) 
            return {status: true, coupon: c, discount: discount}
        }

        return {status: false, coupon: {}, discount: 0}
    }

    clearCoupon(){
        this.setState({activeCoupon: {status: false, coupon: '', discount: 0}}) 
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

    createCoupon(data){
        if(data.id !== undefined && data.id !== ""){
            let {coupons: cp} = this.state
            cp.push(data)

            this.setState({coupons: cp})
        }
    }

    updateCoupon(data){
        this.setState(prevState => ({coupons: prevState.coupons.map(item => item.id === data.id ? data : item)}))

    }

    deleteCoupon(id){
        this.setState(prevState => ({coupons: prevState.coupons.filter(item => item.id !== id)}))
    }

    deleteAllCoupons(){
        this.setState({coupons: []})
    }

    async changeAccountType(_id, type){
        await api.put('/accounts', {_id, updates: { type }}).then(async r => {
            const {status, user} = this.state.isLogged
            status && _id !== user._id ? await this.fetchAccounts() : window.location.reload()
        }).catch(e => console.log(`Ocorreu um erro: ${e}`))
    }

    async deleteAccount(_id){
        await api.delete(`/accounts/${_id}`).then(async r => {
            const {status, user} = this.state.isLogged
            status && user._id !== _id ? await this.fetchAccounts() : this.logout()
        }).catch(e => console.log(`Ocorreu um erro: ${e}`))
    }

    async placeOrder(total, payment){
        if(!this.state.isLogged.status || this.state.cart.isEmpty()){ return }
        
        let subtotal = 0
        const cart = this.state.cart.map(item => {
            let _id = item.sku.split('-')[1]
            item.price = this.state.data.find(el => _id === el._id).price.sale
            subtotal += parseFloat(item.price) * parseInt(item.quantity)
            return item
        })

        const {_id, name, email, cpf, phoneNumber} = this.state.isLogged.user
        const client = {_id, name, email, cpf, phoneNumber}
        
        const order = {
            products: cart,
            client,
            date: (new Date()).toLocaleDateString().replace(/(^\d\d)\/(\d\d)/mg, '$2/$1'),
            time: (new Date()).toLocaleTimeString(),
            payment: payment,
            situation: 'AA',
            discount: this.state.activeCoupon.discount,
            total: subtotal - this.state.activeCoupon.discount
        }
        
        if(total !== order.total){
            alert('Erro!')
            return null
        }

        const newOrderId = (await api.post('/orders', {...order})).data

        this.clearCoupon()
        await this.refreshCart()
        await this.fetchProducts()

        return newOrderId
    }

    async updateOrder(_id, situation){
        if(['AA', 'PA', 'PPR', 'FF'].includes(situation)){
            await api.patch('/orders', {_id, situation }).then(async r => await this.fetchOrders())
        }
    }

    render(){
        const {data, cart, coupons, home, categories, darkTheme, orders, activeCoupon, accounts, isLogged} = this.state
        const { 
            editCart, removeFromCart, toggleTheme, redeemCoupon, clearCoupon, login, logout, signup, getCurrentAccount, 
            createProduct, updateProduct, deleteProduct, deleteAllProducts, createCoupon, updateCoupon, deleteCoupon, deleteAccount,
            deleteAllCoupons, placeOrder, updateCurrentAccount, getInitialLogin, getInitialCart, fetchData, refreshCart, fetchOrders,
            updateOrder, fetchProducts, fetchAccounts, fetchCoupons, changeAccountType
        } = this

        return(
            <DataContext.Provider value={{ 
                data, cart, isLogged, coupons, home, categories, darkTheme, orders, activeCoupon, accounts, editCart, removeFromCart,
                toggleTheme, redeemCoupon, clearCoupon, login, logout, signup, getCurrentAccount, createProduct, updateProduct, deleteProduct, 
                deleteAllProducts, createCoupon, updateCoupon, deleteCoupon, deleteAccount, deleteAllCoupons, placeOrder, 
                updateCurrentAccount, getInitialLogin, getInitialCart, fetchData, refreshCart, fetchOrders, updateOrder, fetchProducts, 
                fetchAccounts, fetchCoupons, changeAccountType
            }}>
                {this.props.children}
            </DataContext.Provider>
        )
    }
}
