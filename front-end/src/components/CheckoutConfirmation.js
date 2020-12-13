import React from 'react'
import $ from 'jquery'

import './css/Checkout.css'
import './css/CheckoutConfirmation.css'

import { DataContext } from '../Context'
import { Async } from 'react-async'
import { Spinner } from 'react-bootstrap'

class CheckoutConfirmation extends React.Component {
    static contextType = DataContext
    
    constructor(props, context){
        super(props, context)

        const {activeCoupon} = this.context
        const {checkout} = this.props

        const payment = checkout.payment === 'deposit' 
            ? 'Transferência/depósito bancário' 
            : (checkout.payment) === 'picpay'
                ? 'Transferência por PicPay'
                : ''

        this.state = {
            cart: [],
            subtotal: 0,
            coupon: '',
            hasCoupon: activeCoupon.status,
            total: 0,
            payment: payment
        }

        this.handleChange = this.handleChange.bind(this)
        this.handleCoupon = this.handleCoupon.bind(this)
        this.removeCoupon = this.removeCoupon.bind(this)
        this.placeOrder = this.placeOrder.bind(this)
        this.update = this.update.bind(this)
        this.refresh = this.refresh.bind(this)
    }

    componentDidUpdate(){
        if(this.context.activeCoupon.status !== this.state.hasCoupon){
            this.setState({hasCoupon: this.context.activeCoupon.status})
        }
    }

    refresh(){
        this.context.refreshCart(this.update)
    }

    update(){
        const {cart, data} = this.context

        let cartList = []
        for(let item of cart){
            let [type, _id] = item.sku.split('-')
            let product = data.find(el => el._id === _id && el.type === type)

            cartList.push({
                name: product.name,
                type,
                _id,
                sku: item.sku,
                cover: {img: product.img[0].path, alt: product.img[0].alt},
                specs: item.specs,
                quantity: item.quantity,
                price: product.price.sale,
            })
        }

        const subtotal = cartList.reduce((acc, item) => acc + (item.price * item.quantity), 0)

        const activeCoupon = this.context.activeCoupon.status 
            ? this.context.redeemCoupon(this.context.activeCoupon.coupon.str, subtotal)
            : {status: false, coupon: {}, discount: 0}


        this.setState(() => ({
            cart: cartList,
            subtotal,
            coupon: '',
            total: subtotal - activeCoupon.discount
        }))
    }
    
    handleChange(e){
        if(e.type === 'change' && e.target.name === 'coupon'){
            this.setState({coupon: e.target.value})
            return
        }
    }

    handleCoupon(){
        const activeCoupon = this.context.redeemCoupon(this.state.coupon, this.state.subtotal)

        let field = $('#coupon')
        const {status: hasCoupon, discount} = activeCoupon
        
        if(hasCoupon){
            this.setState(prevState => {
                return {
                coupon: '',
                total: prevState.subtotal - discount,
            }})

            field.css('border', '1px solid #cddbef')
        }

        else{
            field.css('border', '1px solid red')
        }
    }

    removeCoupon(){
        this.context.clearCoupon()
        this.setState(prevState => ({ total: prevState.subtotal }))
    }

    async placeOrder(){
        const {total, payment} = this.state

        const newOrderId = await this.context.placeOrder(total, payment)

        if(newOrderId){ this.props.checkout.orderPlaced(newOrderId) }
    }

