import React from 'react'
import $ from 'jquery'

import './Home.css'

const Home = () => {
    return(
        <main>
            <div className="scroll-gallery">
                <ul>
                    <li><img className="scroll-gallery-photos" src="./img/home/moletom001.png" alt="Menina sorrindo usando um moletom cinza com detalhes pretos com 'ENFERMAGEM UFPG' estampado no centro. Em ambos lados de 'UFPG' há duas linhas horirontais e paralelas."/></li>
                    <li><img className="scroll-gallery-photos" src="./img/home/moletom002.png" alt="Menina sorrindo usando um moletom cinza com detalhes vermelhos com 'IFCAT ENGENHARIA CIVIL' estampado no centro. Em ambos lados de 'IFCAT' há uma linha horirontal e paralela."/></li>
                    <li><img className="scroll-gallery-photos" src="./img/home/moletom003.png" alt="Menina usando um moletom branco com detalhes vermelhos com 'ODONTO' estampado no centro. No canto inferior direito há um brasão."/></li>
                    <li><img className="scroll-gallery-photos" src="./img/home/moletom004.png" alt="Menina sorrindo usando um moletom preto com detalhes verdes com 'NUTRIÇÃO UFGD' estampado no centro. No canto inferior direito há um brasão."/></li>
                    <li><img className="scroll-gallery-photos" src="./img/home/moletom005.png" alt="Menina sorrindo usando um moletom branco com detalhes pretos com 'MEDICIDA UniCEUB' estampado no centro."/></li>
                    <li><img className="scroll-gallery-photos" src="./img/home/moletom006.png" alt="Menina usando um moletom azul escuro com detalhes brancos com 'ENFERMAGEM' estampado no centro. Brasão na cor amarela na parte de cima de uma das mangas."/></li>
                    <li><img className="scroll-gallery-photos" src="./img/home/moletom007.png" alt="Menino usando um moletom preto com detalhes vermelhos e amarelos com 'ATLETICA MALDITA MEDICINA UNEMAT' estampado no centro. No canto inferior direito há um brasão."/></li>
                    <li><img className="scroll-gallery-photos" src="./img/home/moletom004.png" alt="Menina sorrindo usando um moletom preto com detalhes verdes com 'NUTRIÇÃO UFGD' estampado no centro. No canto inferior direito há um brasão."/></li>
                    <li><img className="scroll-gallery-photos" src="./img/home/moletom005.png" alt="Menina sorrindo usando um moletom branco com detalhes pretos com 'MEDICIDA UniCEUB' estampado no centro."/></li>
                    <li><img className="scroll-gallery-photos" src="./img/home/moletom006.png" alt="Menina usando um moletom azul escuro com detalhes brancos com 'ENFERMAGEM' estampado no centro. Brasão na cor amarela na parte de cima de uma das mangas."/></li>
                    <li><img className="scroll-gallery-photos" src="./img/home/moletom007.png" alt="Menino usando um moletom preto com detalhes vermelhos e amarelos com 'ATLETICA MALDITA MEDICINA UNEMAT' estampado no centro. No canto inferior direito há um brasão."/></li>
                </ul>
            </div>
        </main>
    )
}

export default Home