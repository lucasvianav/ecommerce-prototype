import React from 'react'
import {Link} from 'react-router-dom'
import $ from 'jquery'
import data from '../data'

import './ProductsPanel.css'

class ProductsPanel extends React.Component {
    constructor(props){
        super(props)
        
        // Selects product data accordingly to page title (products x events)
        let fullData
        if(this.props.title === 'Eventos'){ fullData = data.events.map(item => item) }
        else if(this.props.title === 'Produtos'){ fullData = data.products.map(item => item) }
        else{ return false }

        this.title = this.props.title

        this.state = {
            data: fullData,
            products: fullData,
            activeFilters: 0,
            categories: fullData.filter(value => value.visibility).map(item => item.category).filter((value, index, self) => (self.indexOf(value) === index))
        }

        this.handleFilters = this.handleFilters.bind(this)
    }

    componentDidUpdate(e){
        if(this.title !== this.props.title){
            // Selects product data accordingly to page title (products x events)
            let fullData
            if(this.props.title === 'Eventos'){ fullData = data.events.map(item => item) }
            else if(this.props.title === 'Produtos'){ fullData = data.products.map(item => item) }
            else{ return false }

            this.title = this.props.title

            const newState = {
                data: fullData,
                products: fullData,
                activeFilters: 0,
                categories: fullData.filter(value => value.visibility).map(item => item.category).filter((value, index, self) => (self.indexOf(value) === index))
            }

            this.setState(newState)
        }
    }

    handleFilters(e){
        const category = $('label', $(e.target.parentElement))
        const modified = this.state.data.map(item => item.category === category.text() ? item : false ).filter((value) => value)
        let products

        if(e.target.checked){
            if(this.state.activeFilters === 0){ products = modified }
            
            else{ products = modified.concat(this.state.products) }
            
            this.setState(prevState => ({products: products, activeFilters: prevState.activeFilters + 1}))
        }

        else{
            if(this.state.activeFilters === 1){ products = this.state.data }

            else{ products = this.state.products.filter(el => !modified.includes(el)) }
            
            this.setState(prevState => ({products: products, activeFilters: prevState.activeFilters - 1}))
        }
    }

    render(){
        return(
            <main className="ProductsPanel">
                <div id="panel-title">{this.title.capitalize()}</div>

                <div className="tabs-history disable-selection">
                    <a href="" className="past-tab"><span>Início</span></a>
                    <span className="current-tab">{this.title.title()}</span>
                </div>

                <div className="content-box pruducts-panel">
                    {
                        !this.state.categories.isEmpty()
                        ? (
                            <section className="filters">
                                <span className="filters-title">Filtros</span>
                                <fieldset className="checkboxes">
                                    <ul>
                                        {
                                            this.state.categories.map((item, index) => (
                                                <li key={item + index.toString()}>
                                                    <input onChange={this.handleFilters} type="checkbox" id={item.replace(' ', '-')} name={item.replace(' ', '')}/>
                                                    <label htmlFor={item.replace(' ', '-')}>{item}</label>
                                                </li>
                                            ))
                                        }
                                    </ul> 
                                </fieldset>
                            </section>
                        )
                        : ''
                    }

                    <section className="product-cards-panel">
                        {
                            this.state.products.map((item) =>
                                item.visibility ?
                                <div className="product-card" key={item.sku}><Link to={'/' + this.title.toLowerCase() + '/' + item.sku }>
                                    <img className="product-thumb" src={item.img[0].small} alt={item.img[0].alt}/> 
                                    <p className="product-title">{item.name}</p>
                                    <div className="price-line">
                                        {
                                            (item.price.full > item.price.sale)
                                                ? <span className="full-price">R${item.price.full.toFixed(2).replace('.',',')}</span> 
                                                : ''
                                        }
                                        <p className="sale-price">R${item.price.sale.toFixed(2).replace('.',',')}</p>
                                    </div>
                                </Link></div>
                                : ''
                            )
                        }
                    </section>
                </div>
            </main>
        )
    }
}

export default ProductsPanel