import React, { useEffect, useState } from "react";
import { MoonIcon, SunIcon } from "@heroicons/react/24/outline"; // Import des icônes


const DarkModeToggle = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Initialisation du mode sombre depuis localStorage
  useEffect(() => {
    const savedMode = localStorage.getItem("theme");
    if (savedMode === "dark") {
      document.documentElement.classList.add("dark");
      setIsDarkMode(true);
    } else {
      document.documentElement.classList.remove("dark");
      setIsDarkMode(false);
    }
  }, []);

  // Fonction pour basculer le mode
  const toggleDarkMode = () => {
    if (isDarkMode) {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
      setIsDarkMode(false);
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
      setIsDarkMode(true);
    }
  };

  return (
    <button
      onClick={toggleDarkMode}
      className="fixed bottom-4 right-4 bg-white-500 dark:bg-neutral-700 text-white p-4 rounded-full shadow-lg hover:bg-primary-accent transition"
    >
       {isDarkMode ? (
        <SunIcon className="h-6 w-6 text-white-500" /> // Icône pour le mode clair
      ) : (
        <MoonIcon className="h-6 w-6" /> // Icône pour le mode sombre
      )}
    </button>
  );
};

export default DarkModeToggle;
