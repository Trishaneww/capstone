import React from 'react'
import Navbar from '../navbar/Navbar'
import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import './Addpage.scss'

const Addpage = () => {

    const { id } = useParams();
    const [newDeck, setDeck] = useState({
        user_id: id,
        title: '',
        description: '',
        category: '',
        status: 'public'
      })

      const handleChange = (e) => {
        setDeck((prev) => ({ ...prev, [e.target.name] : e.target.value}))
      }

      const navigate = useNavigate();

      const handleClick = async (e) => {
        e.preventDefault()
        try {
          navigate('/')
          console.log("clicked")
          await axios.post("http://localhost:1666/deck", newDeck)
        } catch (err) {
          console.log(err)
        }
      }
      console.log(newDeck)



  return (
    <>

    <Navbar />

    <form className="newdeck-form">
        <h1>Create New Study Set</h1>
        <input
            className="newdeck-form__input"
            type="text"
            name="title"
            onChange={handleChange}
            placeholder="Title"
        />

        <input
            className="newdeck-form__descr" 
            type="text"
            name="description"
            onChange={handleChange}
            placeholder="Description"
        />

        <input
            className="newdeck-form__input" 
            type="text"
            name="category"
            onChange={handleChange}
            placeholder="Category"
        />

        <select name="status" onChange={handleChange} className="newdeck-form__input">
          <option value="public">Public</option>
          <option value="hidden">Hidden</option>
        </select>
{/* 
        <input
            className="newdeck-form__input" 
            type="text"
            name="status"
            onChange={handleChange}
            placeholder="Status"
        /> */}

        <button className="newdeck-form__btn" onClick={handleClick}>CREATE</button>
    </form>
    
    </>
  )
}

export default Addpage