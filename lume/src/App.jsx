import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Route, Routes, Navigate, useLocation } from 'react-router-dom'

import Header from './components/Header/Header'
import Home from './components/Home/Home'
import Detailpage from './components/Detailpage/Detailpage'
import Blogadd from './components/Blogadd/Blogadd'
import Blogedit from './components/Blodedit/Blogedit'
import Footer from './components/Footer/Footer'
import Login from './components/Login/Login'
import Adminpage from './components/Adminpage/Adminpage'

function App() {
  const [adminToken, setAdminToken] = useState(localStorage.getItem("adminToken"))

  useEffect(() => {
    const token = localStorage.getItem("adminToken")
    setAdminToken(token)
  }, [])

  const handleLogin = (token) => {
    localStorage.setItem("adminToken", token)
    setAdminToken(token)
  }

  const ProtectedRoute = ({ children }) => {
    return adminToken ? children : <Navigate to="/admin-login" replace />
  }

  // 👇 This component will wrap everything to check location
  const Layout = ({ children }) => {
  const location = useLocation()

  // FIX: this hides header/footer for /admin-login AND /admin-login/
  const hideLayout = location.pathname.startsWith("/admin-login")

  return (
    <>
      {!hideLayout && <Header />}
      {children}
      {!hideLayout && <Footer />}
    </>
  );
};

  return (
    <Router>
      <Layout>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/blog/:slug' element={<Detailpage />} />
          <Route path="/add-blog" element={<ProtectedRoute><Blogadd /></ProtectedRoute>} />
          <Route path="/edit-blog/:slug" element={<ProtectedRoute><Blogedit /></ProtectedRoute>} />
          <Route path="/admin/dashboard" element={<ProtectedRoute><Adminpage /></ProtectedRoute>} />
          <Route path="/admin-login" element={<Login onLogin={handleLogin} />} />
        </Routes>
      </Layout>
    </Router>
  )
}

export default App
