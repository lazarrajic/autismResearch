import React, { useState, useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import "./EmotionGame.css";
import emotiongameimage from "../image/emotiongameimage.png";
import { FaArrowAltCircleLeft } from "react-icons/fa";
import shuffle from "lodash/shuffle";

const LearningMad = () => {
  const navigate = useNavigate();

  // SCARED
  const stories_anxious = [
    {
      image: emotiongameimage,
      text: "Yesterday I climbed up Climbers and I went so high. When I reached the highest part I didn’t know if I should come down because I thought I might fall. I was feeling…",
      correctEmotion: "anxious",
    },
    {
      image: emotiongameimage,
      text: "Today I went to school and I saw a huge insect crawling on the doorstep. I got really scared and I felt very…",
      correctEmotion: "anxious",
    },
    {
      image: emotiongameimage,
      text: "My friend and I poked a bumble bee today, and the bumble bee started chasing us. We were running so fast. I was feeling very…",
      correctEmotion: "anxious",
    },
  ];

  // SCARED
  const stories_confused = [
    {
      image: emotiongameimage,
      text: "Today I spun at home many times. When I stopped spinning, my home kept still turning and I almost fell down. I was feeling very…",
      correctEmotion: "confused",
    },
    {
      image: emotiongameimage,
      text: "Today my teacher told me to clean up my toys, and at the same time she told me to pass her the train trucks. I didn't know which instruction to follow first. I was feeling very…",
      correctEmotion: "confused",
    },
    {
      image: emotiongameimage,
      text: "Today my mom told me to do my homework. We learnt two letters today “A” and “B”, but we only had to do homework for one of the letters. I didnt know which one, I was feeling very…",
      correctEmotion: "confused",
    },
  ];

  // SCARED
  const stories_overwhelmed = [
    {
      image: emotiongameimage,
      text: "Today I did so many things. I played with my friends outside and went to the zoo. I didn't finish my food and I missed my naptime. At the end of the day, I felt like I couldn’t function anymore. I was feeling…",
      correctEmotion: "overwhelmed",
    },
    {
      image: emotiongameimage,
      text: "Today I went to the subway for the first time. There were so many people and it was so loud and a little scary. I couldn't hear anything and I was feeling…",
      correctEmotion: "overwhelmed",
    },
    {
      image: emotiongameimage,
      text: "Today I went to the trampoline with my friends. The trampoline was small and there were so many people. I was feeling…",
      correctEmotion: "overwhelmed",
    },
  ];

  //emotion4
  const story_set_scared = [
    ...stories_anxious,
    ...stories_confused,
    ...stories_overwhelmed,
  ];

  // State for current question
  const [currentQuestion, setCurrentQuestion] = useState(null);

  // State for score
  const [score, setScore] = useState(0);

  const questions = [...story_set_scared];

  const scaredEmotions = ["anxious", "confused", "overwhelmed"];

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
      ...scaredEmotions
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
