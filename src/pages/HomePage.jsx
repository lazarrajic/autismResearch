import React from "react";
import { useNavigate } from "react-router-dom";
import "./HomePage.css";

const HomePage = () => {
  const navigate = useNavigate();

  const handleGameClick = () => {
    navigate("/games");
  };

  const handleChatbotClick = () => {
    navigate("/chatbot");
  };

  return (
    <div className="main">
      <div className="top-bar"></div>
      <div className="options">
        <div className="option-1">
          <div className="game" onClick={handleGameClick}></div>
          <h1>Games</h1>
        </div>
        <div className="option-1">
          <div className="chatbot" onClick={handleGameClick}></div>
          <h1>Chatbot</h1>
        </div>
      </div>
      <div className="bottom-bar"></div>
    </div>
  );
};

export default HomePage;
