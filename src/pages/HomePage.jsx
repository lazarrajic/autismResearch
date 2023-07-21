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
      <div className="game" onClick={handleGameClick}></div>
      <div className="chatbot" onClick={handleChatbotClick}></div>
    </div>
  );
};

export default HomePage;
