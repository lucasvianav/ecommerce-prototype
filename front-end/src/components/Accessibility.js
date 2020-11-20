import React from 'react'
import TextTab from './TextTab'

class Accessibility extends React.Component {
    render(){
        // Image panel (row)
        const panel = {
            'display': 'flex',
            'flex-flow': 'row nowrap',
            'margin': 'auto'
        }

        // Figure
        const fig = {
            'display': 'flex',
            'flex-flow': 'column nowrap',
            'justify-content': 'center',
            'align-items': 'center',
            'margin': 'auto',
        }

        return(
            <TextTab title='Acessibilidade'>
                <h3>Ajuste no tamanho do texto (e da tela como um todo)</h3>
                <p>Existem atalhos bem útei no teclado para controlar o zoom do site. Considerando que aumentar o zoom, aumenta o tamanho do texto e do site como um todo, temos que as teclas a serem pressionadas simultaneamente são:</p>
                <ul className='bullet-list'>
                    <li><span><strong><em>Ctrl</em></strong> e <strong><em>+</em></strong>, para aumentar o zoom do site.</span></li>
                    <li><span><strong><em>Ctrl</em></strong> e <strong><em>-</em></strong>, para diminuir o zoom do site.</span></li>
                    <li><span><strong><em>Ctrl</em></strong> e <strong><em>0</em></strong>, para resetar o zoom do site para o padrão.</span></li>
                </ul>

                <br/>

                <h3>Tema escuro (modo de contraste)</h3>
                <p>Para alternar os temas entre o claro e o escuro (de maior contraste), basta aperta o botão no canto superior direito da página, na barra de navegação. Segue legenda:</p>

                <div style={panel}>
                    <figure style={fig}>
                        <img style={{border: 'solid 1px grey', marginBottom: '5%'}} src={process.env.PUBLIC_URL + '/img/accessibility/light.png'} alt=''/>
                        <figcaption><span>Tema claro</span></figcaption>
                    </figure>

                    <figure style={fig}>
                        <img style={{border: 'solid 1px grey', marginBottom: '5%'}} src={process.env.PUBLIC_URL + '/img/accessibility/dark.png'} alt=''/>
                        <figcaption><span>Tema escuro</span></figcaption>
                    </figure>
                </div>
            </TextTab>
        )
    }
}

export default Accessibility