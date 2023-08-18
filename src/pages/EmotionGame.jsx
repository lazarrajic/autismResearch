import React, { useState, useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import "./EmotionGame.css";
import emotiongameimage from "../image/emotiongameimage.png";
import { FaArrowAltCircleLeft } from "react-icons/fa";

const EmotionGame = () => {
  const navigate = useNavigate();

  // Define the questions
  const questions = [
    {
      image: emotiongameimage,
      text: "Today my mom took me to the playground and bought me my favorite ice-cream. I was feeling the emotion named ....",
      correctEmotion: "joy",
    },
    {
      image: "../../public/images/rain.png",
      text: "It was raining all day and I couldn't go outside to play with my friends. I was feeling the emotion named ....",
      correctEmotion: "sadness",
    },
    {
      image: "../../public/images/dark.png",
      text: "It was dark and I heard a strange noise coming from outside. I was feeling the emotion named ....",
      correctEmotion: "fear",
    },
  ];

  // State for current question
  const [currentQuestion, setCurrentQuestion] = useState(null);

  // State for score
  const [score, setScore] = useState(0);

  // Randomly select a question when the component is mounted
  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * questions.length);
    setCurrentQuestion(questions[randomIndex]);
  }, []);

  const handleBackClick = () => {
    setScore(0);
    navigate("/games");
  };

  const handleJoyClick = () => {
    if (currentQuestion.correctEmotion === "joy") {
      setScore(score + 1);
      navigate("/correct", {
        state: { emotion: currentQuestion.correctEmotion },
      });
    } else {
      navigate("/incorrect", {
        state: { emotion: currentQuestion.correctEmotion },
      });
    }
  };

  const handleSadnessClick = () => {
    if (currentQuestion.correctEmotion === "sadness") {
      setScore(score + 1);
      navigate("/correct", {
        state: { emotion: currentQuestion.correctEmotion },
      });
    } else {
      navigate("/incorrect", {
        state: { emotion: currentQuestion.correctEmotion },
      });
    }
  };

  const handleFearClick = () => {
    if (currentQuestion.correctEmotion === "fear") {
      setScore(score + 1);
      navigate("/correct", {
        state: { emotion: currentQuestion.correctEmotion },
      });
    } else {
      navigate("/incorrect", {
        state: { emotion: currentQuestion.correctEmotion },
      });
    }
  };

  return (
    <div className="emotion-main">
      <div className="emotion-top-bar">
        <div className="emotion-back-button" onClick={handleBackClick}>
          <FaArrowAltCircleLeft size={40} />
        </div>
      </div>
      <div className="emotion-picture">
        {currentQuestion && <img src={currentQuestion.image} />}
      </div>
      <div className="emotion-description">
        {currentQuestion && <h3>{currentQuestion.text}</h3>}
        <br />
        Select the correct answer.
      </div>
      <div className="emotion-options">
        <div className="option-choice">
          <div className="happy" onClick={handleJoyClick}></div>
          <h3 style={{ margin: "0" }}>JOY</h3>
        </div>
        <div className="option-choice">
          <div className="sad" onClick={handleSadnessClick}></div>
          <h3 style={{ margin: "0" }}>SADNESS</h3>
        </div>
        <div className="option-choice">
          <div className="angry" onClick={handleFearClick}></div>
          <h3 style={{ margin: "0" }}>FEAR</h3>
        </div>
      </div>
    </div>
  );
};

export default EmotionGame;
