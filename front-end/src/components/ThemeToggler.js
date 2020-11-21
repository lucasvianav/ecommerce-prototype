import React from 'react'

import './css/ThemeToggler.css'
import { DataContext } from '../Context'

class ThemeToggler extends React.Component {
    static contextType = DataContext

    render(){
        return(
            <div className='theme'>
                <i className="fas fa-sun" title='Tema claro'></i>
                <div className='toggle' title='Alterar tema'>
                    <input type='checkbox' id='theme-checkbox' checked={this.context.darkTheme} onChange={this.context.toggleTheme}/>
                    <label htmlFor='theme-checkbox'/>
                </div>
                <i className="fas fa-moon" title='Tema escuro'></i>
            </div>
        )
    }
}

export default ThemeToggler