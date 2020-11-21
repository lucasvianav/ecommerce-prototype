import React from 'react'
import $ from 'jquery'

import './css/CheckoutHeader.css'
import { Link } from 'react-router-dom'
import ThemeToggler from './ThemeToggler'
import { CheckoutContext } from './CheckoutContext'

class CheckoutHeader extends React.Component {
    static contextType = CheckoutContext

    componentDidMount(){
        const steps = $('.steps-panel li')

        for(const step of steps){
            if($(step).hasClass('current')){ break }

            else{ $(step).addClass('past') }
        }
    }

    componentDidUpdate(){
        const steps = $('.steps-panel li').removeClass('past')

        for(const step of steps){
            if($(step).hasClass('current')){ break }

            else{ $(step).addClass('past') }
        }
    }

    render(){
        return(
            <nav className="CheckoutHeader">
                <div className="logo">
                    <Link to="/"><img src={process.env.PUBLIC_URL + "/img/logo.png"} alt="Logo da SA-SHREK"/></Link>
                </div>

                <ol className='steps-panel disable-selection'>
                    <li className={this.context.currentStep === 'cart' ? 'current' : ''}>
                        <span><i className="fa fa-shopping-cart"></i></span>
                        <span>Carrinho</span>
                    </li>
                    <li className={this.context.currentStep === 'login' ? 'current' : ''}>
                        <span><i className="fa fa-id-badge"></i></span>
                        <span>Login</span>
                    </li>
                    <li className={this.context.currentStep === 'payment' ? 'current' : ''}>
                        <span><i className="fa fa-credit-card"></i></span>
                        <span>Pagamento</span>
                    </li>
                    <li className={['confirmation', 'finished'].includes(this.context.currentStep) ? 'current' : ''}>
                        <span><i className="fa fa-check"></i></span>
                        <span>Conclusão</span>
                    </li>
                </ol>

                <div className='toggler'>
                    <ThemeToggler/>
                </div>
            </nav>
        )
    }
}

export default CheckoutHeader