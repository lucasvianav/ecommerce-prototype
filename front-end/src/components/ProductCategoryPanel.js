import React from 'react'
import {Link} from 'react-router-dom'

import './css/ProductsPanel.css'
import { DataContext } from '../Context'

class ProductCategoryPanel extends React.Component {
    static contextType = DataContext

    constructor(props, context){
        super(props, context)
        
        const {data} = this.context
        const {match: {params: {tab, base}}} = this.props

        const type = tab.substring(0,2).toUpperCase()
        const category = base.toLowerCase().replaceAll('-', ' ')

        // Selects product data accordingly to tab (products x events)
        const products = data.filter(item => item.category.toLowerCase() === category && item.type === type)
        this.state = { products: products }
        
        if(products.isEmpty()){ this.props.history.push('/'); return }
        
        this.category = products[0].category
        this.tab = type === 'PR' ? 'produtos' : 'eventos'
    }

    componentDidUpdate(){
        const {match: {params: {tab, base}}} = this.props

        if(this.category.toLowerCase() !== base.toLowerCase().replaceAll('-', ' ')){
            const {data} = this.context
            const type = tab.substring(0,2).toUpperCase()
            const category = base.toLowerCase().replaceAll('-', ' ')
    
            // Selects product data accordingly to tab (products x events)
            const products = data.filter(item => item.category.toLowerCase() === category && item.type === type)
            this.setState({ products: products })
            
            if(products.isEmpty()){ this.props.history.push('/'); return }
            
            this.category = products[0].category
            this.tab = type === 'PR' ? 'produtos' : 'eventos'
        }
    }

    render(){
        return(
            this.state.products.isEmpty() ? '' :
            <main className="ProductsPanel">
                <div id="panel-title">{this.category}</div>

                <div className="tabs-history disable-selection">
                    <Link to='/' className='past-tab'><span>Início</span></Link>
                    <Link to={'/' + this.tab} className="past-tab"><span>{this.tab.title()}</span></Link>
                    <span className="current-tab">{this.category}</span>
                </div>

                <div className="content-box pruducts-panel">

                    <section className="product-cards-panel">
                        {
                            this.state.products.map((item) =>
                                item.visibility ?
                                <div className="product-card" key={item.id}><Link to={'/' + this.tab + '/' + item.id }>
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