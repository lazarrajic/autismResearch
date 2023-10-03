import React, { useState, useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import "./EmotionGame.css";
import emotiongameimage from "../image/emotiongameimage.png";

import correctImage from "../image/correctImage.png";
import { FaArrowAltCircleLeft } from "react-icons/fa";
import shuffle from "lodash/shuffle";

const LearningPeaceful = () => {
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

  //state for level
  const [level, setLevel] = useState(1);

  //state variable for correct answered stories
  const [answeredStories, setAnsweredStories] = useState([]);

  const questions = [...story_set_peaceful];

  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  const peacefulEmotions = ["thoughtful", "thankful", "secure"];
  const allOtherEmotions = [
    "anxious",
    "confused",
    "overwhelmed",
    "tired",
    "bored",
    "guilty",
    "proud",
    "confident",
    "surprised",
    "excited", 
    "happy", 
    "creative",
    "angry",
    "frustrated",
    "skeptical",
  ];

  // Helper function to shuffle an array
  function shuffleArray(array) {
    let curId = array.length;
    while (0 !== curId) {
      let randId = Math.floor(Math.random() * curId);
      curId -= 1;
      let tmp = array[curId];
      array[curId] = array[randId];
      array[randId] = tmp;
    }
    return array;
  }
  // Emotion Options for the current level
  const levelEmotions = {
    1: currentQuestion
      ? new Set([
          currentQuestion.correctEmotion,
          ...shuffleArray(
            allOtherEmotions.filter(
              (emotion) => emotion !== currentQuestion.correctEmotion
            )
          ).slice(0, 2),
        ])
      : new Set(),
    2: currentQuestion
      ? new Set([
          currentQuestion.correctEmotion,
          ...peacefulEmotions
            .filter((emotion) => emotion !== currentQuestion.correctEmotion)
            .slice(0, 1),
          ...shuffleArray(
            allOtherEmotions.filter(
              (emotion) => emotion !== currentQuestion.correctEmotion
            )
          ).slice(0, 1),
        ])
      : new Set(),
    3: currentQuestion
      ? new Set([
          currentQuestion.correctEmotion,
          ...peacefulEmotions
            .filter((emotion) => emotion !== currentQuestion.correctEmotion)
            .slice(0, 2),
        ])
      : new Set(),
  };

  // Randomly select a question when the component is mounted
  useEffect(() => {
    const remainingStories = questions.filter(
      (story) => !answeredStories.includes(story.text)
    );
  
    if (remainingStories.length === 0) {
      navigate("/congrats");
      return;
    }
  
    const randomIndex = Math.floor(Math.random() * remainingStories.length);
    setCurrentQuestion(remainingStories[randomIndex]);
  }, [answeredStories]);

  const handleBackClick = () => {
    setScore(0);
    navigate("/emotionLearningGame");
  };

  let emotionsToDisplay = [];
  if (currentQuestion) {
    emotionsToDisplay = Array.from(levelEmotions[level]);
  }

  emotionsToDisplay = shuffle(emotionsToDisplay);

  const generateNewQuestion = () => {
    // Filtering stories that were answered correctly
    const remainingStories = questions.filter(
      (story) => !answeredStories.includes(story.text)
    );
  
    if (remainingStories.length === 0) {
      navigate("/congrats"); 
      return;
    }

    const randomIndex = Math.floor(Math.random() * remainingStories.length);
    setCurrentQuestion(remainingStories[randomIndex]);
  };

  useEffect(() => {
    generateNewQuestion();
    setLevel(1); // Reset level to 1
  }, []);

  const handleEmotionClick = (emotion) => {
    if (currentQuestion.correctEmotion === emotion) {
      // Correct answer
      const newScore = score + 1;
      setScore(newScore);
      setModalMessage("Correct answer! Keep going!");
      setShowModal(true);

      // Add the answered story to the list of answered stories
      setAnsweredStories([...answeredStories, currentQuestion.text]);
      
      // I have commented out the correct navigation as it doesnt hold state of scores when navigating back and we dont have a DB right now to store the scores.
      // navigate("/correct", {
      //   state: {
      //     emotion: currentQuestion.correctEmotion,
      //   },
      // });
      // Check for consecutive correct answers
      if (score + 1 >= 3) {
        // If there are 3 consecutive correct answers, level up
        setLevel(level + 1);
        // Reset consecutive correct answers count
        setScore(0);

        //if level is now 4 then navigate to the next game
        if (level + 1 > 3) {
          navigate("/congrats"); // Change this to navigate to a page that congratulates user for completing the game
          return;
        }
      }
    } else {
      // Incorrect answer
      setScore(0); // Reset consecutive correct answers count on incorrect answer
      navigate("/incorrect", {
        state: {
          emotion: currentQuestion.correctEmotion,
        },
      });
    }
    // Generate a new question
    generateNewQuestion();
  };

  return (
    <div className="emotion-main">
      {showModal && (
        <>
          <div className="overlay"></div>
          <div className="modal">
            <img className="modal-image" src={correctImage} alt="correct" />
            <span style={{ fontSize: "30px", fontWeight: "600" }}>
              {modalMessage}
            </span>
            <button
              style={{ boreder: "none", padding: "10px" }}
              onClick={() => setShowModal(false)}
            >
              Close
            </button>
          </div>
        </>
      )}
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
        <p>Level: {level}</p>
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
export default LearningPeaceful;
