import React from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Flashcard from '../flashcard/Flashcard'
import Addflashcard from '../addFlashcard/Addflashcard'
import Navbar from '../navbar/Navbar';

const Editdeck = () => {
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



  return (
    <>  
        <Navbar />
        <h1 style={{color: "white"}}>{!deck[0] ? '' : `${deck[0].title}`}</h1>
        <h1 style={{color: "white"}}>{!deck[0] ? '' : `${deck[0].category}`}</h1>
        <h1 style={{color: "white"}}>{!deck[0] ? '' : `${deck[0].description}`}</h1>
        <div className="flashcard-container">

            <div>
                {flashcards.map((flashcard, index) => (
                    <Flashcard flashcard={flashcard} index={index}/>
                ))}
            </div>

            <Addflashcard deckid={id}/>
        </div>
    </>
  )
}

export default Editdeck