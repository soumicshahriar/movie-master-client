// src/components/ThemeToggle.jsx
import React, { useEffect, useState } from "react";
import { FaMoon, FaSun } from "react-icons/fa";

const ThemeToggle = () => {
  const [theme, setTheme] = useState("night");

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "night";
    setTheme(savedTheme);
    document.documentElement.setAttribute("data-theme", savedTheme);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "night" ? "dark" : "night";
    setTheme(newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);
  };

  return (
    <button
      className="btn btn-ghost btn-circle text-primary"
      onClick={toggleTheme}
      title="Toggle Theme"
    >
      {theme === "night" ? <FaMoon /> : <FaSun />}
    </button>
  );
};

export default ThemeToggle;
