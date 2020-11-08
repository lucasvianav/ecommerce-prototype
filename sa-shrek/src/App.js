import React from 'react'

import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './components/Home'
// import Login from './components/Login'
import Events from './components/Events'


class App extends React.Component {
  render(){
    return(
      <div id="root">
        <Navbar/>
        {/* <Home/> */}
        <Events/>
        <Footer/>
      </div>

    )
  }
}

export default App
