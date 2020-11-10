import React from 'react'

export const DataContext = React.createContext()

export class DataProvider extends React.Component {
    state = {
        data: {
            products: [
                {
                    name: 'Moletom Canguru Shrek',
                    visibility: true,
                    category: 'Moletons',
                    description: {ul: ['Moletom branco modelo canguru com logo da SA-Shrek estampado na frente.', 'Tecido 100% algodão de alta qualidade.', 'Garantia de 6 meses contra erros de fabricação.'], ol: [], txt: ``},
                    templates: ['Feminino', 'Masculino'],
                    sizes: ['PP', 'P', 'M', 'G', 'GG', 'EXG'],
                    colors: [],
                    price: {full: 130.00, sale: 130.00},
                    img: [
                        {small: '/img/moletom_canguru_front.png', large: '/img/moletom_canguru_front.png', alt: `Frente de um moletom branco com uma pequena estampa na frente com o logo da 'SA-Shrek' fundo preto com pontinhos brancos (semelhante a um céu estrelado)`},
                        {small: '/img/products/moletom_canguru_back.png', large: '/img/products/moletom_canguru_back.png', alt: `Costas de um moletom branco fundo preto com pontinhos brancos (semelhante a um céu estrelado)`}
                    ],
                    sizeTable: {img: '/img/products/size.png', alt: `Na imagem: Mokup de moletom e Tabela de Medidas. Na tabela há São 6 colunas. Na ordem: Tipo de medidas, P, M, G, GG, Tolerancia. E 3 linhas. Na ordem: Toráx, Comprimento, Comp. Manga. Na coluna P: 53, 69, 70. Na coluna M: 56, 71, 71. Na coluna GG: 62, 75, 73. Na coluna tolerancia: +-1.5, +-1.5, +-1.0. Observação em baixo da tabela: 'medidas em centímetros'.`},
                    stock: { // stock: { colors: {templates: {sizes: int} } }
                        VOID: {
                            Feminino: {PP: 5, P: 5, M: 5, G: 5, GG: 5, EXG: 0},
                            Masculino: {PP: 5, P: 5, M: 5, G: 5, GG: 5, EXG: 5}
                        }
                    },
                    id: 'P1'
                },
                {
                    name: 'Moletom Crewneck Shrek',
                    visibility: true,
                    category: 'Moletons',
                    description: {ul: [], ol: [], txt: ``},
                    templates: [],
                    sizes: [],
                    colors: [],
                    price: {full: 80.00, sale: 80.00},
                    img: [{small: '/img/moletom_canguru_front.png', large: '/img/moletom_canguru_front.png', alt: ''}],
                    sizeTable: {img: '', alt: ''},
                    stock: 0,
                    id: 'P2'
                },
                {
                    name: 'Corta-Vento Shrek',
                    visibility: true,
                    category: 'Moletons',
                    description: {ul: [], ol: [], txt: ``},
                    templates: [],
                    sizes: [],
                    colors: [],
                    price: {full: 99.00, sale: 99.00},
                    img: [{small: '/img/moletom_canguru_front.png', large: '/img/moletom_canguru_front.png', alt: ''}],
                    sizeTable: {img: '', alt: ''},
                    stock: 0,
                    id: 'P3'
                },
                {
                    name: 'Samba-Canção TUSCA',
                    visibility: true,
                    category: 'Kit TUSCA',
                    description: {ul: [], ol: [], txt: ``},
                    templates: [],
                    sizes: [],
                    colors: [],
                    price: {full: 30.00, sale: 30.00},
                    img: [{small: '/img/moletom_canguru_front.png', large: '/img/moletom_canguru_front.png', alt: ''}],
                    sizeTable: {img: '', alt: ''},
                    stock: 0,
                    id: 'P4'
                },
                {
                    name: 'Caneca TUSCA',
                    visibility: true,
                    category: 'Kit TUSCA',
                    description: {ul: [], ol: [], txt: ``},
                    templates: [],
                    sizes: [],
                    colors: [],
                    price: {full: 15.00, sale: 15.00},
                    img: [{small: '/img/moletom_canguru_front.png', large: '/img/moletom_canguru_front.png', alt: ''}],
                    sizeTable: {img: '', alt: ''},
                    stock: 0,
                    id: 'P5'
                },
                {
                    name: 'Camiseta TUSCA',
                    visibility: true,
                    category: 'Kit TUSCA',
                    description: {ul: [], ol: [], txt: ``},
                    templates: [],
                    sizes: [],
                    colors: [],
                    price: {full: 30.00, sale: 30.00},
                    img: [{small: '/img/moletom_canguru_front.png', large: '/img/moletom_canguru_front.png', alt: ''}],
                    sizeTable: {img: '', alt: ''},
                    stock: 0,
                    id: 'P6'
                },
                {
                    name: 'Camiseta de Bixo 2049',
                    visibility: true,
                    category: 'Kit Bixo',
                    description: {ul: [], ol: [], txt: ``},
                    templates: [],
                    sizes: [],
                    colors: [],
                    price: {full: 30.00, sale: 30.00},
                    img: [{small: '/img/moletom_canguru_front.png', large: '/img/moletom_canguru_front.png', alt: ''}],
                    sizeTable: {img: '', alt: ''},
                    stock: 0,
                    id: 'P7'
                },
                {
                    name: 'Caneca de Bixo 2049',
                    visibility: true,
                    category: 'Kit Bixo',
                    description: {ul: [], ol: [], txt: ``},
                    templates: [],
                    sizes: [],
                    colors: [],
                    price: {full: 15.00, sale: 15.00},
                    img: [{small: '/img/moletom_canguru_front.png', large: '/img/moletom_canguru_front.png', alt: ''}],
                    sizeTable: {img: '', alt: ''},
                    stock: 0,
                    id: 'P8'
                }
        
            ],
        
            events: [
                {
                    name: 'Cervejada: "Sinta o pântano!"',
                    visibility: true,
                    category: 'Cervejada',
                    description: {ul: [], ol: [], txt: `A nossa tradicional cervejada do início do ano já chegou! Ela ocorerrá dia 20/03 a partir das 15h! Com muita música boa, com espaço de sobra pra você dançar e é claro muita lama! Você não vai ficar de fora dessa né? Não pastela!!! Corre pra garantir seu ingresso!`},
                    info: {location: 'Lorem Ipsum', date: 'dd/mm/yyyy', time: '00h00', link: {text: 'Link para o facebook', url: 'https://facebook.com/'}},
                    price: {full: 50.00, sale: 40.00},
                    img: [{small: '/img/cervejada.png', large: '/img/cervejada.png', alt: ''}],
                    stock: 10,
                    id: 'E1'
                },
                {
                    name: 'Minicurso',
                    visibility: true,
                    category: 'Minicursos',
                    description: {ul: [], ol: [], txt: ``},
                    info: {location: '', date: '', time: '', link: {text: '', url: ''}},
                    price: {full: 20.00, sale: 20.00},
                    img: [{small: '/img/cervejada.png', large: '/img/cervejada.png', alt: ''}],
                    stock: 0,
                    id: 'E2'
                },
                {
                    name: 'Viagem técnica',
                    visibility: true,
                    category: 'Viagem técnica',
                    description: {ul: [], ol: [], txt: ``},
                    info: {location: '', date: '', time: '', link: {text: '', url: ''}},
                    price: {full: 35.00, sale: 35.00},
                    img: [{small: '/img/cervejada.png', large: '/img/cervejada.png', alt: ''}],
                    stock: 0,
                    id: 'E3'
                },
                {
                    name: 'Roda de conversa',
                    visibility: true,
                    category: 'Roda de conversa',
                    description: {ul: [], ol: [], txt: ``},
                    info: {location: '', date: '', time: '', link: {text: '', url: ''}},
                    price: {full: 15.00, sale: 15.00},
                    img: [{small: '/img/cervejada.png', large: '/img/cervejada.png', alt: ''}],
                    stock: 0,
                    id: 'E4'
                }
            ]
        },

        cart: [
            {
                sku: 'PR-P1-VOID-MASC-M', // PRroducts?EVents-ID-color's first 4 letters-MASC?FEMI-SIZE
                quantity: 2,
                specs: {color: '', template: 'Masculino', size: 'M'}
            },
            {
                sku: 'EV-E1',
                quantity: 1,
                specs: {color: '', template: '', size: ''}
            }
        ],

        account: {
            isLogged: false,
            accountType: '',
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
                discount: 25
            }
        ]
    }

    addToCart(sku, quantity, specs){
        console.log('entrou')
        if(quantity < 1){ return false }

        const [type, id] = sku.split('-')

        const product = (type === 'PR')
            ? this.state.data.products.find(item => item.id === id)
            : this.state.data.events.find(item => item.id === id)

        let {cart} = this.state

        // Gets current item's stock accordingly to the
        // inputs selected (color, template, size)
        let stock = product.stock
        if(typeof(stock) === 'object'){
            stock = product.colors.isEmpty() ? stock['VOID'] : (specs.color ? stock[specs.color] : 0)
            
            if(typeof(stock) === 'object'){
                stock = product.templates.isEmpty() ? stock['VOID'] : (specs.template ? stock[specs.template] : 0)
                
                if(typeof(stock) === 'object'){
                    stock = product.sizes.isEmpty() ? stock['VOID'] : (specs.size ? stock[specs.size] : 0)
                }
            }
        }

        var output = true

        // If the cart already contains that item
        if(cart.some(item => item.sku === sku)){
            cart = cart.map(item => {
                if(item.sku === sku){ 
                    console.log(item.quantity, quantity, parseInt(item.quantity) + parseInt(quantity), parseInt(stock))
                    if(parseInt(item.quantity) + parseInt(quantity) <= parseInt(stock)){ item.quantity += parseInt(quantity) }
                    else{ 
                        output = false
                        item.quantity = parseInt(stock) 
                    }
                    console.log(item.quantity)
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

        return output
    }

    deleteFromCart(sku){
        this.setState(prevState => {return {cart: prevState.cart.filter(item => item.sku !== sku)}})
        return true

        // let cart = this.state.cart.map(item => item)

        // if(cart.some(item => item.sku === sku)){
        //     cart = cart.filter(item => item.sku !== sku)

        //     this.setState({cart: cart})
        // }
    }

    addToCart = this.addToCart.bind(this)
    removeFromCart = this.removeFromCart.bind(this)
    deleteFromCart = this.deleteFromCart.bind(this)

    render(){
        const {data, cart, account, coupons} = this.state
        const {addToCart, removeFromCart, deleteFromCart} = this

        return(
            <DataContext.Provider value={{data, cart, account, coupons, addToCart, removeFromCart, deleteFromCart}}>
                {this.props.children}
            </DataContext.Provider>
        )
    }
}