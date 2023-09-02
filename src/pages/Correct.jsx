import React, { useState, useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import "./Correct.css";
import correctImage from "../image/correctImage.png";
import { FaArrowAltCircleRight } from "react-icons/fa";

const Correct = ({ emotion }) => {
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
      text: "You chose the correct emotion: Excited!",
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
    proud: {
      text: "You chose the correct emotion: Proud!",
      // image:
    },
    confident: {
      text: "You chose the correct emotion: Confident!",
      // image:
    },
    surprised: {
      text: "You chose the correct emotion: Surprised!",
      // image:
    },
    thoughtful: {
      text: "You chose the correct emotion: Thoughtful!",
      // image:
    },
    thankful: {
      text: "You chose the correct emotion: Thankful!",
      // image:
    },
    secure: {
      text: "You chose the correct emotion: Secure!",
      // image:
    },
    anxious: {
      text: "You chose the correct emotion: Anxious!",
      // image:
    },
    confused: {
      text: "You chose the correct emotion: Confused!",
      // image:
    },
    overwhelmed: {
      text: "You chose the correct emotion: Overwhelmed!",
      // image:
    },
    tired: {
      text: "You chose the correct emotion: Tired!",
      // image:
    },
    bored: {
      text: "You chose the correct emotion: Bored!",
      // image:
    },
    guilty: {
      text: "You chose the correct emotion: Guilty!",
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
