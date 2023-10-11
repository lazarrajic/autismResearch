import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./HomePage.css";

const HomePage = () => {
  const navigate = useNavigate();

  const [showPopup, setShowPopup] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleGameClick = () => {
    navigate("/EmotionLearningGame");
  };

  const handleChatbotClick = () => {
    navigate("/chatbot");
  };

  const handleQuizClick = () => {
    navigate("/emotiongame");
  };

  const handleAdminClick = () => {
    setShowPopup(true);
  };

  const handlePopupClose = () => {
    setShowPopup(false);
  };

  const handlePopupSubmit = () => {
    // Need to replace with actual username and password check
    if (username === "admin" && password === "password") {
      navigate("/admin");
    } else {
      alert("Invalid username or password!");
    }
  };

  return (
    <div className="main">
      {showPopup && (
        <div className="popup">
          <div className="popup-content">
            <h2>Login to Admin</h2>
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button onClick={handlePopupSubmit}>Login</button>
            <button onClick={handlePopupClose}>Close</button>
          </div>
        </div>
      )}
      <div className="top-bar">
        <button className="admin-btn" onClick={handleAdminClick}>
          Admin
        </button>
      </div>
      <div className="options">
        <div className="option-1">
          <div className="emotion-game" onClick={handleGameClick}></div>
          <h1>Emotion game</h1>
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
