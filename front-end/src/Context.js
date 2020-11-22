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
                        {small: process.env.PUBLIC_URL + '/img/moletom_canguru_front.png', large: process.env.PUBLIC_URL + '/img/moletom_canguru_front.png', alt: `Frente de um moletom branco com uma pequena estampa na frente com o logo da 'SA-Shrek' fundo preto com pontinhos brancos (semelhante a um céu estrelado)`},
                        {small: process.env.PUBLIC_URL + '/img/products/moletom_canguru_back.png', large: process.env.PUBLIC_URL + '/img/products/moletom_canguru_back.png', alt: `Costas de um moletom branco fundo preto com pontinhos brancos (semelhante a um céu estrelado)`}
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
                    info: {location: 'Lorem Ipsum', date: 'dd/mm/yyyy', time: '00h00', link: {text: 'Link para o facebook', url: 'https://facebook.com/'}},
                    price: {full: 50.00, sale: 40.00},
                    img: [{small: process.env.PUBLIC_URL + '/img/cervejada.png', large: process.env.PUBLIC_URL + '/img/cervejada.png', alt: ''}],
                    stock: {
                        'EV-E1': 10
                    }
                }
            ],
    
            cart: [
                {
                    sku: 'PR-P1-VOID-MASC-M', // PR = type (PRoduct) --- P1 = id --- VOID = color --- MASC = template (MASC x FEMI) --- M = size
                    quantity: 2,
                    specs: {color: '', template: 'Masculino', size: 'M'}
                },
                {
                    sku: 'EV-E1', // EV = type (EVent) --- E1 = id
                    quantity: 1,
                    specs: {color: '', template: '', size: ''}
                }
            ],
    
            orders: [
                /*
                {
                    id: '', //id do pedido
                    product:[
                        {
                            sku: '',    //sku do produto
                            quantity: '',    //quantidade (número)
                            specs: {color: '', template:'', size:''}
                        }
                    ],
                    client: '',   //email do cliente
                    date: '',
                    situation: '',   //AA - aguardando aprovação, PA - pagamento aprovado, PPR - pronto para retirada, FF - finalizado
                    adress: ''      //Endereço de Envio
                },
                */
                {
                    id: '1',
                    product:[
                        {
                            sku: 'PR-P1-VOID-FEMI-GG',   
                            quantity: '1',
                            specs: {color: '', template:'Feminino', size:'GG'}
                        },
                        {
                            sku: 'PR-P1-VOID-MASC-EXG',   
                            quantity: '1',
                            specs: {color: '', template:'Masculino', size:'EXG'}
                        },
                    ],
                    client: 'fionagatinha74@gmail.com', 
                    date: '20/11/2020',
                    situation: 'AA',  
                },
                {
                    id: '2',
                    product:[
                        {
                            sku: 'EV-E1',   
                            quantity: '2',
                            specs: {color: '', template: '', size: ''}
                        },
                    ],
                    client: 'biscoitodamassa@gmail.com', 
                    date: '16/11/2020',
                    situation: 'FF',  
                }

            ],

            accounts: [ 
                {   name: 'Fiona',
                    type: 'client', // client x admin
                    email: 'fionagatinha74@gmail.com',
                    password: 'souLinda123',
                    birthday: '',
                    cpf: '',
                    phoneNumber: ''
                },
                {
                    name: 'Biscoito',
                    type: 'client',
                    email: 'biscoitodamassa@gmail.com',
                    password: 'nhameNhame123',
                    birthday: '',
                    cpf: '',
                    phoneNumber: ''
                },
                {
                    name: 'Usuario',
                    type: 'client',
                    email: 'teste@gmail.com',
                    password: 'Teste123',
                    birthday: '',
                    cpf: '',
                    phoneNumber: ''
                },
                {
                    name: 'admin',
                    type: 'admin',
                    email: 'admin@admin.adm',
                    password: 'Admin123',
                    birthday: '01/01/2000',
                    cpf: '666.666.666-66',
                    phoneNumber: ''
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
                coupon: ''
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
                EV: 1
            }
        }

        $('*').removeClass('dark-theme light-theme')
        $('*').addClass(this.state.darkTheme ? 'dark-theme' : 'light-theme')

        this.toggleTheme = this.toggleTheme.bind(this)
        this.activateCoupon = this.activateCoupon.bind(this)
        this.clearCoupon = this.clearCoupon.bind(this)
        this.login = this.login.bind(this)
        this.logout = this.logout.bind(this)
        this.signup = this.signup.bind(this)
        this.getCurrentAccount = this.getCurrentAccount.bind(this)
        this.getId = this.getId.bind(this)
        this.createProduct = this.createProduct.bind(this)
        this.updateProduct = this.updateProduct.bind(this)
        this.deleteProduct = this.deleteProduct.bind(this)
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
        this.setState(prevState => {return {cart: prevState.cart.filter(item => item.sku !== sku)}})
        return true
    }

    activateCoupon(coupon){
        const c = this.state.coupons.find(item => item.str === coupon)

        if(c){ 
            this.setState({activeCoupon: {status: true, coupon: c}}) 
            return {status: true, coupon: c}
        }

        return {status: false, coupon: ''}
    }

    clearCoupon(){
        this.setState({activeCoupon: {status: false, coupon: ''}}) 
    }

    getId(type){
        if(!['EV', 'PR'].includes(type)){ return }

        const newId = type.substring(0,1) + (this.state.id[type] + 1).toString()

        this.setState(prevState => ({
            id: {
                PR: prevState.id.PR + (type === 'PR' ? 1 : 0),
                EV: prevState.id.EV + (type === 'EV' ? 1 : 0)
            }
        }))

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
        this.setState(prevState => ({data: prevState.data.map(item => item.id === data.id ? data : item)}), () => console.log(this.state.data))
    }

    deleteProduct(id){
        this.setState(prevState => ({data: prevState.data.filter(item => item.id !== id)}), () => console.log(this.state.data))
    }

    addToCart = this.addToCart.bind(this)
    removeFromCart = this.removeFromCart.bind(this)
    deleteFromCart = this.deleteFromCart.bind(this)

    render(){
        const {data, cart, accounts, coupons, home, categories, darkTheme, orders, activeCoupon, isLogged} = this.state
        const {addToCart, removeFromCart, deleteFromCart, toggleTheme, activateCoupon, clearCoupon, login, logout, signup, getCurrentAccount, getId, createProduct, updateProduct, deleteProduct} = this

        return(
            <DataContext.Provider value={{data, cart, accounts, isLogged, coupons, home, categories, darkTheme, orders, activeCoupon, addToCart, removeFromCart, deleteFromCart, toggleTheme, activateCoupon, clearCoupon, login, logout, signup, getCurrentAccount, getId, createProduct, updateProduct, deleteProduct}}>
                {this.props.children}
            </DataContext.Provider>
        )
    }
}
