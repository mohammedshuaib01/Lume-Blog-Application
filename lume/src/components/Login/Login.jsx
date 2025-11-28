import React from 'react'
import { useState } from 'react'
import { supabase } from '../../supabase'
import { useNavigate } from "react-router-dom";

import './Login.css'

function Login({ onLogin }) {


  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const navigate = useNavigate();

  const handleLogin = async () => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    if (error) {
      alert("Login Failed")
      return
    }

    // Save token and notify parent
    localStorage.setItem("adminToken", data.session.access_token);
    onLogin(data.session.access_token)

    // Redirect to admin page after login
    navigate("/");
  }


  return (
    <div className="login-wrapper">
      <div className="login-card">
        <h2 className="login-title">Admin Login</h2>

        <input
          type="email"
          placeholder="Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="login-input"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="login-input"
        />

        <button onClick={handleLogin} className="login-btn">
          Login
        </button>
      </div>
    </div>
  )
}

export default Login
