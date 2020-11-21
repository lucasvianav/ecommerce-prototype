import React from 'react'

import './css/Checkout.css'

import Header from './CheckoutHeader'
import Login from './Login'
import CheckoutPayment from './CheckoutPayment'
import { CheckoutContext } from './CheckoutContext'
import CheckoutConfirmation from './CheckoutConfirmation'
import TextTab from './TextTab'
import { Link } from 'react-router-dom'

class Checkout extends React.Component {
    static contextType = CheckoutContext

    render(){
        return(
            <CheckoutContext.Consumer>
                { checkout => (
                    <div className='Checkout'>
                        <Header/>
                        { this.context.currentStep === 'login' ? <Login/> : '' }
                        { this.context.currentStep === 'payment' ? <CheckoutPayment/> : ''}
                        { this.context.currentStep === 'confirmation' ? <CheckoutConfirmation checkout={{...checkout}}/> : ''}

                        { 
                            !(this.context.currentStep === 'finished') ? '' : 
                            <TextTab link={{text: 'Voltar para o início', to: '/'}}>
                                <div className='center-text'>
                                    <h1 className='green title'><i class="fa fa-check-circle"></i> Seu pedido foi realizado com sucesso!</h1>
                                    <p>Agradecemos a sua compra!</p>
                                    <p>Você receberá um email com os dados para o pagamento. Uma vez que esse seja efetuado, envie o comprovante para sa-shrek@usp.br</p>
                                    <p>Mediante a confirmação do pagamento, você receberá um email com as informações para retirar o pedido na sala da SA-SHREK.</p>
                                </div>
                            </TextTab>
                        }

                    </div>
                )}
            </CheckoutContext.Consumer>
        )
    }
}

export default Checkout