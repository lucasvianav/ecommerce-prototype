import React from 'react'

import './Home.css'
import { DataContext } from '../Context'

class Home extends React.Component {
    static contextType = DataContext

    render(){
        return(
            <main>
                <div className="scroll-gallery">
                    <ul>
                        {this.context.home.map(item => <li><img className="scroll-gallery-photos" src={item.img} alt={item.alt}/></li>)}
                    </ul>
                </div>
            </main>
        )
    }
}

export default Home