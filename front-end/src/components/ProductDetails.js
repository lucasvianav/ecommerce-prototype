import React from 'react'
import {Link} from 'react-router-dom'
import $ from 'jquery'
import {openModal} from '../Util'

import './css/ProductDetails.css'
import { DataContext } from '../Context'

// Slide of the index currently visible
var currentSlide = 0;

// Shows selected photo and hides all other
function showSlides(n){
    let slides = $(".large-photo")
    let thumbs = $(".product-photo-thumb")

    // Hides the current slide and deactivates it's thumbnail
    $(slides[currentSlide]).hide()
    $(thumbs[currentSlide]).removeClass('active')

    // Sets new current slide index
    if(n >= slides.length){ currentSlide = slides.length }
    else if(n < 0){ currentSlide = 0 }
    else{ currentSlide = n }

    // Shows the current slide and activates it's thumbnail
    $(slides[currentSlide]).show()
    $(thumbs[currentSlide]).addClass('active')
}

class ProductDetails extends React.Component {
    static contextType = DataContext

    constructor(props, context){
        super(props, context)

        const {data} = this.context
        const {tab, base: id} = this.props.match.params

        // const productList = (tab.toLowerCase() === 'eventos') ? data.events : data.products
        
        this.type = tab.substring(0,2).toUpperCase()
        this.tab = this.type === 'PR' ? 'produtos' : 'eventos'
        this.product = data.find(item => item._id === id && item.type === this.type) ? data.find(item => item._id === id && item.type === this.type) : false
        
        if(!this.product || !this.product.visibility){ this.props.history.push('/') }

        this.state = {
            color: '',
            template: '',
            size: '',
            quantity: 1
        }

        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.generateSKU = this.generateSKU.bind(this)
    }

    componentDidMount(){
        // Called when the html completes loading
        $(function(){
            let slides = $('.large-photo')
            let thumbs = $('.product-photo-thumb')

            // Hides all slides
            slides.each(function(){ $(this).hide() })

            // Deactivates all thumbnails and adds events
            // listeners to them in order to control the slides
            for(let i = 0; i < thumbs.length; i++){
                $(thumbs[i]).removeClass('active')
                $(thumbs[i]).bind('click', function(){ showSlides(i) }) // Binds evento to handler
            }

            // Shows the first slide and activates the corresponding thumbnail
            $(slides[0]).show()
            $(thumbs[0]).addClass('active')

            // <span className="green underlined clicker disable-selection" onClick={openModal("sizes-modal")}>
            $('span.green.underlined.clicker.disable-selection').on('click', () => openModal('sizes-modal'))
        })
    }

    generateSKU(){
        const {template, size, color} = this.state
        
        let sku = this.type + '-' + this.product._id
        if(this.type === 'PR'){
            sku += color ? '-' + color.substring(0,4).toUpperCase() + '-' : '-VOID-'
            sku += template ? template.substring(0,4).toUpperCase() + '-' : 'VOID-'
            sku += size ? size : 'VOID'
        }

        return sku
    }

    handleChange(e){
        const {name, value} = e.target

        if(name !== 'quantity' && value){ 
            this.setState({[name]: value, quantity: 0}) 
            $('.error-message').text('')
        }
        
        const stock = parseInt(this.product.stock[this.generateSKU()] ? this.product.stock[this.generateSKU()] : 0)

        if(name === 'quantity' && 0 < value && value <= stock){ 
            this.setState({quantity: parseInt(value)})
            $('.error-message').text('')
        }

        else if(value > stock){ 
            $('.error-message').text('Infelizmente esse é o estoque máximo deste item.') 
        }
    }

    async handleSubmit(e){
        e.preventDefault()

        const {template, size, color, quantity} = this.state

        if(quantity <= 0){
            $('.error-message').text('A quantidade mínima é 1.')
            return
        }

        const specs = {color: color, template: template, size: size}
        const sku = this.generateSKU()

        await this.context.editCart(sku, quantity, specs)
        this.props.history.push('/carrinho')
    }

