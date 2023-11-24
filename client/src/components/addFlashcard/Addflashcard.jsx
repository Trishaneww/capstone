import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Addflashcard.scss";

const Addflashcard = ({ deckid }) => {
  const [newFlashcard, setFlashcard] = useState({
    deck_id: deckid,
    question: "",
    answer: "",
  });

  const handleChange = (e) => {
    setFlashcard((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const navigate = useNavigate();

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      navigate("/");
      console.log("clicked");
      await axios.post(`http://localhost:1666/flashcard/{id}`, newFlashcard);
    } catch (err) {
      console.log(err);
    }
  };

  console.log(newFlashcard);

  return (
    <>
      <form className="add-form">
        <div className="add-form__input-fields">
          <input
            className="add-form__input"
            type="text"
            name="question"
            onChange={handleChange}
            placeholder="Enter Question"
          />

          <input
            className="add-form__input"
            type="text"
            name="answer"
            onChange={handleChange}
            placeholder="Enter Answer"
          />
        </div>
        <button className="add-form-btn"onClick={handleClick}> ADD FLASHCARD</button>
      </form>
    </>
  );
};

export default Addflashcard;
