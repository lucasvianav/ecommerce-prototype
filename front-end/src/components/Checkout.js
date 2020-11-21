import React from 'react'

import Header from './CheckoutHeader'
import Login from './Login'
import CheckoutPayment from './CheckoutPayment'
import { CheckoutContext } from './CheckoutContext'
import CheckoutConfirmation from './CheckoutConfirmation'
import { DataContext } from '../Context'

class Checkout extends React.Component {
    static contextType = CheckoutContext

    render(){
        return(
            <CheckoutContext.Consumer>
                { checkout => (
                    <div>
                        <Header/>
                        { this.context.currentStep === 'login' ? <Login/> : '' }
                        { this.context.currentStep === 'payment' ? <CheckoutPayment/> : ''}
                        { this.context.currentStep === 'confirmation' ? <CheckoutConfirmation checkout={{...checkout}}/> : ''}
                    </div>
                )}
            </CheckoutContext.Consumer>
        )
    }
}

export default Checkout