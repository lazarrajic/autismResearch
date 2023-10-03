import React, { useState, useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import "./EmotionGame.css";
import emotiongameimage from "../image/emotiongameimage.png";
import correctImage from "../image/correctImage.png";
import { FaArrowAltCircleLeft } from "react-icons/fa";
import shuffle from "lodash/shuffle";

const LearningScared = () => {
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
  
  //state for level
  const [level, setLevel] = useState(1);

  //state variable for correct answered stories
  const [answeredStories, setAnsweredStories] = useState([]);

  const questions = [...story_set_scared];
  
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  const scaredEmotions = ["anxious", "confused", "overwhelmed"];
  const allOtherEmotions = [
    "excited", 
    "happy", 
    "creative",
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
          ...scaredEmotions
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
          ...scaredEmotions
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
export default LearningScared;
