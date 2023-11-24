import React from 'react'

const Matchtest = ( {answerBank, questionBank}) => {

    const shuffle = (arr) => { 
        for (let i = arr.length - 1; i > 0; i--) { 
            const j = Math.floor(Math.random() * (i + 1)); 
            [arr[i], arr[j]] = [arr[j], arr[i]]; 
        } 
        return arr; 
    }; 
  return (
    <>
            <div>
                <div className="matching-container">
                    <h1>MATCH CARDS</h1>
                    {shuffle(answerBank).map((answer, index) => (
                        <div className="matching-container__questions">
                            <input type="text" />
                            <p key={index} style={{color: "white"}}>{answer}</p>
                        </div>
                    ))}
                    <div className="matching-container__answerbank">
                        {shuffle(questionBank).map((question, index) => (
                            <div className="matching-container__answer">
                                <p key={index} style={{color: "white"}}>{question}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

    </>
  )
}

export default Matchtest