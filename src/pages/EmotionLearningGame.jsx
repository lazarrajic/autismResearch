import React from "react";
import { useNavigate } from "react-router-dom";
import "./EmotionLearningGame.css";
import { FaArrowAltCircleLeft } from "react-icons/fa";

const EmotionLearningGame = () => {
  const navigate = useNavigate();
  const isGameCompleted =
    localStorage.getItem("learningJoyCompleted") === "true";
  console.log("Game Completion Status:", isGameCompleted);

  const handleJoyGameClick = () => {
    navigate("/learningJoy");
  };
  const handlePeacefulGameClick = () => {
    navigate("/learningPeaceful");
  };
  const handlePowerfulGameClick = () => {
    navigate("/learningPowerful");
  };
  const handleSadGameClick = () => {
    navigate("/learningSad");
  };
  const handleScaredGameClick = () => {
    navigate("/learningScared");
  };
  const handleMadGameClick = () => {
    navigate("/learningMad");
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
          <h1>Joyful {isGameCompleted && <span>✔️</span>}</h1>
        </div>
        <div className="game-option-1">
          <div className="powerful" onClick={handlePowerfulGameClick}></div>
          <h1>Powerful</h1>
        </div>
        <div className="game-option-1">
          <div className="peaceful" onClick={handlePeacefulGameClick}></div>
          <h1>Peaceful</h1>
        </div>
        <div className="game-option-1">
          <div className="scared" onClick={handleScaredGameClick}></div>
          <h1>Scared</h1>
        </div>
        <div className="game-option-1">
          <div className="sad" onClick={handleSadGameClick}></div>
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
