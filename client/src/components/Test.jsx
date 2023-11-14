import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'

const Test = () => {

  const [data, setData] = useState([])
  useEffect(() => {
    const fetchData = async () => {
        const res = await axios.get("http://localhost:1277/products")
        setData(res.data)
    }
    fetchData()
  }, [])


  return (
    <div>
        <h1>TEST PAGE</h1>

        {data.map((product) => (
            <div>{product.name}</div>
        ))}
    </div>
  )
}

export default Test