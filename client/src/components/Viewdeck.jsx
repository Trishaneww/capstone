import React from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { IoArrowForward, IoArrowBack } from "react-icons/io5";
import { GiMatchTip } from "react-icons/gi";
import { MdOutlineQuiz } from "react-icons/md";
import Flashcard from './flashcard/Flashcard'
import Addflashcard from './addFlashcard/Addflashcard'
import Navbar from './navbar/Navbar';
import Matchtest from './matchTest/Matchtest'
import Reviewdeck from './reviewDeck/Reviewdeck'

const Viewdeck = () => {
    const navigate = useNavigate()
    const { id } = useParams();
    const [ flashcards, setFlashcards ] = useState([]);
    const [ deck, setDeck ] = useState([]);

    useEffect(() => {
        const fetchDeck = async() => {
            try {
                const res = await axios.get(`http://localhost:1666/deck/${id}`);
                setDeck(res.data);
            } catch(err) {
                console.log("Cannot fetch deck", err);
            }
        }
        fetchDeck();
    }, []);


    useEffect(() => {
        const fetchFlashcards = async() => {
            try {
                const res = await axios.get(`http://localhost:1666/flashcard/${id}`);
                setFlashcards(res.data);
            } catch(err) {
                console.log("Cannot fetch deck", err);
            }
        }
        fetchFlashcards();
    }, []);

    const matchBank = []
    const answerBank = []
    const questionBank = []
    
    const addQuestion = () => {
        if (flashcards) {
            flashcards.map((card) => (matchBank.push({
                question:card.question,
                answer: card.answer
            }),
            answerBank.push(card.answer),
            questionBank.push(card.question)))
        }
    }
    addQuestion()

      const [current, setCurrent] =  useState(0)
      const length = flashcards.length;

      const nextSlide = () => {
        setCurrent(current === length - 1 ? 0 : current + 1)
      }

      const prevSlide = () => {
        setCurrent(current === 0 ? length -1 : current - 1)
      }

      const [showMatch, setShowMatch]=  useState(false)

      const handleSwitch = (state, setter) => {
            setter(!state)
      }



  return (
    <>  
        <Navbar />
        <h1 style={{color: "white"}}>
            {!deck[0] ? '' : `${deck[0].title}`}
        </h1>
        <div className="flashcard-container">

            <div className="flashcard-container-nav">
                <div className="review-deck" onClick={() => handleSwitch(showMatch, setShowMatch)}>
                    <MdOutlineQuiz className="review-deck-icon"/>
                    <p>REVIEW DECK</p>
                </div>

                <div className="review-deck" onClick={() => handleSwitch(showMatch, setShowMatch)}>
                    <GiMatchTip className="review-deck-icon"/>
                    <p>MATCH</p>
                </div>
            </div>
            <div>
                {flashcards.map((flashcard, index) => {
                    return (
                        <div key={index}>
                            {index === current && (
                            <Flashcard flashcard={flashcard} index={index}/>
                            )}
                        </div>
                    )
                })}
            </div>
            
            <div className="flashcard-container__arrows-container">
                <div className="flashcard-container__arrows-container-arrow" onClick={prevSlide}>
                    <IoArrowBack size={30} />
                </div>
                <p>{current + 1}/{flashcards.length}</p>
                <div className="flashcard-container__arrows-container-arrow" onClick={nextSlide}>
                    <IoArrowForward size={30} />
                </div>
            </div>

            {showMatch && (
                 <Reviewdeck flashcards={flashcards}/>
            )}

            {showMatch && (
                 <Matchtest answerBank={answerBank} questionBank={questionBank} matchBank={matchBank}/>
            )}

            <p style={{color: "white"}}>
                {!deck[0] ? '' : `${deck[0].category}`}
            </p>
            <p style={{color: "white"}}>
                {!deck[0] ? '' : `${deck[0].username}`}
            </p>
        </div>
    </>
  )
}

export default Viewdeck