import React from 'react'
import $ from 'jquery'

import './css/ShoppingCart.css'
import { DataContext } from '../Context'
import { Link } from 'react-router-dom'
import { Spinner } from 'react-bootstrap'
import { Async } from 'react-async'

class ShoppingCart extends React.Component {
    static contextType = DataContext

    constructor(props, context){
        super(props, context)

        const {cart, data} = this.context
        
        let cartList = []
        for(let item of cart){
            let [type, _id] = item.sku.split('-')
            let product = data.find(el => el._id)

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

        this.state = {
            cart: cartList,
            subtotal: subtotal,
            coupon: '',
            hasCoupon: this.context.activeCoupon.status,
            total: subtotal - this.context.activeCoupon.discount
        }

        this.handleChange = this.handleChange.bind(this)
        this.handleCoupon = this.handleCoupon.bind(this)
        this.update = this.update.bind(this)
        this.refresh = this.refresh.bind(this)
    }

    componentDidUpdate(){
        if(this.context.activeCoupon.status !== this.state.hasCoupon){
            this.setState({hasCoupon: this.context.activeCoupon.status})
        }
    }

    async refresh(){
        await this.context.refreshCart(this.update)
    }

    update(){
        const {cart, data} = this.context

        let cartList = []
        for(let item of cart){
            let [type, _id] = item.sku.split('-')
            let product = data.find(el => el._id === _id)

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

        this.context.clearCoupon()

        this.setState(prevState => ({
               cart: cartList,
               subtotal: subtotal,
               coupon: prevState.coupon,
               total: subtotal
        }))
    }

    async handleChange(e, sku, quantity, specs){
        if(e.type === 'change' && e.target.name === 'coupon'){
            this.setState({coupon: e.target.value})
        }
        
        else{
            (e.target.name === 'remove') 
                ? await this.context.removeFromCart(sku, this.update) 
                : await this.context.editCart(sku, quantity, specs, this.update)
        }
        
        return
    }

    handleCoupon(){
        if(!this.state.cart.isEmpty()){
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
    }

    render(){
        return(
            <main className="ShoppingCart">
                <div className="content-box">
                    <span className="section-title">Carrinho de compras</span>

                    <Async promiseFn={this.refresh}>
                    {({ response, error, isPending }) => {
                        return (isPending)
                        ?
                            <Spinner animation="border" role="status" variant={this.context.darkTheme ? 'light' : 'dark'} style={
                                {'margin': 'auto', display: 'flex', justifyContent: 'center', alignItems: 'center'}
                            }>
                                <span className="sr-only">Carregando...</span>
                            </Spinner>
                        :
                            <>
                                <section className="products-panel">
                                    {
                                        this.state.cart.isEmpty() ? <span className='empty grey'>Seu carrinho está vazio.</span> :
                                        <ul className="header-row grey">
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
                                                        <Link to={(item.type === 'PR' ? '/produtos/' : '/eventos/') + item._id} className='link'><img src={item.cover.img} alt={item.cover.alt}/></Link>

                                                        <div className='product-title disable-selection'>
                                                        <Link to={(item.type === 'PR' ? '/produtos/' : '/eventos/') + item._id } title={item.name}><span className='name'>{item.name}</span></Link>

                                                            <div className='info grey' title={(!item.specs.color ? '' : item.specs.color + ' - ') + (!item.specs.template ? '' : item.specs.template + ' - ') + (!item.specs.size ? '' : item.specs.size)}>
                                                                {!item.specs.color ? '' : <span>{item.specs.color} - </span>}
                                                                {!item.specs.template ? '' : <span>{item.specs.template} - </span>}
                                                                {!item.specs.size ? '' : <span>{item.specs.size}</span>}
                                                            </div>
                                                        </div>

                                                        <div className="quantity">
                                                            <div className='controls'>
                                                                <button onClick={(e) => this.handleChange(e, item.sku, -1, item.specs)} name='decrease' type="button"><span><i className="fa fa-minus" aria-hidden="true"></i></span></button>
                                                                <input type="number" className='disable-selection' name={'qty_' + item.sku} value={this.state.cart.find(el => el.sku === item.sku).quantity} min="1" readOnly/> 
                                                                <button onClick={(e) => this.handleChange(e, item.sku, +1, item.specs)} name='increase' type="button"><span><i className="fa fa-plus" aria-hidden="true"></i></span></button>
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
                                                <p>- R${this.context.activeCoupon.discount.toFixed(2).replaceAll('.',',')}</p>
                                            </div>
                                        }

                                        <div className="row total green">
                                            <p>Total:</p>
                                            <p>R${this.state.total.toFixed(2).replaceAll('.',',')}</p>
                                        </div>

                                        <button className="big-btn full-btn" onClick={() => this.props.history.push('/checkout')}>Continuar</button>
                                    </div>

                                    <div className="coupon row">
                                        <input onChange={this.handleChange} id='coupon' name="coupon" value={this.state.coupon} type="text" minLength='1' placeholder="Inserir cupom"/>  
                                        <button onClick={this.handleCoupon} type='button' className="small-btn void-btn">OK</button>
                                    </div>
                                </div>
                                <span className='clear'></span>
                        </>
                    }}
                    </Async>
                </div>
            </main>
        )
    }
}

export default ShoppingCart