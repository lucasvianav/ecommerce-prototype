import React from 'react'
import {Link} from 'react-router-dom'
import $ from 'jquery'
import {openModal} from '../aux'

import './ProductDetails.css'
import data from '../data'

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
    constructor(props){
        super(props)

        const {match: {params: {sku: sku}, path}} = this.props
        const productList = (path.split('/')[1].toLowerCase() === 'eventos') ? data.events : data.products
        
        this.product = productList.find(item => item.sku === sku) ? productList.find(item => item.sku === sku) : false
        this.tab = path.split('/')[1].title()
        
        if(!this.product || !this.product.visibility){ this.props.history.push('/') }

        this.state = {
            template: '',
            size: '',
            color: '',
            quantity: 0
        }

        this.handleChange = this.handleChange.bind(this)
    }

    handleChange(e){
        const {name, value} = e.target

        if(name !== 'quantity' && value){ 
            this.setState({[name]: value, quantity: 0}) 
            $('.error-message').text('')
        }
        
        // Gets current item's stock accordingly to the
        // inputs selected (color, template, size)
        let stock = this.product.stock
        if(typeof(stock) === 'object'){
            stock = this.product.colors.isEmpty() ? stock.noColor : (this.state.color ? eval('stock.' + this.state.color) : 0)
            
            if(typeof(stock) === 'object'){
                stock = this.product.templates.isEmpty() ? stock.noTemplate : (this.state.template ? eval('stock.' + this.state.template) : 0)
                
                if(typeof(stock) === 'object'){
                    stock = this.product.sizes.isEmpty() ? stock.noSize : (this.state.size ? eval('stock.' + this.state.size) : 0)
                }
            }
        }

        // if(this.tab.toLowerCase() === 'eventos'){ stock = this.product.stock }
        // else if(!this.product.colors.isEmpty()){
        //     if(this.state.color){
        //         if(!this.product.templates.isEmpty()){
        //             if(this.state.template){
        //                 if(!this.product.sizes.isEmpty()){
        //                     if(this.state.size){
        //                         stock = eval('this.product.stock.' + this.state.color + '.' + this.state.template + '.' + this.state.size)
        //                     } else{ stock = 0 } }
        //                 else{ stock = eval('this.product.stock.' + this.state.color + '.' + this.state.template) }
        //             } else{ stock = 0 } }
        //         else{
        //             if(!this.product.sizes.isEmpty()){
        //                 if(this.state.size){
        //                     stock = eval('this.product.stock.' + this.state.color + '.' + this.state.size)
        //                 } else{ stock = 0 } }
        //             else{ stock = eval('this.product.stock.' + this.state.color) } }
        //     } else{ stock = 0 } }
        // else{
        //     if(!this.product.templates.isEmpty()){
        //         if(this.state.template){
        //             if(!this.product.sizes.isEmpty()){
        //                 if(this.state.size){
        //                     stock = eval('this.product.stock.' + this.state.template + '.' + this.state.size)
        //                 } else{ stock = 0 } }
        //             else{ stock = eval('this.product.stock.' + this.state.template) }
        //         } else{ stock = 0 } }
        //     else{
        //         if(!this.product.sizes.isEmpty()){
        //             if(this.state.size){
        //                 stock = eval('this.product.stock.' + this.state.size)
        //             } else{ stock = 0 } }
        //         else{ stock = eval('this.product.stock') } }
        // }

        if(name === 'quantity' && 0 <= value && value <= stock){ 
            this.setState({quantity: value})
            $('.error-message').text('')
        }
        else if(value > stock){ 
            $('.error-message').text('Infelizmente esse é o estoque máximo deste item.') 
        }
    }

    render(){
        return(
            !this.product ? '' :
            <main className="ProductDetails">
                <div className="tabs-history disable-selection">
                    <Link to='/' className='past-tab'><span>Início</span></Link>
                    <Link to={'/' + this.tab.toLowerCase()} className='past-tab'><span>{this.tab}</span></Link>
                    <Link to={'/' + this.product.category.toLowerCase().replace(' ', '-')} className='past-tab'><span>{this.product.category}</span></Link>
                    <span className="current-tab">{this.product.name}</span>
                </div>

                <div className="content-box"> 
                    <div className="product-photos">
                        <div className="thumbnail-panel">
                            { this.product.img.map((image, index) => <img className={'product-photo-thumb' + (index === 0 ? ' active' : '')} src={image.small} alt={image.alt} key={image + index.toString()}/>) }
                        </div>

                        <div className="large-photos">
                            { this.product.img.map((image, index) => <img className={'large-photo' + (index > 0 ? ' no-display' : '')} src={image.large} alt={image.alt} key={image + index.toString()}/>) }
                        </div>
                    </div>

                    <div className="product-info">
                        <span className="title">{this.product.name}</span>

                        <div className='price-line'>
                            {
                                (this.product.price.full > this.product.price.sale)
                                    ? <h3 className="full-price">R${this.product.price.full.toFixed(2).replace('.',',')}</h3> 
                                    : ''
                            }
                            <h2 className="green sale-price">R${this.product.price.sale.toFixed(2).replace('.',',')}</h2>
                        </div>

                        <hr className="product-divisor"/>
                        
                        {
                            (this.tab.toLowerCase() === 'eventos')
                            ? (
                                <form id="product-form">           
                                    <span><strong>Informações:</strong></span>
                                    <ul>
                                        {this.product.info.location ? <li>Local: {this.product.info.location}</li> : ''}
                                        {this.product.info.date ? <li>Data: {this.product.info.date}</li> : ''}
                                        {this.product.info.time ? <li>Horário: {this.product.info.time}</li> : ''}
                                        {(this.product.info.link.text && this.product.info.link.url) ? <li><a href={this.product.info.link.url} target="_blank" rel="noopener noreferrer">{this.product.info.link.text}</a></li> : ''}
                                    </ul>
                                                                
                                    <hr className="product-divisor"/>

                                    <span><strong>Quantidade:</strong></span>
                                    <br/>
                                    <input type="number" name="quantity" id="quantity" onChange={this.handleChange} value={this.state.quantity} required/>
                                    <br/><br/><span className="error-message"></span>

                                    <hr className ="product-divisor"/>

                                    <button className="big-btn full-btn" type="submit" form="product-form">Comprar</button>
                                </form>
                            )
                            : (
                                <form id="product-form">
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
                                                { this.product.templates.map((item, index) => <label className="radio-label" key={item + index.toString()}><input type="radio" name="template" value={item.title().replace(' ','')} onChange={this.handleChange} required/>{item.title()}</label>) }
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
                                                <select name="size" id="size" onChange={this.handleChange} required>
                                                    <option value="" readOnly></option>
                                                    { this.product.sizes.map((item, index) => <option value={item} key={item + index.toString()} readOnly>{item}</option>) }
                                                </select>
                                                <br/><br/>
                                            </div>
                                        )
                                        : ''
                                    }

                                    {
                                        (this.product.sizeTable.img)
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
                            (this.product.description.ul)
                            ? (
                                <ul>
                                    {this.product.description.ul.map((item, index) => <li key={item + index.toString()}>{item}</li>)}
                                </ul>
                            )
                            : ''
                        }
                        {
                            (this.product.description.ol)
                            ? (
                                <ol>
                                    {this.product.description.ol.map((item, index) => <li key={item + index.toString()}>{item}</li>)}
                                </ol>
                            )
                            : ''
                        }
                        <p>{this.product.description.txt}</p>
                    </div>
                </div>

                {
                    (this.tab.toLowerCase() !== 'produtos' || !this.product.img) ? '' :
                    <section id="sizes-modal" className="modal">
                        <div className="content-box">
                            <span className="title">Medidas</span>
                            <img id="size-photo" src={this.product.sizeTable.img} alt={this.product.sizeTable.alt}/>
                        </div>    
                    </section>
                }
            </main>
        )
    }
}

export default ProductDetails