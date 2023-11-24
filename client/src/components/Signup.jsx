import React from 'react'
import '../styles/global.scss'
import Logo from '../assets/logo.png'
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
import axios from 'axios'

const Signup = () => {
    const [user, setUser] = useState({
        username: '',
        password: ''
    })

    const handleChange = (e) => {
        setUser((prev) => ({ ...prev, [e.target.name]: e.target.value }))
      }

    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);

    const handleSubmit = (event) => {
        event.preventDefault();

        axios.post("http://localhost:1666/register", user)
            .then(() => {
                setSuccess(true);
                setError("");
                event.target.reset();
            })
            .catch((error) => {
                setSuccess(false);
                setError(error.response.data);
            });
    };


    console.log(user)
  return (
    <>
        <form className="login-page" onSubmit={handleSubmit}>
            <img src={Logo} alt="tezo logo"/>
            <div className="login-page__fields">
                <input
                    name="username"
                    type="text"
                    placeholder="Username"
                    onChange={handleChange}
                />
            </div>

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
            <p>Already have an account? <Link to='/login'>Login</Link></p>
        </form>
    
    </>
  )
}

export default Signup