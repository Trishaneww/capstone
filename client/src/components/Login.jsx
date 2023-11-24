import React from 'react'
import '../styles/global.scss'
import { useState, useEffect } from 'react';
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import Logo from '../assets/logo.png'

const Login = () => {
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const [user, setUser] = useState({
        email: '',
        password: ''
    })

    const handleChange = (e) => {
        setUser((prev) => ({ ...prev, [e.target.name]: e.target.value }))
      }

    console.log(user)

    const handleSubmit = (event) => {
        event.preventDefault();
        
        axios.post("http://localhost:1666/login", user)
            .then((response) => {
                sessionStorage.setItem("token", response.data.token);
                navigate('/');
            })
            .catch((error) => {
                setError(error.response.data);
            });
    };

  return (
    <>
        <form className="login-page" onSubmit={handleSubmit}>
            <img src={Logo} alt="tezo logo"/>
            <div className="login-page__fields">
                <input
                    name="email"
                    type="text"
                    placeholder="Email"
                    onChange={handleChange}
                />
            </div>

            <div className="login-page__fields">
                <input
                    name="password"
                    type="text"
                    placeholder="Password"
                    onChange={handleChange}
                />
            </div>

            <button className="login-page-btn">Login</button>
            <p>Don't have an account? <Link to='/signup'>Sign up</Link></p>
        </form>
    </>
  )
}

export default Login