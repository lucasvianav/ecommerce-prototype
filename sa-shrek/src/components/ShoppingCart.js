import React from 'react'
import $ from 'jquery'

import './ShoppingCart.css'

class ShoppingCart extends React.Component {
    render(){
        return(
            <main className="ShoppingCart">
                <div className="content-box">
                    <span className="section-title">Carrinho de compras</span>

                    <section className="products-panel">
                        <ul className="header-row">
                            <li className='invisible'>Imagem</li>
                            <li className='name'>Produto</li>
                            <li className="quantity">Quantidade</li>
                            <li className='price'>Valor</li>
                        </ul>

                        <div className="product-list">
                            <section className='product-card'>
                                <img src="img/moletom_canguru_back.png"/>

                                <span className='name'>Moletom Canguru Shrek</span>

                                <div className="quantity">
                                    <div className='controls'>
                                        <button type="button"><i className="fa fa-minus "aria-hidden="true"></i></button>
                                        <input type="number" name="numero" value="1" className="num" id="p1" min="1"/> 
                                        <button type="button"><i className="fa fa-plus" aria-hidden="true"></i></button>
                                    </div>
                                    
                                    <span className='break-flex'></span>
                                    <button className="text-btn grey">Excluir Item</button>
                                </div>

                                <span className='price'>R$120,00</span>
                            </section>

                            <section className='product-card'>
                                <img src="img/events/ticket-cervejada.png"/>

                                <span className='name'>Cervejada: "Sinta o Pântano!"</span>

                                <div className="quantity">
                                    <div className='controls'>
                                        <button type="button"><i className="fa fa-minus "aria-hidden="true"></i></button>
                                        <input type="number" name="numero" value="1" className="num" id="p1" min="1"/> 
                                        <button type="button"><i className="fa fa-plus" aria-hidden="true"></i></button>
                                    </div>
                                    
                                    <span className='break-flex'></span>
                                    <button className="text-btn grey">Excluir Item</button>
                                </div>

                                <span className='price'>R$40,00</span>
                            </section>
                        </div>
                    </section>

                    <div className="order-summary">
                        <div className='info'>
                            <h3>Resumo da compra</h3>

                            <div className="row">
                                <p><strong>Itens:</strong></p>
                                <p>+ R$160,00</p>
                            </div>

                            <div className="row">
                                <p><strong>Cupom de desconto:</strong></p>
                                <p>- R$15,40</p>
                            </div>

                            <div className="row total green">
                                <p>Subtotal:</p>
                                <p>R$175,40</p>
                            </div>

                            <button className="big-btn full-btn">Continuar</button>
                        </div>

                        <div className="coupon row">
                            <input id='coupon' name="coupon" type="text" placeholder="Inserir cupom"/>  
                            <button className="small-btn void-btn">OK</button>
                        </div>
                    </div>

                    <span className='clear'></span>
                </div>
            </main>
        )
    }
}

export default ShoppingCart