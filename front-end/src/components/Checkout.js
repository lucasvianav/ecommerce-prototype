import React from 'react'

import Header from './CheckoutHeader'
import Login from './Login'
import CheckoutPayment from './CheckoutPayment'
import { CheckoutContext } from './CheckoutContext'
import CheckoutConfirmation from './CheckoutConfirmation'

class Checkout extends React.Component {
    static contextType = CheckoutContext

    render(){
        return(
            this.context.isEmpty ? '' :
            <div>
                <Header/>
                { this.context.currentStep === 'login' ? <Login/> : '' }
                { this.context.currentStep === 'payment' ? <CheckoutPayment/> : ''}
                { this.context.currentStep === 'confirmation' ? <CheckoutConfirmation/> : ''}
            </div>
        )
    }
}

export default Checkout