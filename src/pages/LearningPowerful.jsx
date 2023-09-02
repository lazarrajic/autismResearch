import React, { useState, useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import "./EmotionGame.css";
import emotiongameimage from "../image/emotiongameimage.png";
import { FaArrowAltCircleLeft } from "react-icons/fa";
import shuffle from "lodash/shuffle";

const LearningMad = () => {
  const navigate = useNavigate();

  // POWERFUL
  const stories_proud = [
    {
      image: emotiongameimage,
      text: "Today I had a competition in my school. We all had to line up and run, whoever ran fastest would win the medal and the Cup. I focused on the competition and I won. I was feeling very…",
      correctEmotion: "proud",
    },
    {
      image: emotiongameimage,
      text: "Today my friend did the best art project in class and we all loved it. I was feeling very…",
      correctEmotion: "proud",
    },
    {
      image: emotiongameimage,
      text: "Today I got ready for school all by myself. I wore my uniform and packed my backpack all by myself. I was feeling very…",
      correctEmotion: "proud",
    },
  ];

  // POWERFUL
  const stories_confident = [
    {
      image: emotiongameimage,
      text: "Today my dad offered to help me put on my shoes, but I told my dad that I don't need help, I can put them on by myself. I was feeling very…",
      correctEmotion: "confident",
    },
    {
      image: emotiongameimage,
      text: "Today I came back from school, washed my hands and ate lunch. After finishing I saw my mom folding clothes and I asked her to teach me how to fold clothes. She taught me and I could do it all by myself. I was feeling very…",
      correctEmotion: "confident",
    },
    {
      image: emotiongameimage,
      text: "Today I brushed my teeth all by myself. I brushed them everywhere and I made sure there was no food left. It was my first time to do it by myself. I was feeling very…",
      correctEmotion: "confident",
    },
  ];

  // POWERFUL
  const stories_surprised = [
    {
      image: emotiongameimage,
      text: "Today my friend sat on a balloon and the balloon popped. Nobody was expecting it would pop, thus we all got…",
      correctEmotion: "surprised",
    },
    {
      image: emotiongameimage,
      text: "Today my mom was supposed to pick me up from school, but instead my Grandfather came to pick me up. I was so happy and I felt very…",
      correctEmotion: "surprised",
    },
    {
      image: emotiongameimage,
      text: "Today was my birthday. My mom invited all my friends. I was looking around the room and i couldn't find my best friend, then all of a sudden he came out of a huge present box. I was laughing and I felt so…",
      correctEmotion: "surprised",
    },
  ];

  //emotion2
  const story_set_powerful = [
    ...stories_proud,
    ...stories_confident,
    ...stories_surprised,
  ];

  // State for current question
  const [currentQuestion, setCurrentQuestion] = useState(null);

  // State for score
  const [score, setScore] = useState(0);

  const questions = [...story_set_powerful];

  const powerfulEmotions = ["proud", "confident", "surprised"];

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
      ...powerfulEmotions
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
