import React from 'react'
import Header from './Components/Header/Header'
import Home from './components/Home/Home'
import Detailpage from './components/Detailpage/Detailpage'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Blogadd from './components/BlogAdd/Blogadd'
function App() {
  return (
    
    <Router>
      <Header />
      <Routes>

        <Route path='/' element={<Home />} />
        <Route path='/blog/:id' element={<Detailpage />} />
        <Route path="/add-blog" element={<Blogadd />} />
        <Route path="/add-blog/:id" element={<Blogadd />} />

        
      </Routes>
    </Router>

  )
}

export default App