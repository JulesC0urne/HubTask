import React, { useState, useEffect } from "react";
import { CheckCircleIcon, ClipboardDocumentCheckIcon, ClockIcon } from "@heroicons/react/24/outline";
import DarkModeToggle from "../DarkModalToggle/DarkModalToggle";

const HomePage = ({ loginClick, signupClick }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const images = [
    "https://images.pexels.com/photos/4342498/pexels-photo-4342498.jpeg",
    "https://images.pexels.com/photos/3182755/pexels-photo-3182755.jpeg",
    "https://images.pexels.com/photos/3727511/pexels-photo-3727511.jpeg",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000); // Changer l'image toutes les 5 secondes

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const savedMode = localStorage.getItem("theme");
    if (savedMode === "dark") {
      setIsDarkMode(true);
      document.documentElement.classList.add("dark");
    } else {
      setIsDarkMode(false);
      document.documentElement.classList.remove("dark");
    }
  }, []);

  const toggleDarkMode = () => {
    setIsDarkMode(prevMode => {
      const newMode = !prevMode;
      document.documentElement.classList.toggle("dark", newMode);
      localStorage.setItem("theme", newMode ? "dark" : "light");
      return newMode;
    });
  };

  return (
    <div className={`flex min-h-screen bg-white-500 dark:bg-neutral-900`}>
      {/* Slider à gauche */}
      <div className="w-1/2 h-screen relative overflow-hidden">
        <div className="w-full h-full rounded-lg shadow-luxe">
          <img
            src={images[currentImageIndex]}
            alt="Slider"
            className="w-full h-full object-cover transition-transform duration-500 ease-in-out rounded-lg"
          />
        </div>
      </div>

      {/* Contenu à droite */}
      <div className={`w-1/2 h-screen flex flex-col bg-white justify-center items-start p-8`}>
        {/* Logo */}
        <div className="mb-12">
          <img
            src="/images/Logo.png"
            alt="Logo de l'app"
            className="w-48 h-auto"
          />
        </div>

        {/* Box de description */}
        <div className="w-full p-8 bg-white dark:bg-neutral-800 dark:text-white-500 rounded-xl shadow-lg">
          <h1 className="text-2xl font-semibold text-neutral-900 dark:text-white-500 mb-4">
            Des processus efficaces pour gérer des projets de toutes dimensions.
          </h1>
          <p className="text-sm text-neutral-500 dark:text-white-500">
            Cette application vous aide à organiser vos tâches quotidiennes de manière efficace. Gérez vos priorités et suivez vos progrès de façon simple et élégante. Rejoignez-nous et commencez à organiser vos tâches dès aujourd'hui.
          </p>
        </div>

        {/* Fonctionnalités de l'app */}
        <div className="w-full flex gap-8 mt-8">
          <div className="flex flex-col items-center p-6 bg-white dark:bg-neutral-800 dark:text-white-500 rounded-xl shadow-lg">
            <CheckCircleIcon className="h-12 w-12 text-primary-dark dark:text-white-500" />
            <h3 className="text-base font-semibold my-4 text-neutral-900 dark:text-white-500">Organisation</h3>
            <p className="text-center text-sm text-neutral-600 dark:text-neutral-300">
              Organisez vos tâches par priorité pour une meilleure gestion.
            </p>
          </div>

          <div className="flex flex-col items-center p-6 bg-white dark:bg-neutral-800 dark:text-white-500 rounded-xl shadow-lg">
            <ClipboardDocumentCheckIcon className="h-12 w-12 text-primary-dark dark:text-white-500" />
            <h3 className="text-base font-semibold my-4 text-neutral-900 dark:text-white-500">Suivi</h3>
            <p className="text-center text-sm text-neutral-600 dark:text-neutral-300">
              Suivez vos progrès et atteignez vos objectifs plus facilement.
            </p>
          </div>

          <div className="flex flex-col items-center p-6 bg-white dark:bg-neutral-800 dark:text-white-500 rounded-xl shadow-lg">
            <ClockIcon className="h-12 w-12 text-primary-dark dark:text-white-500" />
            <h3 className="text-base font-semibold my-4 text-neutral-900 dark:text-white-500">Rappels</h3>
            <p className="text-center text-sm text-neutral-600 dark:text-neutral-300">
              Recevez des rappels pour ne jamais manquer une deadline.
            </p>
          </div>
        </div>

        {/* Boutons Connexion et Inscription */}
        <div className="space-x-4 flex mt-8">
          <button
            onClick={loginClick}
            className="px-8 py-3 bg-primary-500 text-white-500 dark:bg-primary-500 rounded-md shadow-lg hover:bg-primary-accent transition duration-300"
          >
            Connexion
          </button>
          <button
            onClick={signupClick}
            className="px-8 py-3 bg-white-500 dark:bg-neutral-800 dark:text-white-500 rounded-md shadow-lg hover:bg-primary-accent transition duration-300"
          >
            Inscription
          </button>
        </div>
      </div>

      <DarkModeToggle toggleDarkMode={toggleDarkMode} />
    </div>
  );
};

export default HomePage;
