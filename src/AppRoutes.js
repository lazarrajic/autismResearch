import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Games from "./pages/Games";
import Chatbot from "./pages/Chatbot";
import EmotionGame from "./pages/EmotionGame";
import Correct from "./pages/Correct";
import Incorrect from "./pages/Incorrect";

const AppRoutes = () => {
  const location = useLocation();

  // Get the emotion prop from the location state
  const emotion = location.state?.emotion;

  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/games" element={<Games />} />
      <Route path="/chatbot" element={<Chatbot />} />
      <Route path="/emotiongame" element={<EmotionGame />} />
      <Route path="/correct" element={<Correct emotion={emotion} />} />
      <Route path="/incorrect" element={<Incorrect emotion={emotion} />} />
    </Routes>
  );
};

export default AppRoutes;
