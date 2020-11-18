import React from 'react'
import {Link} from 'react-router-dom'

import './css/Footer.css'

const Footer = () => {
    return(
        <footer id="footer">
            <div id="footer-info">
                <ul id="help">
                    <li><Link to="/acessibilidade" className="link"><p>Acessibilidade</p></Link></li>
                    <li><Link to="" className="link"><p>Política de devolução</p></Link></li>
                    <li><Link to="" className="link"><p>Entregas</p></Link></li>
                    <li><a href="" className="link"><p>Site institucional</p></a></li>
                </ul>
                
                <p id="divisor">|</p>

                <ul id="social-media">
                    <li><a href="" className="link"><i className="fab fa-instagram fa-2x"></i></a></li>
                    <li><a href="" className="link"><i className="fab fa-facebook fa-2x"></i></a></li>
                    <li><a href="" className="link"><i className="fab fa-linkedin-in fa-2x"></i></a></li>
                    <li><a href="" className="link"><i className="fa fa-whatsapp fa-2x"></i></a></li>
                    <li><a href="" className="link"><i className="fa fa-envelope fa-2x"></i></a></li>
                </ul>
            </div>

            <hr className ="end"/>
            <p id="credits">© 2020 SA-SHREK. Todos os direitos reservados. Tema desenvolvido por <a href="">Avião</a>, <a href="">Flip</a>, <a href="">Rafaela</a>, <a href="">Phineas</a> e <a href="">Bia</a>.</p>
        </footer>
    )
}

export default Footer