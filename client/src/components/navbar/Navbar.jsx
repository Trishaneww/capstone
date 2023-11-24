import React from 'react'
import { AiFillHome } from "react-icons/ai";
import { IoMdSettings } from "react-icons/io";
import { FaRegSquarePlus } from "react-icons/fa6";
import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import axios from 'axios'

import './Navbar.scss'

const Navbar = () => {

  const [user, setUser] = useState('');
  const [failedAuth, setFailedAuth] = useState(false);

  useEffect(() => {
  const token = sessionStorage.getItem("token");

  if (!token) {
    return setFailedAuth(true);
  }

  // Get the data from the API
  axios
    .get("http://localhost:1666/current", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => {
      setUser(response.data);
    })
    .catch((error) => {
      console.log(error);
      setFailedAuth(true);
    });
}, []);
  return (
    <>
        <nav className="navbar">
            <Link to='/' className="navbar-icon"><AiFillHome size={30} /></Link>
            <Link to={`/add/${user.id}`} className="navbar-icon"><FaRegSquarePlus size={30} /></Link>
            <Link to={`/settings/${user.id}`} className="navbar-icon"><IoMdSettings size={30} /></Link>
        </nav>
    </>
  )
}

export default Navbar