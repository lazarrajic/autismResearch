import React, { useState, useEffect } from "react";
import "./Admin.css";
import { useNavigate } from "react-router-dom";

const Admin = () => {
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate("/");
  };

  const [levelFromLocalStorageJoy, setLevelFromLocalStorageJoy] = useState(
    localStorage.getItem("levelJoy") || "1"
  );

  const [consecutiveScoreJoy, setConsecutiveScoreJoy] = useState(
    localStorage.getItem("highestConsecutiveScoreJoy") || "0"
  );

  const isJoyCompleted =
    localStorage.getItem("learningJoyCompleted") === "true";

  useEffect(() => {
    // Listen for changes in local storage
    const handleStorageChange = () => {
      setLevelFromLocalStorageJoy(localStorage.getItem("levelJoy"));
      setConsecutiveScoreJoy(
        localStorage.getItem("highestConsecutiveScoreJoy")
      );
    };

    window.addEventListener("storage", handleStorageChange);

    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  return (
    <div className="admin">
      <div className="admin-title">
        <button className="admin-btn" onClick={handleBackClick}>
          {" "}
          Return{" "}
        </button>
        <h1>Progress Tracker</h1>
      </div>
      <div className="tracker-container">
        <div className="emotion-completion">
          <span style={{ fontWeight: 600 }}>Emotion:</span> Joy
          <p>
            {" "}
            <span style={{ fontWeight: 600 }}>Level: </span>
            {levelFromLocalStorageJoy}
          </p>
          <p>
            <span style={{ fontWeight: 600 }}>Highest Consecutive Score:</span>{" "}
            {consecutiveScoreJoy}
          </p>
          <p>
            <span style={{ fontWeight: 600 }}>Completion Status: </span>
            {isJoyCompleted ? "✅" : "❌"}
          </p>
        </div>
        <div className="correct-incorrect">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. In expedita
          ipsum a aspernatur porro voluptatum dignissimos laboriosam similique,
          natus unde.
        </div>
      </div>
    </div>
  );
};

export default Admin;
