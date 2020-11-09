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
import ProductDetails from './components/ProductDetails'
// import MyAccount from './components/MyAccount'
import ShoppingCart from './components/ShoppingCart'

class App extends React.Component {
  render(){
    return(
      <BrowserRouter>
        <div id="app">
          <Navbar/>
          <ShoppingCart/>
          {/* <Switch> */}
            {/* Pages */}
            {/* <Route path='/' exact={true}><Home/></Route> */}
            {/* <Route path='/login/' exact={true}><Login/></Route> */}
            {/* <Route path='/eventos/' exact={true}><ProductsPanel title='Eventos'/></Route> */}
            {/* <Route path='/eventos/:sku' component={ProductDetails}/> */}
            {/* <Route path='/produtos/' exact={true}><ProductsPanel title='Produtos'/></Route> */}
            {/* <Route path='/produtos/:sku' component={ProductDetails}/> */}

            {/* Redirects */}
            {/* <Route path='/home/' exact={true}><Redirect to='/'/></Route> */}
            {/* <Route path='/inicio/' exact={true}><Redirect to='/'/></Route> */}
            {/* <Route path='/events/*' exact={true}><Redirect to='/eventos'/></Route> */}
            {/* <Route path='/products/*' exact={true}><Redirect to='/produtos'/></Route> */}
            {/* <Route path='/cadastrar/' exact={true}><Redirect to='/login'/></Route> */}
            {/* <Route path='/cadastro/' exact={true}><Redirect to='/login'/></Route> */}
            {/* <Route path='/signup/' exact={true}><Redirect to='/login'/></Route> */}

            {/* 404 Error - Page Not Found */}
            {/* <Route path='*'><Home/></Route> */}
          {/* </Switch> */}

          <Footer/>
        </div>
      </BrowserRouter>
    )
  }
}

export default App