    render(){
        return(
            <Async promiseFn={this.refresh}>
            {({ response, error, isPending }) => {
                return isPending
                ?
                <main className='CheckoutConfirmation'>
                    <Spinner animation="border" role="status" variant={this.context.darkTheme ? 'light' : 'dark'} style={{'margin': 'auto'}}>
                        <span className="sr-only">Carregando...</span>
                    </Spinner>
                </main>
                :
                <main className='CheckoutConfirmation'>
                    <div className="content-box">
                        <span className='section-title'>Confira e finalize o pedido</span>

                        <section className='content-section order'>
                            <span className='section-title mini'>Seu pedido</span>

                            <ul className="header-row grey">
                                <li className='invisible'>Imagem</li>
                                <li className='name'>Produto</li>
                                <li className="quantity">Quantidade</li>
                                <li className='price'>Valor</li>
                            </ul>

                            <div className="product-list">
                                {
                                    this.state.cart.map(item =>
                                        <section className='product-card' key={item.sku}>
                                            <img src={item.cover.img} alt={item.cover.alt}/>

                                            <div className='product-title disable-selection'>
                                            <span className='name' title={item.name}>{item.name}</span>

                                                <div className='info grey' title={(!item.specs.color ? '' : item.specs.color + ' - ') + (!item.specs.template ? '' : item.specs.template + ' - ') + (!item.specs.size ? '' : item.specs.size)}>
                                                    {!item.specs.color ? '' : <span>{item.specs.color} - </span>}
                                                    {!item.specs.template ? '' : <span>{item.specs.template} - </span>}
                                                    {!item.specs.size ? '' : <span>{item.specs.size}</span>}
                                                </div>
                                            </div>

                                            <span className='quantity disable-selection'>{this.state.cart.find(el => el.sku === item.sku).quantity}</span> 

                                            <span className='price'>R${(item.price * item.quantity).toFixed(2).replaceAll('.',',')}</span>
                                        </section>
                                    )
                                }
                            </div>
                        </section>

                        <section className='remaining-info'>
                            <div className='summary'>
                                <section className='content-section'>
                                    <span className='section-title mini'>Resumo do pedido</span>

                                    <div className="row">
                                        <p><strong>Subtotal (produtos):</strong></p>
                                        <p>R${this.state.subtotal.toFixed(2).replaceAll('.',',')}</p>
                                    </div>

                                    {
                                        !this.state.hasCoupon ? '' :
                                        <div className="row">
                                            <p><strong>Cupom de desconto</strong> <span className='text-btn disable-selection' onClick={this.removeCoupon}>(remover)</span> <strong>:</strong></p>
                                            <p>- R${this.context.activeCoupon.discount.toFixed(2).replaceAll('.',',')}</p>
                                        </div>
                                    }

                                    <div className="row total green">
                                        <p>Total do pedido:</p>
                                        <p>R${this.state.total.toFixed(2).replaceAll('.',',')}</p>
                                    </div>

                                    <span className='description grey'>Ao realizar o pedido, você concorda com as as políticas de devolução e de entrega da SA-SHREK. Por favor, as leia para garantir que está de acordo.</span>

                                    <button type='button' className='full-btn big-btn' onClick={this.placeOrder}>Confirmar pedido</button>
                                </section>

                                
                                <div className="coupon row">
                                    <input onChange={this.handleChange} id='coupon' name="coupon" value={this.state.coupon} type="text" minLength='1' placeholder="Inserir cupom"/>  
                                    <button onClick={this.handleCoupon} type='button' className="small-btn void-btn">OK</button>
                                </div>

                            </div>

                            <section className='content-section payment'>
                                <span className='section-title mini'>Forma de pagamento</span>
                                <p>
                                    O método de pagamento escolhido foi: 
                                    {
                                        this.props.checkout.payment === 'deposit'
                                            ? <i className="fas fa-university"></i>
                                            : this.props.checkout.payment === 'picpay'
                                                ? <i className="fas fa-mobile-alt"></i>
                                                : ''
                                    }
                                    {this.state.payment}.
                                </p>

                                <span className='text-btn disable-selection green' onClick={this.props.checkout.changePayment}>(Alterar)</span>
                            </section>

                            <section className='content-section takeaway'>
                                <span className='section-title mini'>Retirada do pedido</span>
                                <p>O pedido deverá ser retirada na sala da SA-SHREK, a princípio apenas por {this.context.getCurrentAccount().name}, mediante apresentação de documento com foto.</p>
                                <p>Mais informações serão enviadas por email, que pode ser respondido caso necessário permitir a retirada por um terceiro.</p>
                            </section>
                        </section>
                    </div>
                </main>
            }}
            </Async>
        )
    }
}

export default CheckoutConfirmation