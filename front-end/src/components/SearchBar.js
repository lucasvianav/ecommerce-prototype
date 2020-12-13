import React from 'react'
import $ from 'jquery'

import './css/SearchBar.css'

import { DataContext } from '../Context'

class SearchBar extends React.Component {
    static contextType = DataContext

    constructor(props, context){
        super(props, context)

        this.visible = props.visible

        this.state = { search: '' }

        this.handleChange = this.handleChange.bind(this)
        this.submitSearch = this.submitSearch.bind(this)
    }

    componentDidUpdate(prevProps){
        if(prevProps.location !== this.props.location && $('.search-bar').css('display') !== 'none'){ 
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
            this.visible
            ?
                <div className="search-bar">
                    <input type="text" name="search" placeholder="Buscar produtos" onChange={this.handleChange} onKeyDown={e => e.key === 'Enter' ? this.submitSearch() : ''} value={this.state.search}/>
                    <button type="button" className="green" onClick={this.submitSearch}><i className="fas fa-arrow-right"></i></button>
                </div>
            :
                <div className="search-bar no-display invisible-content">
                    <input type="text" name="search" placeholder="Buscar produtos" onChange={this.handleChange} onKeyDown={e => e.key === 'Enter' ? this.submitSearch() : ''} value={this.state.search}/>
                    <button type="button" className="green no-display" onClick={this.submitSearch}><i className="fas fa-arrow-right"></i></button>
                </div>
        )
    }
}

export default SearchBar