import React from 'react'
import $ from 'jquery'

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
    
            data: [
                {
                    name: 'Moletom Canguru Shrek',
                    type: 'PR', // PRoduct
                    id: 'P1',
                    visibility: true,
                    category: 'Moletons',
                    description: {ul: ['Moletom branco modelo canguru com logo da SA-Shrek estampado na frente.', 'Tecido 100% algodão de alta qualidade.', 'Garantia de 6 meses contra erros de fabricação.'], ol: [], txt: ``},
                    templates: ['Feminino', 'Masculino'],
                    sizes: ['PP', 'P', 'M', 'G', 'GG', 'EXG'],
                    colors: [],
                    price: {full: 130.00, sale: 130.00},
                    img: [
                        {path: process.env.PUBLIC_URL + '/img/moletom_canguru_front.png', alt: `Frente de um moletom branco com uma pequena estampa na frente com o logo da 'SA-Shrek' fundo preto com pontinhos brancos (semelhante a um céu estrelado)`},
                        {path: process.env.PUBLIC_URL + '/img/products/moletom_canguru_back.png', alt: `Costas de um moletom branco fundo preto com pontinhos brancos (semelhante a um céu estrelado)`}
                    ],
                    sizeTable: {img: '/img/products/size.png', alt: `Na imagem: Mokup de moletom e Tabela de Medidas. Na tabela há São 6 colunas. Na ordem: Tipo de medidas, P, M, G, GG, Tolerancia. E 3 linhas. Na ordem: Toráx, Comprimento, Comp. Manga. Na coluna P: 53, 69, 70. Na coluna M: 56, 71, 71. Na coluna GG: 62, 75, 73. Na coluna tolerancia: +-1.5, +-1.5, +-1.0. Observação em baixo da tabela: 'medidas em centímetros'.`},
                    stock: {
                        'PR-P1-VOID-MASC-PP': 5,
                        'PR-P1-VOID-MASC-P': 5,
                        'PR-P1-VOID-MASC-M': 5,
                        'PR-P1-VOID-MASC-G': 5,
                        'PR-P1-VOID-MASC-GG': 5,
                        'PR-P1-VOID-MASC-EXG': 5,
                        'PR-P1-VOID-FEMI-PP': 5,
                        'PR-P1-VOID-FEMI-P': 5,
                        'PR-P1-VOID-FEMI-M': 5,
                        'PR-P1-VOID-FEMI-G': 5,
                        'PR-P1-VOID-FEMI-GG': 5,
                        'PR-P1-VOID-FEMI-EXG': 0
                    }
                },
                {
                    name: 'Cervejada: "Sinta o pântano!"',
                    type: 'EV', // EVent
                    id: 'E1',
                    visibility: true,
                    category: 'Cervejada',
                    description: {ul: [], ol: [], txt: `A nossa tradicional cervejada do início do ano já chegou! Ela ocorerrá dia 20/03 a partir das 15h! Com muita música boa, com espaço de sobra pra você dançar e é claro muita lama! Você não vai ficar de fora dessa né? Não pastela!!! Corre pra garantir seu ingresso!`},
                    templates: [],
                    sizes: [],
                    colors: [],
                    info: {location: 'Lorem Ipsum', date: 'dd/mm/yyyy', time: '00h00', link: {text: 'Link para o facebook', url: 'https://facebook.com/'}},
                    price: {full: 50.00, sale: 40.00},
                    img: [{path: process.env.PUBLIC_URL + '/img/cervejada.png', alt: ''}],
                    stock: {
                        'EV-E1': 10
                    }
                }
            ],
    
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

            isLogged: {
                status: false,
                email: ''
            },
    
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
        this.placeOrder = this.placeOrder.bind(this)
        this.updateAccount = this.updateAccount.bind(this)
    }

    componentDidMount(){
        localStorage.setItem('darkTheme', JSON.stringify(this.state.darkTheme))
    }
    
    getInitialTheme() {
        const userPrefersDark = () => !window.matchMedia ? false : window.matchMedia("(prefers-color-scheme: dark)").matches
        return ("darkTheme" in localStorage) ? JSON.parse(localStorage.getItem('darkTheme')) : userPrefersDark()
    }

    toggleTheme() {
        $('*').removeClass('dark-theme light-theme')
        $('*').addClass(!this.state.darkTheme ? 'dark-theme' : 'light-theme')
        
        localStorage.setItem('darkTheme', JSON.stringify(!this.state.darkTheme))
        this.setState(prevState => {return {darkTheme: !prevState.darkTheme}})
    }
    
    login(email){
        this.setState({isLogged: {status: true, email: email}})
    }
    
    logout(){
        this.setState({isLogged: {status: false, email: ''}}, window.location.reload())
    }
    
    signup(info){
        let {accounts} = this.state

        accounts.push({
            name: info.signupName,
            type: 'client',
            email: info.signupEmail,
            password: info.signupPw,
            birthday: info.signupBirthday,
            cpf: info.signupCPF,
            phoneNumber: info.signupPhoneNumber
        })

        this.setState({accounts: accounts})
    }

    getCurrentAccount(){
        if(this.state.isLogged.status){
            return this.state.accounts.find(el => el.email === this.state.isLogged.email)
        }

        else{ return false }
    }

    updateAccount(phoneNumber){
        this.setState(prevState => ({
                accounts: prevState.accounts.map(item =>{
                    if(item.email === prevState.isLogged.email){ item.phoneNumber = phoneNumber }
                    return item
                })
            })
        )
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
        const {addToCart, removeFromCart, deleteFromCart, toggleTheme, redeemCoupon, clearCoupon, login, logout, signup, getCurrentAccount, getId, createProduct, updateProduct, deleteProduct, placeOrder, updateAccount} = this

        return(
            <DataContext.Provider value={{data, cart, accounts, isLogged, coupons, home, categories, darkTheme, orders, activeCoupon, addToCart, removeFromCart, deleteFromCart, toggleTheme, redeemCoupon, clearCoupon, login, logout, signup, getCurrentAccount, getId, createProduct, updateProduct, deleteProduct, placeOrder, updateAccount}}>
                {this.props.children}
            </DataContext.Provider>
        )
    }
}
