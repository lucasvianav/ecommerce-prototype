import React from 'react'
import {Link} from 'react-router-dom'
import $ from 'jquery'

import './css/ProductsPanel.css'
import { DataContext } from '../Context'
class ProductsPanel extends React.Component {
    static contextType = DataContext

    constructor(props, context){
        super(props, context)
        
        const {data} = this.context
        const base = this.props.match.params.base.substring(0,2).toUpperCase()

        const products = data.filter(item => item.type === base)

        this.title = (base === 'EV') ? 'Eventos' : (base === 'PR' ? 'Produtos' : false)

        this.state = {
            data: products, // full data
            products: products, // products being shown
            activeFilters: 0,
            categories: products.filter(value => value.visibility).map(item => item.category).filter((value, index, self) => (self.indexOf(value) === index))
        }

        this.handleFilters = this.handleFilters.bind(this)
        this.componentDidUpdate = this.componentDidUpdate.bind(this)
        this.loadProducts = this.loadProducts.bind(this)

        if(!this.title){ this.props.history.push('/') }
    }

    loadProducts(){
        const {data} = this.context
        
        const base = this.props.match.params.base.substring(0,2).toUpperCase()
        const products = data.filter(item => item.type === base)
        this.title = (base === 'EV') ? 'Eventos' : (base === 'PR' ? 'Produtos' : false)

        const newState = {
            data: products,
            products: products,
            activeFilters: 0,
            categories: products.filter(value => value.visibility).map(item => item.category).filter((value, index, self) => (self.indexOf(value) === index))
        }

        this.setState(newState)

        if(!this.title){ this.props.history.push('/') }
    }

    componentDidUpdate(){
        const {data} = this.context

        if(this.title.substring(0,2).toUpperCase() !== this.props.match.params.base.substring(0,2).toUpperCase()){
            const base = this.props.match.params.base.substring(0,2).toUpperCase()
            const products = data.filter(item => item.type === base)
            this.title = (base === 'EV') ? 'Eventos' : (base === 'PR' ? 'Produtos' : false)

            const newState = {
                data: products,
                products: products,
                activeFilters: 0,
                categories: products.filter(value => value.visibility).map(item => item.category).filter((value, index, self) => (self.indexOf(value) === index))
            }

            this.setState(newState)

            if(!this.title){ this.props.history.push('/') }
        }
    }

    handleFilters(e){
        const category = $('label', $(e.target.parentElement))
        const modified = this.state.data.filter(item => item.category === category.text()) //.map(item => item.category === category.text() ? item : false).filter((value) => value)
        let products, modFilters

        if(e.target.checked){
            if(this.state.activeFilters === 0){ products = modified }
            else{ products = modified.concat(this.state.products) }

            modFilters = 1
        }

        else{
            if(this.state.activeFilters === 1){ products = this.state.data }
            else{ products = this.state.products.filter(el => !modified.includes(el)) }

            modFilters = -1
        }
        
        this.setState(prevState => ({products: products, activeFilters: prevState.activeFilters + modFilters}))
    }

    render(){
        return(
            <main className="ProductsPanel">
                {/* <ProductsRequests.GetAllProducts onChange={() => {this.loadProducts()}}/> */}
                <div className="panel-title"><span>{this.title.capitalize()}</span></div>

                <div className="tabs-history disable-selection">
                    <Link to='/' className='past-tab'><span>Início</span></Link>
                    <span className="current-tab">{this.title.title()}</span>
                </div>

                <div className="content-box pruducts-panel">
                    {
                        this.state.products.isEmpty() ? <h2 className='section-title' style={{margin: 'auto'}}>Não há nenhum {this.title.toLowerCase().replace(/s$/, '')} disponível.</h2> :
                        <>
                            {
                                !this.state.categories.isEmpty()
                                ? (
                                    <section className="filters">
                                        <span className="filters-title">Filtros</span>
                                        <ul className="checkboxes">
                                            {
                                                this.state.categories.map((item, index) => (
                                                    <li className='checkbox-container' key={item + index.toString()} title={item}>
                                                        <input onChange={this.handleFilters} type="checkbox" id={item.replaceAll(' ', '-')} name={item.replaceAll(' ', '')}/>
                                                        <label className='disable-selection' htmlFor={item.replaceAll(' ', '-')}>{item}</label>
                                                    </li>
                                                ))
                                            }
                                        </ul> 
                                    </section>
                                )
                                : ''
                            }

                            <section className="product-cards-panel">
                                {
                                    this.state.products.map((item) =>
                                        item.visibility ?
                                        <div className="product-card" key={item._id}><Link to={'/' + this.title.toLowerCase() + '/' + item._id }>
                                            <img className="product-thumb" src={item.img[0].path} alt={item.img[0].alt}/> 
                                            <p className="product-title">{item.name}</p>
                                            <div className="price-line">
                                                {
                                                    (item.price.full > item.price.sale)
                                                        ? <span className="full-price">R${item.price.full}</span> 
                                                        : ''
                                                }
                                                <p className="sale-price">R${item.price.sale}</p>
                                            </div>
                                        </Link></div>
                                        : ''
                                    )
                                }
                            </section>
                        </>
                    }
                </div>
            </main>
        )
    }
}

export default ProductsPanel