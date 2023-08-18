import React from "react";
import Login from "./pages/Login";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import AppRoutes from "./AppRoutes"; // Import the AppRoutes component

import { BrowserRouter as Router } from "react-router-dom";

function App() {
  return (
    <div>
      <Router>
        {/* <Navbar /> */}
        <AppRoutes />
        {/* <Footer /> */}
      </Router>
    </div>
  );
}

export default App;
