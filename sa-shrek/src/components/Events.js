import React from 'react'
import $ from 'jquery'
import data from '../data'

import './ProductsPanel.css'

class Events extends React.Component {
    constructor(){
        super()

        this.state = {
            data: data.events,
            products: data.events,
            activeFilters: 0,
            categories: data.events.map(item => item.category).filter((value, index, self) => { return self.indexOf(value) === index })
        }

        this.handleFilters = this.handleFilters.bind(this)
    }

    handleFilters(e){
        const category = $('label', $(e.target.parentElement))
        const modified = this.state.data.map(item => item.category === category.text() ? item : false ).filter((value) => value)
        let products

        if(e.target.checked){
            if(this.state.activeFilters === 0){
                products = modified
            }
            
            else{
                products = modified.concat(this.state.products)
            }
            
            this.setState(prevState => ({products: products, activeFilters: prevState.activeFilters + 1}))
        }

        else{
            if(this.state.activeFilters === 1){
                products = this.state.data
            }

            else{
                products = this.state.products.filter(el => !modified.includes(el))
            }
            
            this.setState(prevState => ({products: products, activeFilters: prevState.activeFilters - 1}))
        }
    }

    render(){
        return(
            <main>

                <div id="panel-title">Eventos</div>

                <div className="tabs-history disable-selection">
                    <a href="" className="past-tab"><span>Início</span></a>
                    <span className="current-tab">Eventos</span>
                </div>

                <div className="content-box pruducts-panel">

                    <section className="filters">
                        <span className="filters-title">Filtros</span>
                        <fieldset className="checkboxes">
                            <ul>
                                {
                                    this.state.categories.map(item =>
                                        <li>
                                            <input onChange={this.handleFilters} type="checkbox" id={item.replace(' ', '-')} name={item.replace(' ', '')}/>
                                            <label for={item.replace(' ', '-')}>{item}</label>
                                        </li>
                                    )
                                }
                            </ul> 
                        </fieldset>
                    </section>

                    <section className="product-cards-panel">
                        {
                            this.state.products.map(item =>
                                <div className="product-card"><a href="">
                                    <img className="product-thumb" src={item.img}/> 
                                    <p>{item.name}</p>
                                    <p className="product-price">R${String(item.price).replace('.',',')}</p>
                                </a></div>
                            )
                        }
                    </section>

                </div>

            </main>
        )
    }
}

export default Events