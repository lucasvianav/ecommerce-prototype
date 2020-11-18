import React from 'react'
import {Link} from 'react-router-dom'

class Accessibility extends React.Component {
    render(){
        return(
            <main className="Accessibility">
                <div className="panel-title">Acessibilidade</div>

                <div className="tabs-history disable-selection">
                    <Link to='/' className='past-tab'><span>Início</span></Link>
                    <span className="current-tab">Acessibilidade</span>
                </div>

                <div className="content-box">
                    <h3>Ajuste no tamanho do texto (e da tela como um todo)</h3>
                    <p>Para aumentar ou diminuir o tamanho do text no site, pressione no seu teclado simultaneamente as teclas <strong><em>CTRL</em></strong> + <strong><em>+</em></strong> ou <strong><em>CTRL</em></strong> + <strong><em>-</em></strong>, respectivamente.</p>

                    <br/>

                    <h3>Modo de contraste</h3>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam et arcu velit. Duis gravida erat vel enim dapibus aliquet. Cras ornare vitae purus sit amet imperdiet. Nam ullamcorper euismod semper.</p>
                </div>
            </main>
        )
    }
}

export default Accessibility