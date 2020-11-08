import React from 'react'
import $ from 'jquery'

import './Navbar.css'

$(function(){
    $('#products-button').on('mouseenter mouseleave', handleNavbarDropdown)
    $('#events-button').on('mouseenter mouseleave', handleNavbarDropdown)
})

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
    render(){
        return(
            <nav id="navbar">
                <div id="logo">
                    <a href="" target="_self"><img src="./img/logo.png" alt="Logo da SA-SHREK"/></a>
                </div>

                <ul id="central-buttons">
                    <li><a href="./01-home.html" target="_self">Início</a></li>
                    <li id="products-button">
                        <a href="./04-products.html" target="_self">Produtos</a>
                        <div className="dropdown" style={{display: 'none'}}>
                            <span className="divisor"></span>
                            <ul>
                                <li><a href="#" target="_self">Moletons</a></li>
                                <li><a href="#" target="_self">Kit Bixo</a></li>
                                <li><a href="#" target="_self">Kit TUSCA</a></li>
                            </ul>
                        </div>
                    </li>
                    <li id="events-button">
                        <a href="./03-events.html" target="_self">Eventos</a>
                        <div className="dropdown" style={{display: 'none'}}>
                            <span className="divisor"></span>
                            <ul>
                                <li><a href="#" target="_self">Cervejada</a></li>
                                <li><a href="#" target="_self">Churrasco</a></li>
                                <li><a href="#" target="_self">Roda de Conversa</a></li>
                            </ul>
                        </div>
                    </li>
                </ul>
            
                <ul id="right-buttons">
                    <li><button type="button"><i className="fas fa-search"></i></button></li>
                    <li><a href="./09-shopping-cart.html" target="_self"><i className="fas fa-shopping-cart"></i></a></li>
                    <li><a href="./02-login.html" target="_self">Login</a></li>
                </ul>
            </nav>
        )
    }
}

export default Navbar