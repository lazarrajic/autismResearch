import React, { useState, useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import "./EmotionGame.css";
import emotiongameimage from "../image/emotiongameimage.png";
import { FaArrowAltCircleLeft } from "react-icons/fa";
import shuffle from "lodash/shuffle";

const LearningMad = () => {
  const navigate = useNavigate();

  // PEACEFUL
  const stories_thoughtful = [
    {
      image: emotiongameimage,
      text: "Today I fell down in the park and I was crying. One child in the park came and comforted me. She was very…",
      correctEmotion: "thoughtful",
    },
    {
      image: emotiongameimage,
      text: "Today when me and my friend went outside, it started raining. I forgot my umbrella at home and my friend offered that we both go inside her umbrella. She was very…",
      correctEmotion: "thoughtful",
    },
    {
      image: emotiongameimage,
      text: "Today my friend fell off his bike. When I saw that he fell down, I ran to see if he was okay and I tried to comfort him. I was being very…",
      correctEmotion: "thoughtful",
    },
  ];

  // PEACEFUL
  const stories_thankful = [
    {
      image: emotiongameimage,
      text: "Today was my birthday. My friends and my family organized a beautiful birthday party. I felt very…",
      correctEmotion: "thankful",
    },
    {
      image: emotiongameimage,
      text: "My teacher teaches me so many new and cool things every day. She is an amazing teacher. I sent her a beautiful present today and I feel very…",
      correctEmotion: "thankful",
    },
    {
      image: emotiongameimage,
      text: "My friend shared her favorite car with me. She always shares with me and makes me laugh. I love her and I feel very…",
      correctEmotion: "thankful",
    },
  ];

  // PEACEFUL
  const stories_secure = [
    {
      image: emotiongameimage,
      text: "Today I saw an insect in the park. I ran as fast as possible to my dad. My dad told me that it was just an ant and I didn’t have to be scared of it. I felt very…",
      correctEmotion: "secure",
    },
    {
      image: emotiongameimage,
      text: "Today I passed the street together with my friend and the crossing guard stopped all the cars, so we could pass. I was feeling very…",
      correctEmotion: "secure",
    },
    {
      image: emotiongameimage,
      text: "Today I went to visit my grandparents. I wanted to go and get ice cream but I felt scared to go by myself, - But my grandpa comforted me and he told me, he will come with me to get ice cream. I felt very. I was feeling very…",
      correctEmotion: "secure",
    },
  ];

  //emotion3
  const story_set_peaceful = [
    ...stories_thoughtful,
    ...stories_thankful,
    ...stories_secure,
  ];

  // State for current question
  const [currentQuestion, setCurrentQuestion] = useState(null);

  // State for score
  const [score, setScore] = useState(0);

  const questions = [...story_set_peaceful];

  const peacefulEmotions = ["thoughtful", "thankful", "secure"];

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
      ...peacefulEmotions
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
