import React, { useState, useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import "./EmotionGame.css";
import birthday from "../../src/image/birthday.png";
import aquarium from "../../src/image/aquarium.png";
import cinema from "../../src/image/cinema.png";
import ocean from "../../src/image/ocean.jpg";
import park from "../../src/image/park.jpeg";
import readingbook from "../../src/image/readingbook.jpg";
import swimming from "../../src/image/swimming.jpg";
import tiger from "../../src/image/tiger.jpg";
import toys from "../../src/image/toys.jpg";
import emotiongameimage from "../image/emotiongameimage.png";
import { FaArrowAltCircleLeft } from "react-icons/fa";

const EmotionGame = () => {
  const navigate = useNavigate();

  // Define the questions
  const questions = [
    {
      image: birthday,
      text: "Today is my birthday. I am going to have a big birthday party with my friends. I am looking forward to it and I feel very… Select the correct feeling",
      correctEmotion: "excited",
    },
    {
      image: aquarium,
      text: "Today I am going to the aquarium with my sister. I look forward to see so many water animals. I feel very… Select the correct feeling",
      correctEmotion: "excited",
    },
    {
      image: cinema,
      text: "Today I will go to the cinema to watch my favorite cartoon. I feel very… Select the correct feeling",
      correctEmotion: "excited",
    },
    {
      image: emotiongameimage,
      text: "Today my mom took me to the playground and bought me my favorite ice-cream. I was feeling the emotion named ....",
      correctEmotion: "excited",
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
    {
      image: "../../public/images/dark.png",
      text: "I wanted to play but I needed to finish my homework first. I was feeling the emotion named ....",
      correctEmotion: "angry",
    },
  ];

  // State for current question
  const [currentQuestion, setCurrentQuestion] = useState(null);

  // State for score
  const [score, setScore] = useState(0);

  const emotions = ["excited", "sadness", "fear", "angry"];

  // Randomly select a question when the component is mounted
  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * questions.length);
    setCurrentQuestion(questions[randomIndex]);
  }, []);

  const handleBackClick = () => {
    setScore(0);
    navigate("/");
  };

  let emotionsToDisplay = [];
  if (currentQuestion) {
    emotionsToDisplay = [
      currentQuestion.correctEmotion,
      ...emotions
        .filter((emotion) => emotion !== currentQuestion.correctEmotion)
        .sort(() => Math.random() - 0.5)
        .slice(0, 2),
    ];
  }

  const handleEmotionClick = (emotion) => {
    if (currentQuestion.correctEmotion === emotion) {
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
        {emotionsToDisplay.map((emotion) => (
          <div className="option-choice">
            <div
              className={emotion.toLowerCase()}
              onClick={() => handleEmotionClick(emotion)}
            ></div>
            <h3 style={{ margin: "0" }}>{emotion}</h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EmotionGame;
