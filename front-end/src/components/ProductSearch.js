import React from 'react'
import {Link} from 'react-router-dom'

import './css/ProductsPanel.css'
import { DataContext } from '../Context'

class ProductSearch extends React.Component {
    static contextType = DataContext

    constructor(props, context){
        super(props, context)
        
        const {data} = this.context
        const {query} = this.props

        this.query = query

        const products = data.filter(item => item.category.toLowerCase().includes(query.toLowerCase()) || item.name.toLowerCase().includes(query.toLowerCase()) || item.id.toLowerCase().includes(query.toLowerCase()))
        this.state = { products: products }
    }

    componentDidUpdate(){
        const {query} = this.props

        if(this.query.toLowerCase() !== query.toLowerCase()){
            const {data} = this.context
    
            this.query = query

            const products = data.filter(item => item.category.toLowerCase().includes(query.toLowerCase()) || item.name.toLowerCase().includes(query.toLowerCase()) || item.id.toLowerCase().includes(query.toLowerCase()))
            this.setState({ products: products })
        }
    }

    render(){
        return(
            <main className="ProductsPanel">
                <div className="panel-title"><span>Busca: "{this.query}"</span></div>

                <div className="tabs-history disable-selection">
                    <Link to='/' className='past-tab'><span>Início</span></Link>
                    <span className="current-tab">Busca</span>
                </div>

                <div className="content-box pruducts-panel">
                    {
                        this.state.products.isEmpty() ? <span className='empty grey'>Nenhum resultado foi encontrado para a sua busca.</span> :
                        <section className="product-cards-panel">
                            {
                                this.state.products.map((item) =>
                                    item.visibility ?
                                    <div className="product-card" key={item.id}><Link to={'/' + this.tab + '/' + item.id }>
                                        <img className="product-thumb" src={item.img[0].path} alt={item.img[0].alt}/> 
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
                    }
                </div>
            </main>
        )
    }
}

export default ProductSearch