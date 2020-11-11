import React from 'react'

import './css/Footer.css'

const Footer = () => {
    return(
        <footer id="footer">
            <div id="footer-info">
                <ul id="help">
                    <li><p>Política de devolução</p></li>
                    <li><p>Entregas</p></li>
                    <li><p>Site institucional</p></li>
                </ul>
                
                <p id="divisor">|</p>

                <ul id="social-media">
                    <li><i className="fab fa-instagram fa-2x"></i></li>
                    <li><i className="fab fa-facebook fa-2x"></i></li>
                    <li><i className="fab fa-linkedin-in fa-2x"></i></li>
                    <li><i className="fa fa-whatsapp fa-2x"></i></li>
                    <li><i className="fa fa-envelope fa-2x"></i></li>
                </ul>
            </div>

            <hr className ="end"/>
            <p id="credits">© 2020 SA-SHREK. Todos os direitos reservados. Tema desenvolvido por Avião, Flip, Rafaela, Phineas e Bia.</p>
        </footer>
    )
}

export default Footer