import React from 'react'
import {Link} from 'react-router-dom'
import $ from 'jquery'

import './ProductsPanel.css'
import { DataContext } from '../Context'

class ProductCategoryPanel extends React.Component {
    static contextType = DataContext

    constructor(props, context){
        super(props, context)
        
        const {data} = this.context
        const {match: {params: {tab: tab, base: base}}} = this.props

        this.category = base.toLowerCase().replaceAll('-', ' ')
        this.tab = tab === 'eventos' ? 'events' : (tab === 'produtos' ? 'products' : false)
        
        if(!this.tab){ this.props.history.push('/') }

        // Selects product data accordingly to tab (products x events)
        const products = data[this.tab].filter(item => item.category.toLowerCase() === this.category)
        
        this.state = { products: products }
        if(products.isEmpty()){ this.props.history.push('/'); return }
        
        this.category = products[0].category
    }

    componentDidUpdate(){
        const {data} = this.context
        const {match: {params: {tab: tab, base: base}}} = this.props

        if(this.category.toLowerCase() !== base.toLowerCase().replaceAll('-', ' ')){
            this.category = base.toLowerCase().replaceAll('-', ' ')
            this.tab = tab === 'eventos' ? 'events' : (tab === 'produtos' ? 'products' : false)

            if(!this.tab){ this.props.history.push('/') }

            const products = data[this.tab].filter(item => item.category.toLowerCase() === this.category)

            this.setState({ products: products })
            if(products.isEmpty()){ this.props.history.push('/'); return }

            this.category = products[0].category
        }
    }

    render(){
        const {match: {params: {tab: tab}}} = this.props

        return(
            this.state.products.isEmpty() ? '' :
            <main className="ProductsPanel">
                <div id="panel-title">{this.category.capitalize()}</div>

                <div className="tabs-history disable-selection">
                    <a href="" className="past-tab"><span>Início</span></a>
                    <a href="" className="past-tab"><span>{tab.title()}</span></a>
                    <span className="current-tab">{this.category}</span>
                </div>

                <div className="content-box pruducts-panel">

                    <section className="product-cards-panel">
                        {
                            this.state.products.map((item) =>
                                item.visibility ?
                                <div className="product-card" key={item.id}><Link to={'/' + tab + '/' + item.id }>
                                    <img className="product-thumb" src={item.img[0].small} alt={item.img[0].alt}/> 
                                    <p className="product-title">{item.name}</p>
                                    <div className="price-line">
                                        {
                                            (item.price.full > item.price.sale)
                                                ? <span className="full-price">R${item.price.full.toFixed(2).replaceAll('.',',')}</span> 
                                                : ''
                                        }
                                        <p className="sale-price">R${item.price.sale.toFixed(2).replaceAll('.',',')}</p>
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

export default ProductCategoryPanel