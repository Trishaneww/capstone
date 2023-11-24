import { useState} from 'react';
import { IoMdCheckmark } from "react-icons/io";
import { AiOutlineClose } from "react-icons/ai";
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import Flashcard from '../flashcard/Flashcard'
import Navbar from '../navbar/Navbar';

const Reviewdeck = ( {flashcards}) => {
      const length = flashcards.length;
      const [current, setCurrent] =  useState(0)
      const [percent, setPercent] = useState(0)
      const [score, setScore] = useState({
        correct:0,
        incorrect:0
      })

      const correct = () => {
        setScore({
            correct: score.correct + 1,
            incorrect: score.incorrect
        })
        setCurrent(current + 1)
        setPercent((score.correct + 1)/length)
      }

      const incorrect = () => {
        setScore({
            correct: score.correct,
            incorrect: score.incorrect + 1
        })
        setCurrent(current + 1)
      }

      console.log(percent)



  return (
    <div>
        <h1 style={{color: "white"}}>Review Deck</h1>

        <div className="flashcard-container">
            <div>
                {flashcards.map((flashcard, index) => {
                    return (
                        <div>
                        {index === current && (
                            <Flashcard flashcard={flashcard} index={index}/>
                            )}
                        </div>
                    )
                })}
            </div>

                {current !== length && (
                    <div className="flashcard-container__arrows-container">
                        <div className="flashcard-container__arrows-container-arrow" onClick={incorrect}>
                          <AiOutlineClose style={{color: "red"}} size={30} />
                      </div>
                      <p>{current + 1}/{flashcards.length}</p>
                      <div className="flashcard-container__arrows-container-arrow" onClick={correct}>
                          <IoMdCheckmark style={{color: "green"}}size={30} />
                      </div>  
                      </div>
                )}

                {current === length && (
                    <div>
                        <p style={{color: "red"}}>INCORRECT: {score.incorrect}</p>
                        <p style={{color: "green"}}>CORRECT: {score.correct}</p>
                        <div style={{ width: 200, height: 200 }}>
                            <CircularProgressbar value={percent*100} text={`${percent*100}%`} styles={buildStyles({strokeLinecap: 'butt', textSize: '16px', pathColor: `green`, textColor: 'white', trailColor: 'white'})}/>;
                        </div>
                    </div>
                )}
        </div>
    </div>
  )
}

export default Reviewdeck