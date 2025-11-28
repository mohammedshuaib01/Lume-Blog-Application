import React, { useState } from 'react'
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'

import Header from './components/Header/Header'
import Home from './components/Home/Home'
import Detailpage from './components/Detailpage/Detailpage'
import Blogadd from './components/Blogadd/Blogadd'
import Blogedit from './components/Blodedit/Blogedit'
import Footer from './components/Footer/Footer'
import Login from './components/Login/Login'

function App() {
  const [adminToken, setAdminToken] = useState(localStorage.getItem("adminToken"))

  // Function passed to Login
  const handleLogin = (token) => {
    localStorage.setItem("adminToken", token)
    setAdminToken(token)
  }

  // Protected Route helper
  const ProtectedRoute = ({ children }) => {
    if (!adminToken) {
      return <Navigate to="/admin-login" />
    }
    return children
  }

  return (
    <Router>
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/blog/:slug' element={<Detailpage />} />

        {/* Protected routes */}
        <Route path="/add-blog" element={<ProtectedRoute> <Blogadd /> </ProtectedRoute> } />

        <Route path="/edit-blog/:slug" element={<ProtectedRoute> <Blogedit /></ProtectedRoute>} />

        {/* Login route */}
        <Route path="/admin-login" element={<Login onLogin={handleLogin} />} />

      </Routes>
      <Footer />
    </Router>
  )
}

export default App
