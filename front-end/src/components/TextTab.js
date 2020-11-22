import React from 'react'
import {Link} from 'react-router-dom'

class TextTab extends React.Component {
    render(){
        return(
            <main className="TextTab">
                { this.props.title ? <div className="panel-title"><span>{this.props.title}</span></div> : '' }

                {
                    !this.props.title ? '' :
                    <div className="tabs-history disable-selection">
                        <Link to='/' className='past-tab'><span>Início</span></Link>
                        <span className="current-tab">{this.props.title}</span>
                    </div>
                }

                {this.props.link ? <Link to={this.props.link.to} className='grey' style={{'marginLeft': '0.5%'}}>{'< ' + this.props.link.text}</Link> : ''}

                <div className="content-box">
                    {this.props.children}
                </div>
            </main>
        )
    }
}

export default TextTab