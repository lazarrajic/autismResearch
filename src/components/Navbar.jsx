import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  const [activeItem, setActiveItem] = useState(null);
  const location = useLocation();
  const [openItem, setOpenItem] = useState(null);
  const [showMenu, setShowMenu] = useState(false);

  const menuItems = [
    { id: 1, title: "Home", link: "/" },
    { id: 2, title: "Games", link: "/games" },
    { id: 3, title: "ChatBot", link: "/chatbot" },
  ];

  return (
    <nav>
      <ul>
        {menuItems.map((item) => (
          <li
            key={item.id}
            className={
              location.pathname === item.link ? "nav-item active" : "nav-item"
            }
          >
            <Link
              to={item.link}
              className="nav-link"
              onClick={() => {
                setActiveItem(item.id);
                setOpenItem(null);
                setShowMenu(false);
              }}
            >
              {item.title}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default Navbar;
