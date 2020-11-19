import React from 'react'
import {Link} from 'react-router-dom'

class TextTab extends React.Component {
    render(){
        return(
            <main className="TextTab">
                <div className="panel-title">{this.props.title}</div>

                <div className="tabs-history disable-selection">
                    <Link to='/' className='past-tab'><span>Início</span></Link>
                    <span className="current-tab">{this.props.title}</span>
                </div>

                <div className="content-box">
                    {this.props.children}
                </div>
            </main>
        )
    }
}

export default TextTab