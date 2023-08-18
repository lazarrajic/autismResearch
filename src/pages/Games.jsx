import React from "react";
import { useNavigate } from "react-router-dom";
import "./Games.css";
import { FaArrowAltCircleLeft } from "react-icons/fa";

const Games = () => {
  const navigate = useNavigate();

  const handleGameClick = () => {
    navigate("/EmotionGame");
  };

  const handleChatbotClick = () => {
    navigate("/MathGame");
  };
  const handleBackClick = () => {
    navigate("/");
  };

  return (
    <div className="game-main">
      <div className="game-top-bar">
        <div className="emotion-back-button" onClick={handleBackClick}>
          <FaArrowAltCircleLeft size={40} />
        </div>
      </div>
      <div className="game-options">
        <div className="game-option-1">
          <div className="emotion" onClick={handleGameClick}></div>
          <h1>Emotions</h1>
        </div>
        <div className="game-option-1">
          <div className="math" onClick={handleGameClick}></div>
          <h1>Math</h1>
        </div>
      </div>
      <div className="game-bottom-bar"></div>
    </div>
  );
};

export default Games;
