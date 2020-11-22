import React from 'react'

import {
  BrowserRouter,
  Route,
  Switch,
  Redirect
} from 'react-router-dom'

import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './components/Home'
import Login from './components/Login'
import ProductsPanel from './components/ProductsPanel'
import ProductCategoryPanel from './components/ProductCategoryPanel'
import ProductSearch from './components/ProductSearch'
import ProductDetails from './components/ProductDetails'
import ShoppingCart from './components/ShoppingCart'
import Accessibility from './components/Accessibility'
import { DataContext } from './Context'
import MyAccount from './components/MyAccount'
import AdmAccount from './components/AdmAccount'
import ProductEdit from './components/ProductEdit'
import Checkout from './components/Checkout'
import { CheckoutProvider } from './components/CheckoutContext'

class App extends React.Component {
  static contextType = DataContext
  
  render(){
    const {data} = this.context

    return(
      <BrowserRouter>
        <div id='app'>
          <Route path='/:base*' render={props => props.match.params.base === 'checkout' ? '' : <Navbar {...this.props}/>}/>
          {/* <Navbar {...this.props}/> */}
          {/* <CheckoutHeader/> */}
          
          <Switch>
            {/* Pages */}
            <Route path='/' exact={true}><Home/></Route>

            <Route path='/:base' render={props => {
              const {base} = props.match.params

              if(['home', 'início'].includes(base.toLowerCase())){
                return <Redirect to='/'/>
              }

              else if(base.toLowerCase() === 'login'){
                return <Login {...props}/>
              }

              else if(['login', 'cadastro', 'cadastrar', 'cadastro', 'signup'].includes(base.toLowerCase())){
                return <Redirect to='/login'/>
              }

              else if(['eventos', 'events', 'event'].includes(base.toLowerCase()) || 
                ['produtos', 'products', 'product'].includes(base.toLowerCase())){
                return <ProductsPanel {...props}/>
              }

              else if(['carrinho', 'cart'].includes(base.toLowerCase())){
                return <ShoppingCart {...props}/>
              }
              
              else if(['minhaconta', 'myaccount'].includes(base.toLowerCase())){
                if(!this.context.isLogged.status){ return <Redirect to='/'/> }

                else if(this.context.getCurrentAccount().type === 'client'){ return <MyAccount/> }

                else if(this.context.getCurrentAccount().type === 'admin'){ return <AdmAccount /> }

                else{ return <Redirect to='/'/> }
              }

              else if(base.toLowerCase() === 'search'){
                let query = new URLSearchParams(props.location.search)

                return <ProductSearch {...props} query={query.get('query')}/>
              }

              else if(base === 'checkout'){
                return <CheckoutProvider><Checkout {...props} ctx={{...this.context}}/></CheckoutProvider>
              }

              else if(['acessibilidade', 'accessibility'].includes(base.toLowerCase())){
                return <Accessibility/>
              }

              else{
                return <Redirect to='/'/>
              }
            }} exact/>

            <Route path='/:tab/:base/:id' render={props => {
              const {tab} = props.match.params

              if(['editar', 'edit'].includes(tab.toLowerCase()) && this.context.isLogged.status && this.context.getCurrentAccount().type === 'admin'){
                return <ProductEdit {...props} />
              }

              else{
                return <Redirect to='/'/>
              }
            }} />

            <Route path='/:tab/:base' render={props => {
              const {tab, base} = props.match.params
              
              if(!['eventos', 'events', 'event', 'evento'].includes(tab.toLowerCase()) && !['produtos', 'products', 'produto', 'product'].includes(tab.toLowerCase())){
                return <Redirect to='/'/>
              }

              else if(data.some(item => item.category.toLowerCase().replaceAll(' ', '-') === base) && tab.toLowerCase().slice(-1) !== 'o'){
                return <ProductCategoryPanel {...props}/>
              }
              
              else{
                return <ProductDetails {...props}/>
              }
            }}/>
          </Switch>

          <Route path='/:base*' render={props => props.match.params.base === 'checkout' ? '' : <Footer/>}/>
        </div>
      </BrowserRouter>
    )
  }
}

export default App
