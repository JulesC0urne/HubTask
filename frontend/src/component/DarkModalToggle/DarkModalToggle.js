import React, { useEffect, useState } from "react";
import { MoonIcon, SunIcon } from "@heroicons/react/24/outline"; // Import des icônes

/**
 * Composant `DarkModeToggle`
 * Permet à l'utilisateur de basculer entre le mode sombre et le mode clair.
 * L'état du mode est sauvegardé dans `localStorage` pour que le mode soit persistant entre les sessions.
 * 
 * @returns {JSX.Element} Le formulaire pour créer une tâche
 */
const DarkModeToggle = () => {
  
  // Déclaration de l'état pour savoir si le mode sombre est activé ou non
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

  /**
   * Effet d'initialisation qui est exécuté au chargement du composant
   * Vérifie dans le `localStorage` si un mode spécifique (clair ou sombre) a été sauvegardé
   * et applique le mode correspondant.
   */
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
        <SunIcon className="h-6 w-6 text-white-500" /> 
      ) : (
        <MoonIcon className="h-6 w-6" /> 
      )}
    </button>
  );
};

export default DarkModeToggle;
