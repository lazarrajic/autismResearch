import React, { useState, useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import "./EmotionGame.css";
import laundry from "../../src/image/PowerfulConfidentLaundry.png";
import shoes from "../../src/image/PowerfulConfidentShoes.png";
import teeth from "../../src/image/PowerfulConfidentTeeth.png";

import cup from "../../src/image/PowerfulProudCup.png";
import project from "../../src/image/PowerfulProudProject.png";
import uniform from "../../src/image/PowerfulProudUniform.png";

import balloon from "../../src/image/PowerfulSurprisedBalloon.png";
import box from "../../src/image/PowerfulSurprisedBox.webp";
import grandpa from "../../src/image/PowerfulSurprisedGrandpa.png";
import correctImage from "../image/correctImage.png";
import { FaArrowAltCircleLeft } from "react-icons/fa";
import shuffle from "lodash/shuffle";

const LearningPowerful = () => {
  const navigate = useNavigate();

  // POWERFUL
  const stories_proud = [
    {
      image: cup,
      text: "Today I had a competition in my school. We all had to line up and run, whoever ran fastest would win the medal and the Cup. I focused on the competition and I won. I was feeling very…",
      correctEmotion: "proud",
    },
    {
      image: project,
      text: "Today my friend did the best art project in class and we all loved it. I was feeling very…",
      correctEmotion: "proud",
    },
    {
      image: uniform,
      text: "Today I got ready for school all by myself. I wore my uniform and packed my backpack all by myself. I was feeling very…",
      correctEmotion: "proud",
    },
  ];

  // POWERFUL
  const stories_confident = [
    {
      image: shoes,
      text: "Today my dad offered to help me put on my shoes, but I told my dad that I don't need help, I can put them on by myself. I was feeling very…",
      correctEmotion: "confident",
    },
    {
      image: laundry,
      text: "Today I came back from school, washed my hands and ate lunch. After finishing I saw my mom folding clothes and I asked her to teach me how to fold clothes. She taught me and I could do it all by myself. I was feeling very…",
      correctEmotion: "confident",
    },
    {
      image: teeth,
      text: "Today I brushed my teeth all by myself. I brushed them everywhere and I made sure there was no food left. It was my first time to do it by myself. I was feeling very…",
      correctEmotion: "confident",
    },
  ];

  // POWERFUL
  const stories_surprised = [
    {
      image: balloon,
      text: "Today my friend sat on a balloon and the balloon popped. Nobody was expecting it would pop, thus we all got…",
      correctEmotion: "surprised",
    },
    {
      image: grandpa,
      text: "Today my mom was supposed to pick me up from school, but instead my Grandfather came to pick me up. I was so happy and I felt very…",
      correctEmotion: "surprised",
    },
    {
      image: box,
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

  //state for level
  const [level, setLevel] = useState(1);

  const questions = [...story_set_powerful];

  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  const powerfulEmotions = ["proud", "confident", "surprised"];
  const allOtherEmotions = [
    "anxious",
    "confused",
    "overwhelmed",
    "tired",
    "bored",
    "guilty",
    "excited", 
    "happy", 
    "creative",
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
          ...powerfulEmotions
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
          ...powerfulEmotions
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
export default LearningPowerful;
