import React from 'react'
import $ from 'jquery'

import './ShoppingCart.css'
import { DataContext } from '../Context'
import { Link } from 'react-router-dom'

class ShoppingCart extends React.Component {
    static contextType = DataContext

    constructor(props, context){
        super(props, context)

        const {cart, data} = this.context
        
        let cartList = []
        for(let item of cart){
            let sku = item.sku.split('-')
            let product = sku[0] === 'PR' 
                ? data.products.find(el => el.id === sku[1])
                : data.events.find(el => el.id === sku[1])

            cartList.push({
                name: product.name,
                id: sku[1],
                type: sku[0],
                sku: item.sku,
                cover: {img: product.img[0].small, alt: product.img[0].alt},
                specs: item.specs,
                quantity: item.quantity,
                price: product.price.sale,
            })
        }

        const subtotal = cartList.reduce((acc, item) => acc + (item.price * item.quantity), 0)

        this.state = {
            cart: cartList,
            subtotal: subtotal,
            coupon: '',
            hasCoupon: false,
            activateCoupon: '',
            discount: 0,
            total: subtotal
        }

        this.handleChange = this.handleChange.bind(this)
        this.handleCoupon = this.handleCoupon.bind(this)
    }

    handleChange(e, sku, quantity, specs){
        if(e.type === 'change' && e.target.name === 'coupon'){
            this.setState({coupon: e.target.value})
            return
        }

        const filter = (e.target.name === 'remove' && this.context.deleteFromCart(sku))
            ? item => item.sku !== sku
            : (quantity > 0 && this.context.addToCart(sku, quantity, specs))
                ? item => { if(item.sku === sku){ item.quantity += quantity }; return item }
                : (quantity < 0 && this.context.removeFromCart(sku, Math.abs(quantity)))
                    ? item => { if(item.sku === sku){ item.quantity -= Math.abs(quantity) }; return item }
                    : false

        if(filter){
            console.log(filter)

            this.setState(prevState => {
               const newCart = prevState.cart.filter(filter)
               const subtotal = newCart.reduce((acc, item) => acc + (item.price * item.quantity), 0)

               console.log(newCart, subtotal)

               return {
                   cart: newCart,
                   subtotal: subtotal,
                   hasCoupon: false,
                   activatedCoupon: '',
                   total: subtotal
               }
            })   
        }
    }

    handleCoupon(){
        const coupon = this.context.coupons.find(item => item.str === this.state.coupon)

        let field = $('#coupon')

        if(coupon){
            const discount = (coupon.type === 'percentage') ? parseFloat(this.state.subtotal) * parseFloat(coupon.discount)/100 : parseFloat(coupon.discount)

            this.setState(prevState => {
                return {
                hasCoupon: true,
                coupon: '',
                activateCoupon: coupon,
                total: prevState.subtotal - discount,
                discount: discount
            }})

            field.css('border', '1px solid #cddbef')
        }

        else{
            field.css('border', '1px solid red')
        }
    }

    render(){
        return(
            <main className="ShoppingCart">
                <div className="content-box">
                    <span className="section-title">Carrinho de compras</span>

                    <section className="products-panel">
                        {
                            this.state.cart.isEmpty() ? <span className='empty grey'>Seu carrinho está vazio.</span> :
                            <ul className="header-row">
                                <li className='invisible'>Imagem</li>
                                <li className='name'>Produto</li>
                                <li className="quantity">Quantidade</li>
                                <li className='price'>Valor</li>
                            </ul>
                        }

                        {
                            this.state.cart.isEmpty() ? '' :
                            <div className="product-list">
                                {
                                    this.state.cart.map(item =>
                                        <section className='product-card' key={item.sku}>
                                            <Link to={(item.type === 'PR' ? '/produtos/' : '/eventos/') + item.id} className='link'><img src={item.cover.img} alt={item.cover.alt}/></Link>

                                            <div className='product-title'>
                                            <Link to={(item.type === 'PR' ? '/produtos/' : '/eventos/') + item.id }><span className='name'>{item.name}</span></Link>

                                                <div className='info grey'>
                                                    {!item.specs.color ? '' : <span>{item.specs.color} - </span>}
                                                    {!item.specs.template ? '' : <span>{item.specs.template} - </span>}
                                                    {!item.specs.size ? '' : <span>{item.specs.size}</span>}
                                                </div>
                                            </div>

                                            <div className="quantity">
                                                <div className='controls'>
                                                    <button onClick={(e) => this.handleChange(e, item.sku, -1)} name='decrease' type="button"><i className="fa fa-minus" aria-hidden="true"></i></button>
                                                    <input type="number" className='disable-selection' name={'qty_' + item.sku} value={this.state.cart.find(el => el.sku === item.sku).quantity} min="1" readOnly/> 
                                                    <button onClick={(e) => this.handleChange(e, item.sku, +1, item.specs)} name='increase' type="button"><i className="fa fa-plus" aria-hidden="true"></i></button>
                                                </div>
                                                
                                                <span className='break-flex'></span>
                                                <button className="text-btn grey remove disable-selection" name='remove' onClick={(e) => this.handleChange(e, item.sku)}>Excluir item</button>
                                            </div>

                                            <span className='price'>R${(item.price * item.quantity).toFixed(2).replaceAll('.',',')}</span>
                                        </section>
                                    )
                                }
                            </div>
                        }
                    </section>

                    <div className="order-summary">
                        <div className='info'>
                            <h3>Resumo da compra</h3>

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
                                <p>Total:</p>
                                <p>R${this.state.total.toFixed(2).replaceAll('.',',')}</p>
                            </div>

                            <button className="big-btn full-btn">Continuar</button>
                        </div>

                        <div className="coupon row">
                            <input onChange={this.handleChange} id='coupon' name="coupon" value={this.state.coupon} type="text" minLength='1' placeholder="Inserir cupom"/>  
                            <button onClick={this.handleCoupon} type='button' className="small-btn void-btn">OK</button>
                        </div>
                    </div>

                    <span className='clear'></span>
                </div>
            </main>
        )
    }
}

export default ShoppingCart