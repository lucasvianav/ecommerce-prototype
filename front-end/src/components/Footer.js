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
                    <li><a target='_blank' rel='noopener noreferrer' href="/" className="link"><p>Site institucional</p></a></li>
                </ul>
                
                <p id="divisor" className='disable-selection'>|</p>

                <ul id="social-media">
                    <li><a target='_blank' rel='noopener noreferrer' href="/" title='Instagram' className="link"><i className="fab fa-instagram fa-2x"></i></a></li>
                    <li><a target='_blank' rel='noopener noreferrer' href="/" title='Facebook' className="link"><i className="fab fa-facebook fa-2x"></i></a></li>
                    <li><a target='_blank' rel='noopener noreferrer' href="/" title='LinkedIn' className="link"><i className="fab fa-linkedin-in fa-2x"></i></a></li>
                    <li><a target='_blank' rel='noopener noreferrer' href="/" title='WhatsApp' className="link"><i className="fa fa-whatsapp fa-2x"></i></a></li>
                    <li><a target='_blank' rel='noopener noreferrer' href="/" title='Email' className="link"><i className="fa fa-envelope fa-2x"></i></a></li>
                </ul>
            </div>

            <hr className ="end"/>
            <p id="credits">© 2020 SA-SHREK. Todos os direitos reservados. Tema desenvolvido por 
                <a target='_blank' rel='noopener noreferrer' title='GitHub' href="https://github.com/LucaSant">Avião</a>, 
                <a target='_blank' rel='noopener noreferrer' title='GitHub' href="https://github.com/lucasvianav">Flip</a>, 
                <a target='_blank' rel='noopener noreferrer' title='GitHub' href="https://github.com/rafabull">Rafaela</a>, 
                <a target='_blank' rel='noopener noreferrer' title='GitHub' href="https://github.com/julianabfreitas">Phineas</a> e 
                <a target='_blank' rel='noopener noreferrer' title='GitHub' href="https://github.com/bdiasr">Bia</a>.
            </p>
        </footer>
    )
}

export default Footer