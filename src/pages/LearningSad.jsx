import React, { useState, useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import "./EmotionGame.css";
import emotiongameimage from "../image/emotiongameimage.png";
import correctImage from "../image/correctImage.png";
import { FaArrowAltCircleLeft } from "react-icons/fa";
import shuffle from "lodash/shuffle";

const LearningSad = () => {
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

  //state for level
  const [level, setLevel] = useState(1);

  const questions = [...story_set_sad];

  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  const sadEmotions = ["tired", "bored", "guilty"];
  const allOtherEmotions = [
    "anxious",
    "confused",
    "overwhelmed",
    "excited", 
    "happy", 
    "creative",
    "proud",
    "confident",
    "surprised",
    "thoughtful",
    "thankful",
    "secure",
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
          ...sadEmotions
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
          ...sadEmotions
            .filter((emotion) => emotion !== currentQuestion.correctEmotion)
            .slice(0, 2),
        ])
      : new Set(),
  };

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
    emotionsToDisplay = Array.from(levelEmotions[level]);
  }

  emotionsToDisplay = shuffle(emotionsToDisplay);

  const generateNewQuestion = () => {
    const randomIndex = Math.floor(Math.random() * questions.length);
    setCurrentQuestion(questions[randomIndex]);
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
export default LearningSad;
