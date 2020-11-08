import React from 'react'
import $ from 'jquery'

// import './ProductsPanel.css'

const Events = () => {
    return(
        <main>
            <div className="tabs-history disable-selection">
                <a href="" className="past-tab"><span>Início</span></a>
                <a href="" className="past-tab"><span>Eventos</span></a>
                <span className="current-tab">Cervejada "Sinta o Pântano"</span>
            </div>

            <div className="content-box"> 
                <div className="product-photos">
                    <div className="thumbnail-panel">
                        <img className="product-photo-thumb active" src="img/events/ticket-cervejada.png" alt="Imagem com fundo preto com pontinhos brancos (semelhante a um céu estrelado) e um ticket verde com um pedaço branco destacável no meio. Na parte verde escrito em preto 'Cervejada', 'Sinta o Pântano' e 'Data: 20/03' com 'A partir das 15h' logo abaixo. E na parte branca escrito 'Cervejada' 'Ingresso Individual' e o logo da SA-Shrek"/>
                    </div>
                    
                    <div className="large-photos">
                        <img className="large-photo" src="img/events/ticket-cervejada.png" alt="Imagem com fundo preto com pontinhos brancos (semelhante a um céu estrelado) e um ticket verde com um pedaço branco destacável no meio. Na parte verde escrito em preto 'Cervejada', 'Sinta o Pântano' e 'Data: 20/03' com 'A partir das 15h' logo abaixo. E na parte branca escrito 'Cervejada' 'Ingresso Individual' e o logo da SA-Shrek"/>
                    </div>
                </div>

                <div className="product-info">
                    <span className="title">Ingresso - Cervejada "Sinta o Pântano"</span>
                    <h2 className="green">R$40,00</h2>

                    <hr className="product-divisor"/>
                        
                    <span><strong>Informações:</strong></span>
                    <ul>
                        <li>Local: Lorem Ipsum</li>
                        <li>Data: 00/00/0000</li>
                        <li>Horário: 00h00</li>
                        <li><a href="" target="_blank" rel="noopener noreferrer">Evento no Facebook</a></li>
                    </ul>
                    
                    <hr className="product-divisor"/>

                    <form id="product-form">           
                        <span><strong>Quantidade:</strong></span>
                        <br/>
                        <input type="number" name="quantity" id="quantity" value="1" min="1" size="5" required/>

                        <hr className ="product-divisor"/>

                        <button className="big-btn full-btn" type="submit" form="product-form">Comprar</button>
                    </form>
                </div>
                
                <div className="product-description">
                    <hr className="product-divisor"/>
                    <span className="title">Descrição</span>
                    <p>A nossa tradicional cervejada do início do ano já chegou! Ela ocorerrá dia 20/03 a partir das 15h! Com muita música boa, com espaço de sobra pra você dançar e é claro muita lama! Você não vai ficar de fora dessa né? Não pastela!!! Corre pra garantir seu ingresso!</p>
                </div>
            </div>
        </main>
    )
}

export default Events