import React from 'react'
import $ from 'jquery'

export const CheckoutContext = React.createContext()

export class CheckoutProvider extends React.Component {
    constructor(props){
        super(props)

        this.state = {
            currentStep: '',
            payment: '',
            _id: ''
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

    changePayment(){ this.setState({currentStep: 'payment', payment: ''}) }

    orderPlaced(_id){ this.setState({currentStep: 'finished', _id}) }

    render(){
        const {payment, currentStep, _id} = this.state
        const {handleChange, setPayment, changePayment, orderPlaced, checkLogin} = this

        return(
            <CheckoutContext.Provider value={{payment, currentStep, _id, handleChange, setPayment, changePayment, orderPlaced, checkLogin}}>
                {this.props.children}
            </CheckoutContext.Provider>
        )
    }
}