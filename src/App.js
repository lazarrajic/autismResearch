import React from "react";
import Login from "./pages/Login";
import HomePage from "./pages/HomePage";
import Navbar from "./components/Navbar";
import Games from "./pages/Games";
import Chatbot from "./pages/Chatbot";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";

function App() {
  return (
    <div>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/games" element={<Games />} />
          <Route path="/chatbot" element={<Chatbot />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
