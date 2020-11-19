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
                    <p>Existem atalhos bem útei no teclado para controlar o zoom do site. Considerando que aumentar o zoom, aumenta o tamanho do texto e do site como um todo, temos que as teclas a serem pressionadas simultaneamente são:</p>
                    <ul>
                        <li><span><strong><em>Ctrl</em></strong> e <strong><em>+</em></strong>, para aumentar o zoom do site.</span></li>
                        <li><span><strong><em>Ctrl</em></strong> e <strong><em>-</em></strong>, para diminuir o zoom do site.</span></li>
                        <li><span><strong><em>Ctrl</em></strong> e <strong><em>0</em></strong>, para resetar o zoom do site para o padrão.</span></li>
                    </ul>

                    <br/>

                    <h3>Modo de contraste</h3>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam et arcu velit. Duis gravida erat vel enim dapibus aliquet. Cras ornare vitae purus sit amet imperdiet. Nam ullamcorper euismod semper.</p>
                </div>
            </main>
        )
    }
}

export default Accessibility