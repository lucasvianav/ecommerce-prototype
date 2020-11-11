import React from 'react'
import $ from 'jquery'
import {Link} from 'react-router-dom'

import './css/Navbar.css'
import { DataContext } from '../Context'

function handleNavbarDropdown(e){
    let dropdownMenu = $(e.target.parentElement).hasClass('dropdown') ? $(e.target.parentElement) : $('.dropdown', e.target.parentElement)

    if(e.type === 'mouseenter'){
        // Sets divisor padding
        $('.divisor'.dropdownMenu).css('padding', dropdownMenu.css('width'))

        dropdownMenu.show()

        // Menu's full height
        let previousHeight = $('ul', dropdownMenu).css('height')

        // Animates from height 0 to full height
        $('ul', dropdownMenu).css('height', '0')
        $('ul', dropdownMenu).animate({ height: previousHeight }, 150)
    }
    
    else if(e.type === 'mouseleave'){
        // Animates from full height to height 0
        $('ul', dropdownMenu).animate(
            { height: '0'}, 
            100, 
            function(){ 
                // Hides the menu
                dropdownMenu.hide() 

                // And sets it's height to automatic
                $('ul', dropdownMenu).css('height', 'auto')
            }
        )
    }
}

class Navbar extends React.Component {
    static contextType = DataContext

    constructor(props, context){
        super(props, context)

        const {data} = this.context

        this.products = data.filter(value => value.visibility && value.type === 'PR').map(item => item.category).filter((value, index, self) => (self.indexOf(value) === index)).map(item => item.title())
        this.events = data.filter(value => value.visibility && value.type === 'EV').map(item => item.category).filter((value, index, self) => (self.indexOf(value) === index)).map(item => item.title())
    }

    componentDidMount(){
        $(function(){
            $('#products-button').on('mouseenter mouseleave', handleNavbarDropdown)
            $('#events-button').on('mouseenter mouseleave', handleNavbarDropdown)
        })
    }
    
    componentWillUnmount(){
        $('#products-button').off('mouseenter mouseleave', handleNavbarDropdown)
        $('#events-button').off('mouseenter mouseleave', handleNavbarDropdown)
    }

    render(){
        return(
            <nav id="navbar">
                <div id="logo">
                    <Link to="/"><img src={process.env.PUBLIC_URL + "/img/logo.png"} alt="Logo da SA-SHREK"/></Link>
                </div>

                <ul id="central-buttons">
                    <li><Link to="/">Início</Link></li>
                    <li id="products-button">
                        <Link to="/produtos">Produtos</Link>
                        {
                            this.products.isEmpty() ? '' :
                            <div className="dropdown" style={{display: 'none'}}>
                                <span className="divisor"></span>
                                <ul>
                                    { this.products.map((item, index) => <li key={item + index.toString()}><Link to={'/produtos/' + item.toLowerCase().replaceAll(' ', '-')}>{item}</Link></li>) }
                                </ul>
                            </div>
                        }
                    </li>

                    <li id="events-button">
                        <Link to="/eventos">Eventos</Link>
                        {
                            this.events.isEmpty() ? '' :
                            <div className="dropdown" style={{display: 'none'}}>
                                <span className="divisor"></span>
                                <ul>
                                    { this.events.map((item, index) => <li key={item + index.toString()}><Link to={'/eventos/' + item.toLowerCase().replaceAll(' ', '-')}>{item}</Link></li>) }
                                </ul>
                            </div>
                        }
                    </li>
                </ul>
            
                <ul id="right-buttons">
                    <li><button type="button"><i className="fas fa-search"></i></button></li>
                    <li><Link to="/carrinho"><i className="fas fa-shopping-cart"></i></Link></li>
                    <li><Link to="./login">Login</Link></li>
                </ul>
            </nav>
        )
    }
}

export default Navbar