import React from 'react'
import $ from 'jquery'

import './css/Checkout.css'
import { DataContext } from '../Context'

class CheckoutConfirmation extends React.Component {
    static contextType = DataContext
    
    constructor(props, context){
        super(props, context)

        const {cart, data} = this.context
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

        this.state = {
            cart: cartList,
            subtotal: subtotal,
            coupon: '',
            hasCoupon: false,
            activateCoupon: '',
            discount: 0,
            total: subtotal,
            payment: payment
        }
    }

    render(){
        return(
            <main className='Checkout'>
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
                                    <p><strong>Cupom de desconto:</strong></p>
                                    <p>- R${this.state.discount.toFixed(2).replaceAll('.',',')}</p>
                                </div>
                            }

                            <div className="row total green">
                                <p>Total do pedido:</p>
                                <p>R${this.state.total.toFixed(2).replaceAll('.',',')}</p>
                            </div>

                            <span className='description grey'>Ao fazer o pedido, você concorda com as as políticas de devolução e de entrega da SA-SHREK. Por favor, as leia para garantir que está de acordo.</span>

                            <button type='button' className='full-btn big-btn'>Confirmar pedido</button>
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

                        <span className='text-btn green' onClick={this.props.checkout.changePayment}>(Alterar)</span>
                    </section>

                    <p>Os pedidos deverão ser retirados na sala da SA-SHREK.</p>

                </div>
            </main>
        )
    }
}

export default CheckoutConfirmation