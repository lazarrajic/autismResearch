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
import shuffle from "lodash/shuffle";

const LearningMad = () => {
  const navigate = useNavigate();

  const stories_excited = [
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
  ];

  const stories_happy = [
    {
      image: park,
      text: "Today my mom took me to the playground and bought me my favorite ice cream. I felt very… Select the correct feeling",
      correctEmotion: "happy",
    },
    {
      image: readingbook,
      text: "Today my brother read two of my favorite books to me. I love my brother and I felt very… Select the correct feeling",
      correctEmotion: "happy",
    },
    {
      image: swimming,
      text: "Today I visited my grandparents and I swam in the lake with them. I felt very…  Select the correct feeling",
      correctEmotion: "happy",
    },
  ];

  const stories_creative = [
    {
      image: ocean,
      text: "Yesterday, I did an ocean art project. My idea was to mix blue and white colors for the ocean. The ocean looked so beautiful at the end. I felt very… Select the correct feeling",
      correctEmotion: "creative",
    },
    {
      image: toys,
      text: "Today I organized my toys in a completely different way. Instead of putting all my pretend animals in one basket, I divided them into two groups - water and land animals. I felt very… Select the correct feeling",
      correctEmotion: "creative",
    },
    {
      image: tiger,
      text: "My sister helped me do a tiger puppet on paper. And then an idea came to my mind. I wanted to add teeth to the tiger puppet. And it looked very beautiful at the end. I felt very…  Select the correct feeling",
      correctEmotion: "creative",
    },
  ];

  const story_set_joyful = [
    ...stories_excited,
    ...stories_happy,
    ...stories_creative,
  ];

  // State for current question
  const [currentQuestion, setCurrentQuestion] = useState(null);

  // State for score
  const [score, setScore] = useState(0);

  const questions = [...story_set_joyful];

  const joyfulEmotions = ["excited", "happy", "creative"];

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
      ...joyfulEmotions
        .filter((emotion) => emotion !== currentQuestion.correctEmotion)
        .sort(() => Math.random() - 0.5)
        .slice(0, 2),
    ];
  }

  emotionsToDisplay = shuffle(emotionsToDisplay);

  const handleEmotionClick = (emotion) => {
    if (currentQuestion.correctEmotion === emotion) {
      setScore(score + 1);
      navigate("/correct", {
        state: {
          emotion: currentQuestion.correctEmotion,
        },
      });
    } else {
      navigate("/incorrect", {
        state: {
          emotion: currentQuestion.correctEmotion,
        },
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
export default LearningMad;
