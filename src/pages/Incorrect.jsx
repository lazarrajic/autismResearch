import React, { useState, useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import incorrectImage from "../image/incorrectImage.png";
import "./Incorrect.css";
import { FaArrowAltCircleRight } from "react-icons/fa";

const Incorrect = ({ emotion }) => {
  const navigate = useNavigate();

  const handleNextClick = () => {
    switch (emotion) {
      case "angry":
      case "skeptical":
      case "frustrated":
        navigate("/learningMad");
        break;

      case "excited":
      case "happy":
      case "creative":
        navigate("/learningJoy");
        break;
      default:
        // Handle other emotions or unknown cases
        navigate("/"); // Redirect to a default page if needed
        break;
    }
  };
  const emotions = {
    excited: {
      text: "You chose the incorrect emotion: Excited!",
      // image:
    },
    happy: {
      text: "You chose the incorrect emotion: Happy!",
      // image:
    },
    creative: {
      text: "You chose the incorrect emotion: Creative!",
      // image:
    },
    proud: {
      text: "You chose the incorrect emotion: Proud!",
      // image:
    },
    confident: {
      text: "You chose the incorrect emotion: Confident!",
      // image:
    },
    surprised: {
      text: "You chose the incorrect emotion: Surprised!",
      // image:
    },
    thoughtful: {
      text: "You chose the incorrect emotion: Thoughtful!",
      // image:
    },
    thankful: {
      text: "You chose the incorrect emotion: Thankful!",
      // image:
    },
    secure: {
      text: "You chose the incorrect emotion: Secure!",
      // image:
    },
    anxious: {
      text: "You chose the incorrect emotion: Anxious!",
      // image:
    },
    confused: {
      text: "You chose the incorrect emotion: Confused!",
      // image:
    },
    overwhelmed: {
      text: "You chose the incorrect emotion: Overwhelmed!",
      // image:
    },
    tired: {
      text: "You chose the incorrect emotion: Tired!",
      // image:
    },
    bored: {
      text: "You chose the incorrect emotion: Bored!",
      // image:
    },
    guilty: {
      text: "You chose the incorrect emotion: Guilty!",
      // image:
    },
    angry: {
      text: "You chose the incorrect emotion: Angry!",
      // image:
    },
    frustrated: {
      text: "You chose the incorrect emotion: Frustrated!",
      // image:
    },
    skeptical: {
      text: "You chose the incorrect emotion: Skeptical!",
      // image:
    },
  };
  
  // Getting the text and image for the current emotion
  const { text, image } = emotions[emotion];

  return (
    <div className="incorrect-main">
      <div className="first-text">
        <h1>{text}</h1>
      </div>
      <div className="second-text">
        <h1>Keep trying. You got this!</h1>
      </div>
      <div className="incorrect-image">
        <img src={incorrectImage} />
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

export default Incorrect;
