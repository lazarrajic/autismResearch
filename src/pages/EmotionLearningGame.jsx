import React from "react";
import { useNavigate } from "react-router-dom";
import "./EmotionLearningGame.css";
import { FaArrowAltCircleLeft } from "react-icons/fa";

const EmotionLearningGame = () => {
  const navigate = useNavigate();

  const handleGameClick = () => {
    navigate("/EmotionGame");
  };

  const handleMadGameClick = () => {
    navigate("/learningMad");
  };

  const handleJoyGameClick = () => {
    navigate("/learningJoy");
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
          <div className="joyful" onClick={handleJoyGameClick}></div>
          <h1>Joyful</h1>
        </div>

        <div className="game-option-1">
          <div className="powerful" onClick={handleGameClick}></div>
          <h1>Powerful</h1>
        </div>
        <div className="game-option-1">
          <div className="peaceful" onClick={handleGameClick}></div>
          <h1>Peaceful</h1>
        </div>
        <div className="game-option-1">
          <div className="scared" onClick={handleGameClick}></div>
          <h1>Scared</h1>
        </div>
        <div className="game-option-1">
          <div className="sad" onClick={handleGameClick}></div>
          <h1>Sad</h1>
        </div>

        <div className="game-option-1">
          <div className="mad" onClick={handleMadGameClick}></div>
          <h1>Mad</h1>
        </div>
      </div>
      <div className="game-bottom-bar"></div>
    </div>
  );
};

export default EmotionLearningGame;
