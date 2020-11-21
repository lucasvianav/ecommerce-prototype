import React from 'react'
import $ from 'jquery'
import { DataProvider } from '../Context'

export const CheckoutContext = React.createContext()

export class CheckoutProvider extends React.Component {
    static contextType = DataProvider

    constructor(props, context){
        super(props, context)
        console.log(this.context)

        this.state = {
            currentStep: 'payment',
            payment: ''
        }

        this.handleChange = this.handleChange.bind(this)
        this.setPayment = this.setPayment.bind(this)
    }

    handleChange(e){
        const {target: option} = e
        this.setState({[option.name]: option.value})
        $('.CheckoutPayment .error-message').text('')
    }

    setPayment(e){
        const {currentStep, payment} = this.state

        if(currentStep === 'payment' && payment !== ''){ 
            this.setState({currentStep: 'confirmation'}) 
            $('.CheckoutPayment .error-message').text('')
        }

        else{ 
            $('.CheckoutPayment .error-message').text('É necessário selecionar uma forma de pagamento.') 
        }
    }

    render(){
        const {payment, currentStep} = this.state
        const {handleChange, setPayment} = this

        return(
            <CheckoutContext.Provider value={{payment, currentStep, handleChange, setPayment}}>
                {this.props.children}
            </CheckoutContext.Provider>
        )
    }
}