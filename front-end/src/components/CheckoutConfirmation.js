import React from 'react'
import $ from 'jquery'

import './css/Checkout.css'
import './css/CheckoutConfirmation.css'

import { DataContext } from '../Context'

class CheckoutConfirmation extends React.Component {
    static contextType = DataContext
    
    constructor(props, context){
        super(props, context)

        const {cart, data, activeCoupon} = this.context
        const {checkout} = this.props
        
        let cartList = []
        for(let item of cart){
            let sku = item.sku.split('-')
            let product = data.find(el => el.id === sku[1] && el.type === sku[0])

            cartList.push({
                name: product.name,
                type: sku[0],
                id: sku[1],
                sku: item.sku,
                cover: {img: product.img[0].small, alt: product.img[0].alt},
                specs: item.specs,
                quantity: item.quantity,
                price: product.price.sale,
            })
        }

        const subtotal = cartList.reduce((acc, item) => acc + (item.price * item.quantity), 0)

        const payment = checkout.payment === 'deposit' 
            ? 'Transferência/depósito bancário' 
            : (checkout.payment) === 'picpay'
                ? 'Transferência por PicPay'
                : ''

        const discount = activeCoupon.status 
            ? (activeCoupon.coupon.type === 'percentage') ? parseFloat(subtotal) * parseFloat(activeCoupon.coupon.discount)/100 : parseFloat(activeCoupon.coupon.discount)
            : 0

        this.state = {
            cart: cartList,
            subtotal: subtotal,
            coupon: '',
            hasCoupon: activeCoupon.status,
            discount: discount,
            total: subtotal - discount,
            payment: payment
        }

        this.handleChange = this.handleChange.bind(this)
        this.handleCoupon = this.handleCoupon.bind(this)
        this.removeCoupon = this.removeCoupon.bind(this)
        this.placeOrder = this.placeOrder.bind(this)
    }

    componentDidUpdate(){
        if(this.context.activeCoupon.status !== this.state.hasCoupon){
            this.setState({hasCoupon: this.context.activeCoupon.status})
        }
    }

    handleChange(e){
        if(e.type === 'change' && e.target.name === 'coupon'){
            this.setState({coupon: e.target.value})
            return
        }
    }

    handleCoupon(){
        const activeCoupon = this.context.activateCoupon(this.state.coupon)

        let field = $('#coupon')
        const {status: hasCoupon, coupon} = activeCoupon
        
        if(hasCoupon){
            const discount = (coupon.type === 'percentage') ? parseFloat(this.state.subtotal) * parseFloat(coupon.discount)/100 : parseFloat(coupon.discount)

            this.setState(prevState => {
                return {
                coupon: '',
                total: prevState.subtotal - discount,
                discount: discount
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

    placeOrder(){
        this.props.checkout.orderPlaced()
    }

    render(){
        return(
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

                                        <div className="quantity">
                                            <div className='controls'>
                                                <span className='disable-selection'>{this.state.cart.find(el => el.sku === item.sku).quantity}</span> 
                                            </div>
                                            
                                            <span className='break-flex'></span>
                                        </div>

                                        <span className='price'>R${(item.price * item.quantity).toFixed(2).replaceAll('.',',')}</span>
                                    </section>
                                )
                            }
                        </div>
                    </section>

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
                                    <p>- R${this.state.discount.toFixed(2).replaceAll('.',',')}</p>
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
                </div>
            </main>
        )
    }
}

export default CheckoutConfirmation