    render(){
        return(
            !this.product ? '' :
            <main className="ProductDetails">
                <div className="tabs-history disable-selection">
                    <Link to='/' className='past-tab'><span>Início</span></Link>
                    <Link to={'/' + this.tab} className='past-tab'><span>{this.tab.title()}</span></Link>
                    <Link to={'/' + this.tab + '/' + this.product.category.toLowerCase().replaceAll(' ', '-')} className='past-tab'><span>{this.product.category}</span></Link>
                    <span className="current-tab">{this.product.name}</span>
                </div>

                <div className="content-box"> 
                    <div className="product-photos">
                        <div className="thumbnail-panel">
                            { this.product.img.map((image, index) => <img className={'product-photo-thumb' + (index === 0 ? ' active' : '')} src={image.path} alt={image.alt} key={image + index.toString()}/>) }
                        </div>

                        <div className="large-photos">
                            { this.product.img.map((image, index) => <img className={'large-photo' + (index > 0 ? ' no-display' : '')} src={image.path} alt={image.alt} key={image + index.toString()}/>) }
                        </div>
                    </div>

                    <div className="product-info">
                        <span className="title">{this.product.name}</span>

                        <div className='price-line'>
                            {
                                (this.product.price.full > this.product.price.sale)
                                    ? <h3 className="full-price">R${this.product.price.full.toFixed(2).replaceAll('.',',')}</h3> 
                                    : ''
                            }
                            <h2 className="green sale-price">R${this.product.price.sale.toFixed(2).replaceAll('.',',')}</h2>
                        </div>

                        <hr className="product-divisor"/>
                        
                        {
                            (this.type === 'EV')
                            ? (
                                <form onSubmit={this.handleSubmit} id="product-form">  
                                    {
                                        !this.product.info ? '' :
                                        <>
                                            <span><strong>Informações:</strong></span>
                                            <ul>
                                                {this.product.info.location ? <li><span>Local: {this.product.info.location}</span></li> : ''}
                                                {this.product.info.date ? <li><span>Data: {this.product.info.date}</span></li> : ''}
                                                {this.product.info.time ? <li><span>Horário: {this.product.info.time}</span></li> : ''}
                                                {(this.product.info.link.text && this.product.info.link.url) ? <li><a href={this.product.info.link.url} target="_blank" rel="noopener noreferrer">{this.product.info.link.text}</a></li> : ''}
                                            </ul>

                                            <hr className="product-divisor"/>
                                        </>
                                    }

                                    <span><strong>Quantidade:</strong></span>
                                    <br/>
                                    <input type="number" name="quantity" id="quantity" onChange={this.handleChange} value={this.state.quantity} required/>
                                    <br/><br/><span className="error-message"></span>

                                    <hr className ="product-divisor"/>

                                    <button className="big-btn full-btn" type="submit" form="product-form">Comprar</button>
                                </form>
                            )
                            : (
                                <form onSubmit={this.handleSubmit} id="product-form">
                                    {
                                        (!this.product.colors.isEmpty())
                                        ? (
                                            <div className="select-line">
                                                <label htmlFor="size"><strong>Cor:</strong></label>
                                                <br/>
                                                <select name="size" id="size" onChange={this.handleChange} required>
                                                    <option value="" readOnly></option>
                                                    { this.product.colors.map((item, index) => <option value={item} key={item + index.toString()} readOnly>{item}</option>) }
                                                </select>
                                                <br/><br/>
                                            </div>
                                        )
                                        : ''
                                    }

                                    {
                                        (!this.product.templates.isEmpty())
                                        ? (
                                            <div className="templates-line">
                                                <span><strong>Modelagem:</strong></span>
                                                <br/>
                                                { this.product.templates.map((item, index) => <label className="radio-label" key={item + index.toString()}><input type="radio" name="template" value={item} onChange={this.handleChange} required/><span>{item.title()}</span></label>) }
                                                <br/><br/>
                                            </div>
                                        )
                                        : ''
                                    }

                                    {
                                        (!this.product.sizes.isEmpty())
                                        ? (
                                            <div className="select-line">
                                                <label htmlFor="size"><strong>Tamanho:</strong></label>
                                                <br/>
                                                <div className='select-container'>
                                                    <select name="size" id="size" onChange={this.handleChange} required>
                                                        <option value="" readOnly></option>
                                                        { this.product.sizes.map((item, index) => <option value={item} key={item + index.toString()} readOnly>{item}</option>) }
                                                    </select>
                                                    <span className='arrow'><i className="fas fa-angle-down"></i></span>
                                                </div>
                                                <br/><br/>
                                            </div>
                                        )
                                        : ''
                                    }

                                    {
                                        (this.product.sizeTable && this.product.sizeTable.img)
                                        ? (
                                            <div>
                                                <span className="green underlined clicker disable-selection">Ver medidas</span>
                                                <br/><br/>
                                            </div>
                                        )
                                        : ''
                                    }                                    

                                    <span><strong>Quantidade:</strong></span>
                                    <br/>
                                    <input type="number" name="quantity" id="quantity" onChange={this.handleChange} value={this.state.quantity} required/>
                                    <br/><br/>
                                    <span className="error-message"></span>

                                    <hr className ="product-divisor"/>

                                    <button className="big-btn full-btn" type="submit" form="product-form">Comprar</button>
                                </form>
                            )
                        }

                    </div>
                    
                    <div className="product-description">
                        <hr className="product-divisor"/>
                        <span className="title">Descrição</span>
                        {
                            this.product.description.ul.isEmpty() ? '' :
                            <ul className='bullet-list'>
                                {this.product.description.ul.map((item, index) => <li key={item + index.toString()}><span>{item}</span></li>)}
                            </ul>
                        }
                        {
                            this.product.description.ol.isEmpty() ? '' :
                            <ol>
                                {this.product.description.ol.map((item, index) => <li key={item + index.toString()}><span>{item}</span></li>)}
                            </ol>
                        }
                        <p>{this.product.description.txt}</p>
                    </div>
                </div>

                {
                    (this.type !== 'PR' || !this.product.sizeTable || !this.product.sizeTable.img) ? '' :
                    <section id="sizes-modal" className="modal">
                        <img id="size-photo" src={this.product.sizeTable.img} alt={this.product.sizeTable.alt}/>
                    </section>
                }
            </main>
        )
    }
}

export default ProductDetails