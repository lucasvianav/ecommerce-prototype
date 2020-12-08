import React from 'react'
import $ from 'jquery'
import {Link, withRouter} from 'react-router-dom'

import './css/Navbar.css'
import { DataContext } from '../Context'
import ThemeToggler from './ThemeToggler'

const handleNavbarDropdown = e => {
    let dropdownMenu = $(e.target.parentElement).hasClass('drop') ? $(e.target.parentElement) : $('.drop', e.target.parentElement)

    if(e.type === 'mouseenter'){
        // Sets divisor padding
        $('.divisor'.dropdownMenu).css('padding', dropdownMenu.css('width'))

        dropdownMenu.show()

        // Menu's full height
        let previousHeight = $('ul', dropdownMenu).css('height')

        // Animates from height 0 to full height
        $('ul', dropdownMenu).css('height', '0')
        $('ul', dropdownMenu).animate({ height: previousHeight }, 150)
    }
    
    else if(e.type === 'mouseleave'){
        // Animates from full height to height 0
        $('ul', dropdownMenu).animate(
            { height: '0'}, 
            100, 
            function(){ 
                // Hides the menu
                dropdownMenu.hide() 

                // And sets it's height to automatic
                $('ul', dropdownMenu).css('height', 'auto')
            }
        )
    }
}

const toggleSearchBar = () => {
    const bar = $('.search-bar')
    const panel = $('#right-buttons')

    if(bar.css('display') === 'none'){
        bar.show()
        
        let auto = panel.css('width', 'auto').css('width')
        panel.css('width', '12%')

        panel.animate({width: auto}, 400,
            () => {
                bar.removeClass('invisible-content')
                $('button', bar).removeClass('no-display')
                bar.removeClass('show-bar')
            }
        )

        bar.addClass('show-bar')
    }

    else{
        $('button', bar).addClass('no-display')
        
        panel.animate({width: '12%'}, 400,
            () => {
                bar.addClass('invisible-content')
                $('button', bar).addClass('no-display')
                bar.removeClass('hide-bar')
                bar.hide()
            }
        )
        
        bar.addClass('hide-bar')
    }
}

class Navbar extends React.Component {
    static contextType = DataContext

    constructor(props, context){
        super(props, context)

        const {data} = this.context

        this.state = { search: '' }

        this.products = data.filter(value => value.visibility && value.type === 'PR').map(item => item.category).filter((value, index, self) => (self.indexOf(value) === index)).map(item => item.title())
        this.events = data.filter(value => value.visibility && value.type === 'EV').map(item => item.category).filter((value, index, self) => (self.indexOf(value) === index)).map(item => item.title())

        this.handleChange = this.handleChange.bind(this)
        this.submitSearch = this.submitSearch.bind(this)
    }

    componentDidMount(){
        $(function(){
            $('#products-button').on('mouseenter mouseleave', handleNavbarDropdown)
            $('#events-button').on('mouseenter mouseleave', handleNavbarDropdown)
            $('#my-account').on('mouseenter mouseleave', handleNavbarDropdown)
            $('#search-button').on('click', toggleSearchBar)
        })
    }
    
    componentWillUnmount(){
        $('#products-button').off('mouseenter mouseleave', handleNavbarDropdown)
        $('#events-button').off('mouseenter mouseleave', handleNavbarDropdown)
        $('#my-account').off('mouseenter mouseleave', handleNavbarDropdown)
        $('#search-button').off('click', toggleSearchBar)
    }

    componentDidUpdate(prevProps){
        if(prevProps.location !== this.props.location && $('.search-bar').css('display') !== 'none'){ 
            toggleSearchBar() 
            this.setState({ search: '' })
        }
    }

    handleChange(e){
        this.setState({[e.target.name]: e.target.value})
    }
    
    submitSearch(){
        if(this.state.search !== ''){
            this.props.history.push("/search?query=" + this.state.search)
        }
    }

    render(){
        return(
            <nav id="navbar">
                <div id="logo">
                    <Link to="/"><img src={process.env.PUBLIC_URL + "/img/logo.png"} alt="Logo da SA-SHREK"/></Link>
                </div>

                <ul id="central-buttons" className="align-center">
                    <li><Link to="/">Início</Link></li>
                    <li id="products-button">
                        <Link to="/produtos">Produtos</Link>
                        {
                            this.products.isEmpty() ? '' :
                            <div className="drop" style={{display: 'none'}}>
                                <span className="divisor"></span>
                                <ul>
                                    { this.products.map((item, index) => <li key={item + index.toString()}><Link to={'/produtos/' + item.toLowerCase().replaceAll(' ', '-')}>{item}</Link></li>) }
                                </ul>
                            </div>
                        }
                    </li>

                    <li id="events-button">
                        <Link to="/eventos">Eventos</Link>
                        {
                            this.events.isEmpty() ? '' :
                            <div className="drop" style={{display: 'none'}}>
                                <span className="divisor"></span>
                                <ul>
                                    { this.events.map((item, index) => <li key={item + index.toString()}><Link to={'/eventos/' + item.toLowerCase().replaceAll(' ', '-')}>{item}</Link></li>) }
                                </ul>
                            </div>
                        }
                    </li>
                </ul>
            
                <ul id="right-buttons" className="align-center">
                    <li className="search-bar no-display invisible-content">
                        <input type="text" name="search" placeholder="Buscar produtos" onChange={this.handleChange} onKeyDown={e => e.key === 'Enter' ? this.submitSearch() : ''} value={this.state.search}/>
                        <button type="button" className="green no-display" onClick={this.submitSearch}><i className="fas fa-arrow-right"></i></button>
                    </li>
                    <div className='main'>
                        <li><button id="search-button" type="button" title='Pesquisar'><i className="fas fa-search"></i></button></li>
                        <li><Link to="/carrinho" title='Carrinho'><i className="fas fa-shopping-cart"></i></Link></li>
                        <li id='my-account'>
                            {
                                this.context.isLogged.status 
                                    ? <Link to='/minhaconta'>{this.context.isLogged.user.name.split(' ')[0]}</Link> 
                                    : <Link to="/login">Login</Link>
                            }
                            {
                                !this.context.isLogged.status ? '' :
                                <div className='drop' style={{display: 'none'}}>
                                    <span className='divisor'></span>
                                    <ul>
                                        <li><Link to='/minhaconta'>Minha conta</Link></li>
                                        <li><span className='disable-selection' onClick={this.context.logout}>Sair</span></li>
                                    </ul>
                                </div>
                            }
                        </li>
                        <li><ThemeToggler/></li>
                    </div>
                </ul>
            </nav>
        )
    }
}

export default withRouter(Navbar)