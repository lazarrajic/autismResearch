import React, { useState, useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import "./EmotionGame.css";
import birthday from "../../src/image/JoyfulExcitedBirthday.png";
import aquarium from "../../src/image/JoyfulExcitedAquarium.png";
import cinema from "../../src/image/JoyfulExcitedCinema.png";
import swimming from "../../src/image/JoyfulHappySwimming.webp";
import park from "../../src/image/JoyfulHappyIceCreams.png";
import readingbook from "../../src/image/JoyfulHappyRead.png";
import ocean from "../../src/image/JoyfulCreativeArt.webp";
import tiger from "../../src/image/JoyfulCreativeTiger.gif";
import toys from "../../src/image/JoyfulCreativeToys.webp";
import correctImage from "../image/correctImage.png";
import incorrectImage from "../image/incorrectImage.png";
import { FaArrowAltCircleLeft } from "react-icons/fa";
import shuffle from "lodash/shuffle";

const LearningJoy = () => {
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

  //state for level
  const [levelJoy, setLevelJoy] = useState(1);

  //state variable for correct answered stories
  const [answeredStories, setAnsweredStories] = useState([]);

  const questions = [...story_set_joyful];

  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [showIncorrectModal, setShowIncorrectModal] = useState(false);
  const [incorrectModalMessage, setIncorrectModalMessage] = useState("");
  const [showLevelUpModal, setShowLevelUpModal] = useState(false);
  const [levelUpModalMessage, setLevelUpModalMessage] = useState("");

  // State for tracking answered questions and their outcomes
  const [questionsLog, setQuestionsLog] = useState([]);

  //State fro incorrect answers
  const [wrongAnswersCount, setWrongAnswersCount] = useState(() => {
    return parseInt(localStorage.getItem("wrongAnswersCount")) || 0;
  });

  //State for highest consecutive score
  const [highestConsecutiveScoreJoy, setHighestConsecutiveScoreJoy] = useState(
    () => {
      return parseInt(localStorage.getItem("highestConsecutiveScoreJoy")) || 0;
    }
  );

  const joyfulEmotions = ["excited", "happy", "creative"];
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
          ...joyfulEmotions
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
          ...joyfulEmotions
            .filter((emotion) => emotion !== currentQuestion.correctEmotion)
            .slice(0, 2),
        ])
      : new Set(),
  };

  const handleBackClick = () => {
    setScore(0);
    navigate("/emotionLearningGame");
  };

  let emotionsToDisplay = [];
  if (currentQuestion) {
    emotionsToDisplay = Array.from(levelEmotions[levelJoy]);
  }

  emotionsToDisplay = shuffle(emotionsToDisplay);

  const generateNewQuestion = () => {
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
  }, [answeredStories]);

  useEffect(() => {
    setLevelJoy(1); // Reset level to 1
  }, []);

  const handleEmotionClick = (emotion) => {
    if (currentQuestion.correctEmotion === emotion) {
      // Correct answer
      const newScore = score + 1;
      setScore(newScore);
      setModalMessage("Correct answer! Keep going!");
      setShowModal(true);
      setQuestionsLog([
        ...questionsLog,
        { question: currentQuestion.text, result: "correct" },
      ]);

      if (newScore > highestConsecutiveScoreJoy) {
        setHighestConsecutiveScoreJoy(newScore);
      }
      // Add the answered story to the list of answered stories
      setAnsweredStories([...answeredStories, currentQuestion.text]);
      // Check for consecutive correct answers
      if (score + 1 >= 3) {
        // If there are 3 consecutive correct answers, level up
        setLevelJoy(levelJoy + 1);
        // Reset consecutive correct answers count
        setScore(0);
        setLevelUpModalMessage("Congratulations! You leveled up!");
        setShowModal(false);
        setShowLevelUpModal(true);

        //if level is now 4 then navigate to the next game
        if (levelJoy + 1 > 3) {
          localStorage.setItem("learningJoyCompleted", "true");
          navigate("/congrats");
          return;
        }
      } else {
        setShowModal(true); // Show the "Correct" modal only if not leveling up
      }
    } else {
      // Incorrect answer
      setScore(0); // Reset consecutive correct answers count on incorrect answer
      const newWrongScore = wrongAnswersCount + 1;
      setWrongAnswersCount(newWrongScore);
      setIncorrectModalMessage("Oops! That's not right. Try again!");
      setShowIncorrectModal(true);
      setQuestionsLog([
        ...questionsLog,
        { question: currentQuestion.text, result: "incorrect" },
      ]);
    }
    // Generate a new question
    generateNewQuestion();
  };

  useEffect(() => {
    localStorage.setItem("score", score);
    localStorage.setItem("levelJoy", levelJoy);
    localStorage.setItem(
      "highestConsecutiveScoreJoy",
      highestConsecutiveScoreJoy
    );
    localStorage.setItem("wrongAnswersCount", wrongAnswersCount);
    localStorage.setItem("questionsLog", JSON.stringify(questionsLog));
  }, [
    score,
    levelJoy,
    highestConsecutiveScoreJoy,
    wrongAnswersCount,
    questionsLog,
  ]);

  return (
    <div className="emotion-main">
      {showModal && (
        <>
          <div className="overlay"></div>
          <div className="modal">
            <img className="modal-image" src={correctImage} alt="correct" />
            <span
              style={{
                fontSize: "30px",
                fontWeight: "600",
                textAlign: "center",
              }}
            >
              {modalMessage}
            </span>
            <button
              style={{ border: "none", padding: "10px", cursor: "pointer" }}
              onClick={() => setShowModal(false)}
            >
              Close
            </button>
          </div>
        </>
      )}
      {showIncorrectModal && (
        <>
          <div className="overlay"></div>
          <div className="modal-incorrect">
            <img className="modal-image" src={incorrectImage} alt="incorrect" />{" "}
            <span
              style={{
                fontSize: "30px",
                fontWeight: "600",
                textAlign: "center",
              }}
            >
              {incorrectModalMessage}
            </span>
            <button
              style={{ border: "none", padding: "10px", cursor: "pointer" }}
              onClick={() => setShowIncorrectModal(false)}
            >
              Close
            </button>
          </div>
        </>
      )}
      {showLevelUpModal && (
        <>
          <div className="overlay"></div>
          <div className="modal">
            <img className="modal-image" src={correctImage} alt="incorrect" />{" "}
            <span
              style={{
                fontSize: "30px",
                fontWeight: "600",
                textAlign: "center",
              }}
            >
              {levelUpModalMessage}
            </span>
            <button
              style={{ border: "none", padding: "10px", cursor: "pointer" }}
              onClick={() => setShowLevelUpModal(false)}
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
        <p
          style={{
            fontSize: "25px",
            fontWeight: "800",
            textShadow: "0 0 5px #41414193, 0 0 15px #f0f0f0, 0 0 20px #f0f0f0",
          }}
        >
          Level: {levelJoy}
        </p>
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
export default LearningJoy;
