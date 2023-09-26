import React, { useState, useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import "./Correct.css";
import correctImage from "../image/correctImage.png";
import { FaArrowAltCircleRight } from "react-icons/fa";

const Congrats = ({ emotion }) => {
  const navigate = useNavigate();

  const handleNextClick = () => {
    navigate("/EmotionLearningGame");
  };

  return (
    <div className="correct-main">
      <div className="first-text">
        <h1>Congratulations! You did a great job!</h1>
      </div>
      <div className="correct-image">
        <img src={correctImage} />
      </div>
      <div className="second-text">
        <h1>You passed, now it's time to move on to the next game! </h1>
      </div>
      <div className="next-button">
        {" "}
        <h1>Next</h1>
        <FaArrowAltCircleRight
          style={{ marginLeft: "20px", cursor: "pointer" }}
          size={70}
          onClick={handleNextClick}
        />
      </div>
    </div>
  );
};

export default Congrats;
