import React from 'react'
import $ from 'jquery'
import { DataProvider } from '../Context'

export const CheckoutContext = React.createContext()

export class CheckoutProvider extends React.Component {
    static contextType = DataProvider

    constructor(props, context){
        super(props, context)

        this.state = {
            currentStep: '',
            payment: ''
        }

        this.handleChange = this.handleChange.bind(this)
        this.setPayment = this.setPayment.bind(this)
        this.changePayment = this.changePayment.bind(this)
        this.orderPlaced = this.orderPlaced.bind(this)
        this.checkLogin = this.checkLogin.bind(this)
    }

    checkLogin(status){
        this.setState({currentStep: status ? 'payment' : 'login'})
    }

    handleChange(e){
        const {target: option} = e
        this.setState({[option.name]: option.value})
        $('.CheckoutPayment .error-message').text('')
    }

    setPayment(){
        const {currentStep, payment} = this.state

        if(currentStep === 'payment' && payment !== ''){ 
            this.setState({currentStep: 'confirmation'}) 
            $('.CheckoutPayment .error-message').text('')
        }

        else{ 
            $('.CheckoutPayment .error-message').text('É necessário selecionar uma forma de pagamento.') 
        }
    }

    changePayment(){
        this.setState({currentStep: 'payment', payment: ''})
    }

    orderPlaced(){
        this.setState({currentStep: 'finished'})
    }

    render(){
        const {payment, currentStep} = this.state
        const {handleChange, setPayment, changePayment, orderPlaced, checkLogin} = this

        return(
            <CheckoutContext.Provider value={{payment, currentStep, handleChange, setPayment, changePayment, orderPlaced, checkLogin}}>
                {this.props.children}
            </CheckoutContext.Provider>
        )
    }
}