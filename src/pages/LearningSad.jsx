import React, { useState, useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import "./EmotionGame.css";
import emotiongameimage from "../image/emotiongameimage.png";
import { FaArrowAltCircleLeft } from "react-icons/fa";
import shuffle from "lodash/shuffle";

const LearningMad = () => {
  const navigate = useNavigate();

  // SAD
  const stories_tired = [
    {
      image: emotiongameimage,
      text: "Today I raced with my friend and we did many rounds. My friend asked me if I wanted to go and climb but I told my friend - ”I need to breathe and rest first”. I was feeling very…",
      correctEmotion: "tired",
    },
    {
      image: emotiongameimage,
      text: "Today I didn't sleep too much, I woke up very early and I couldn't have a nap. At the end of the day I was feeling very…",
      correctEmotion: "tired",
    },
    {
      image: emotiongameimage,
      text: "Today was very hot outside. I walked a long distance till I arrived at my home. I was feeling very…",
      correctEmotion: "tired",
    },
  ];

  // SAD
  const stories_bored = [
    {
      image: emotiongameimage,
      text: "Today it was raining and I couldn't go outside. I was at home all day and I felt…",
      correctEmotion: "bored",
    },
    {
      image: emotiongameimage,
      text: "Today I was supposed to have a playdate with my friend, but i couldn't because my friend wasn't feeling well. I stayed home all day and I felt very…",
      correctEmotion: "bored",
    },
    {
      image: emotiongameimage,
      text: "Today my mom and my dad were very busy around the house and they couldn't play with me. I didn't know what to do and I was feeling very…",
      correctEmotion: "bored",
    },
  ];

  // SAD
  const stories_guilty = [
    {
      image: emotiongameimage,
      text: "My mom and my dad always tell me that I should eat the food on my table but today I decided to eat it on the sofa and I ended up spilling it. My parents weren't so happy about it. I felt very…",
      correctEmotion: "guilty",
    },
    {
      image: emotiongameimage,
      text: "Today I ripped my sister's book on purpose. My sister was so upset, because she needed the book to finish her homework. I recognized my mistake and I told her I am sorry because I was feeling very…",
      correctEmotion: "guilty",
    },
    {
      image: emotiongameimage,
      text: "Today I took my friend's shoe and I threw it in the class. My teacher saw what I did and she told me that I am not supposed to do that. I said “I am sorry” to my friend and to my teacher, because I was feeling very…",
      correctEmotion: "guilty",
    },
  ];

  //emotion5
  const story_set_sad = [
    ...stories_tired,
    ...stories_bored,
    ...stories_guilty,
  ];

  // State for current question
  const [currentQuestion, setCurrentQuestion] = useState(null);

  // State for score
  const [score, setScore] = useState(0);

  const questions = [...story_set_sad];

  const sadEmotions = ["tired", "bored", "guilty"];

  // Randomly select a question when the component is mounted
  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * questions.length);
    setCurrentQuestion(questions[randomIndex]);
  }, []);

  const handleBackClick = () => {
    setScore(0);
    navigate("/emotionLearningGame");
  };

  let emotionsToDisplay = [];
  if (currentQuestion) {
    emotionsToDisplay = [
      currentQuestion.correctEmotion,
      ...sadEmotions
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
