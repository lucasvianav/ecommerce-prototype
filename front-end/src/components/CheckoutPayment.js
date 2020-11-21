import React from 'react'

import './css/Checkout.css'
import './css/CheckoutPayment.css'
import { CheckoutContext } from './CheckoutContext'

class CheckoutPayment extends React.Component {
    static contextType = CheckoutContext

    render(){
        return(
            <main className='CheckoutPayment'>
                <div className="content-box">
                    <span className='section-title'>Escolha uma forma de pagamento</span>

                    <section className='content-section options'>
                        <div className='option'>
                            <input type='radio' name='payment' id='deposit' value='deposit' onChange={this.context.handleChange} checked={this.context.payment === 'deposit'} required/>
                            <label htmlFor='deposit'><i className="fas fa-university"></i><span>Transferência/depósito bancário</span></label>
                        </div>

                        <div className='option'>
                            <input type='radio' name='payment' id='picpay' value='picpay' onChange={this.context.handleChange} checked={this.context.payment === 'picpay'} required/>
                            <label htmlFor='picpay'><i className="fas fa-mobile-alt"></i><span>Transferência por PicPay</span></label>
                        </div>
                        <span className='error-message'></span>
                    </section>

                    <p>Independentemente do meio de pagamento escolhido, a sua compra só será validada mediante recebimento do comprovante de pagamento.</p>
                    <p>Enviar comprovante para: sa-shrek@usp.br.</p>

                    <button type='submit' className='void-btn big-btn' onClick={this.context.setPayment}>Continuar</button>
                </div>
            </main>
        )
    }
}

export default CheckoutPayment