import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import Header from './components/Header/Header'
import Home from './components/Home/Home'
import Detailpage from './components/Detailpage/Detailpage'
import Blogadd from './components/Blogadd/Blogadd'
import Blogedit from './components/Blodedit/Blogedit'
import Footer from './components/Footer/Footer'


function App() {
  return (
    
    <Router>
      <Header />
      <Routes>

        <Route path='/' element={<Home />} />
        <Route path='/blog/:slug' element={<Detailpage />} />
        <Route path="/add-blog" element={<Blogadd />} />
        <Route path="/edit-blog/:slug" element={<Blogedit />} />


        
      </Routes>
      <Footer/>
    </Router>

  )
}

export default App