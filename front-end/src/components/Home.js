import React from 'react'

import './css/Home.css'
import { DataContext } from '../Context'

class Home extends React.Component {
    static contextType = DataContext

    render(){
        return(
            <main className="Home">
                <div className="scroll-gallery">
                    <ul>
                        {this.context.home.map((item, index) => <li key={index}><img className="scroll-gallery-photos" src={item.img} alt={item.alt}/></li>)}
                    </ul>
                </div>
            </main>
        )
    }
}

export default Home