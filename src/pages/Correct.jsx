import React, { useState, useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import "./Correct.css";
import correctImage from "../image/correctImage.png";
import { FaArrowAltCircleRight } from "react-icons/fa";

const Correct = ({ emotion }) => {
  const navigate = useNavigate();

  const handleNextClick = () => {
    navigate("/emotiongame");
  };
  const emotions = {
    excited: {
      text: "You chose the correct emotion: Angry!",
      // image:
    },
    happy: {
      text: "You chose the correct emotion: Happy!",
      // image:
    },
    creative: {
      text: "You chose the correct emotion: Creative!",
      // image:
    },
    angry: {
      text: "You chose the correct emotion: Angry!",
      // image:
    },
    frustrated: {
      text: "You chose the correct emotion: Frustrated!",
      // image:
    },
    skeptical: {
      text: "You chose the correct emotion: Skeptical!",
      // image:
    },
  };

  // Getting the text and image for the current emotion
  const { text, image } = emotions[emotion];

  return (
    <div className="correct-main">
      <div className="first-text">
        <h1>Well Done. you did a great job!</h1>
      </div>
      <div className="correct-image">
        <img src={correctImage} />
      </div>
      <div className="second-text">
        <h1>{text}</h1>
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

export default Correct;
