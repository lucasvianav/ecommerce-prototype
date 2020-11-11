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
import ProductDetails from './components/ProductDetails'
import ShoppingCart from './components/ShoppingCart'
import { DataContext } from './Context'

class App extends React.Component {
  static contextType = DataContext
  
  render(){
    const {data} = this.context
    return(
      <BrowserRouter>
        <div id='app'>
          <Navbar/>
          
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

              else{
                return <Redirect to='/'/>
              }
            }} exact/>

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

          <Footer/>
        </div>
      </BrowserRouter>
    )
  }
}

export default App
