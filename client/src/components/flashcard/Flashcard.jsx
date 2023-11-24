import './Flashcard.scss'
import { BiSolidTrashAlt } from "react-icons/bi";
import axios from 'axios'
import { useState} from 'react';
import { useNavigate } from 'react-router-dom';

const Flashcard = ( {flashcard, index} ) => {

  const navigate = useNavigate()
  const [isAnswer, setIsAnswer] = useState(false)
  const [isQuestion, setIsQuestion] = useState(true)
  const handleDelete = async (e) => {
    e.preventDefault()
    try {
        navigate('/')
        console.log("clicked")
        await axios.delete(`http://localhost:1666/flashcard/${flashcard.id}`)
    } catch (err) {
      console.log(err)
    }
  }

  const showFlash = () => {
    setIsAnswer(!isAnswer)
    setIsQuestion(!isQuestion)
  }

  return (
    <>
       <div className="flashcard" onClick={showFlash}>
          <div className="flashcard-delete">
              <p>{index + 1}</p>
              <BiSolidTrashAlt onClick={handleDelete} />
          </div>
          {isQuestion && (
              <p>{flashcard.question}</p>
          )}

          {isAnswer && (
            <p>{flashcard.answer}</p>
          )}
          
        </div>
    </>
  )
}

export default Flashcard