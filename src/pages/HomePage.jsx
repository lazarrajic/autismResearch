import React from "react";
import { useNavigate } from "react-router-dom";
import "./HomePage.css";

const HomePage = () => {
  const navigate = useNavigate();

  const handleGameClick = () => {
    navigate("/EmotionLearningGame");
  };

  const handleChatbotClick = () => {
    navigate("/chatbot");
  };

  const handleQuizClick = () => {
    navigate("/emotiongame");
  };

  return (
    <div className="main">
      <div className="top-bar"></div>
      <div className="options">
        <div className="option-1">
          <div className="emotins_game" onClick={handleGameClick}></div>
          <h1>Emotins game</h1>
        </div>
        <div className="option-1">
          <div className="chatbot" onClick={handleChatbotClick}></div>
          <h1>Chatbot</h1>
        </div>
        <div className="option-1">
          <div className="quiz" onClick={handleQuizClick}></div>
          <h1>Quiz</h1>
        </div>
      </div>
      <div className="bottom-bar"></div>
    </div>
  );
};

export default HomePage;
