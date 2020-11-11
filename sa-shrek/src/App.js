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
// import Login from './components/Login'
import ProductsPanel from './components/ProductsPanel'
import ProductCategoryPanel from './components/ProductCategoryPanel'
import ProductDetails from './components/ProductDetails'
// import MyAccount from './components/MyAccount'
import ShoppingCart from './components/ShoppingCart'
import { DataProvider, DataContext } from './Context'

class App extends React.Component {
  static contextType = DataContext

  constructor(props, context){
    super(props, context)
  }
  
  render(){
    const {data} = this.context
    return(
      <BrowserRouter>
        <Navbar/>
        
        <Switch>
          {/* Pages */}
          <Route path='/' exact={true}><Home/></Route>
          {/* <Route path='/login/' exact={true}><Login/></Route> */}
          <Route path='/eventos/' exact={true}><ProductsPanel title='Eventos'/></Route>
          <Route path='/produtos/' exact={true}><ProductsPanel title='Produtos'/></Route>
          <Route path='/:tab/:base' render={props => {
            const {tab: tab, base: base} = props.match.params
            console.log(tab === 'eventos' || tab === 'produtos', data)

            if(data.products.some(item => item.category.toLowerCase().replaceAll(' ', '-') === base) || data.events.some(item => item.category.toLowerCase().replaceAll(' ', '-') === base)){
              console.log('1')
              return <ProductCategoryPanel {...props}/>
            }
            
            else if(tab.toLowerCase() === 'eventos' || tab.toLowerCase() === 'produtos'){
              console.log('2')
              return <ProductDetails {...props}/>
            }
            
            else{
              console.log('3')
              return <Home {...props}/>
            }
          }}/>
          <Route path='/carrinho/' exact={true} component={ShoppingCart}/>
          

          {/* Redirects */}
          <Route path='/home/' exact={true}><Redirect to='/'/></Route>
          <Route path='/inicio/' exact={true}><Redirect to='/'/></Route>
          <Route path='/events/*' exact={true}><Redirect to='/eventos'/></Route>
          <Route path='/products/*' exact={true}><Redirect to='/produtos'/></Route>
          <Route path='/cadastrar/' exact={true}><Redirect to='/login'/></Route>
          <Route path='/cadastro/' exact={true}><Redirect to='/login'/></Route>
          <Route path='/signup/' exact={true}><Redirect to='/login'/></Route>
          <Route path='/cart/' exact={true}><Redirect to='/carrinho'/></Route>

          {/* 404 Error - Page Not Found */}
          <Route path='*'><Home/></Route>
        </Switch>

        <Footer/>
      </BrowserRouter>
    )
  }
}

export default App
