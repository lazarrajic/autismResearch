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

  const stories_angry = [
    {
      image: emotiongameimage,
      text: "Today my sister took my toy without asking me first. I was feeling very… Select the correct feeling",
      correctEmotion: "angry",
    },
    {
      image: emotiongameimage,
      text: "Today my friend pushed me on purpose and I fell on the ground. She didn't say 'I am sorry', she just walked away. I was feeling very… Select the correct feeling",
      correctEmotion: "angry",
    },
    {
      image: emotiongameimage,
      text: "Today my mom and I went to the park. I started playing with my friends but my mom told me that I have to go home and I didn't want to go home. I was feeling very… Select the correct feeling",
      correctEmotion: "angry",
    },
  ];

  const stories_frustrated = [
    {
      image: emotiongameimage,
      text: "Today my friend asked me for my dad's name. I said the name 5 times and he didn't get it. After multiple attempts, I felt very… Select the correct feeling",
      correctEmotion: "frustrated",
    },
    {
      image: emotiongameimage,
      text: "Today I went to the playground with my mom. My mom bought me an ice cream and I dropped it accidentally on the floor. I was feeling very… Select the correct feeling",
      correctEmotion: "frustrated",
    },
    {
      image: emotiongameimage,
      text: "Today I was doing a puzzle in my class when my friend came and stepped on it and ruined it. I was feeling very… Select the correct feeling",
      correctEmotion: "frustrated",
    },
  ];

  const stories_skeptical = [
    {
      image: emotiongameimage,
      text: "Today I went to the aquarium and I saw a Jellyfish. My friend told me that it was an Octopus. I was feeling very… Select the correct feeling",
      correctEmotion: "skeptical",
    },
  ];

  const story_set_mad = [
    ...stories_angry,
    ...stories_frustrated,
    ...stories_skeptical,
  ];

  // State for current question
  const [currentQuestion, setCurrentQuestion] = useState(null);

  // State for score
  const [score, setScore] = useState(0);

  const questions = [...story_set_mad];

  const angryEmotions = ["angry", "frustrated", "skeptical"];

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
      ...angryEmotions
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
