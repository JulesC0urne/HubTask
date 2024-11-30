import React, { useState, useEffect, useRef, useContext } from 'react';
import { useNavigate, useMatch } from 'react-router-dom';
import DarkModeToggle from "../DarkModalToggle/DarkModalToggle"; // Mode clair/sombre
import { logout } from '../../service/AuthService'; // Fonction de déconnexion
import { TaskContext } from '../../context/TaskContext/TaskContext';

const Navbar = () => {
  const navigate = useNavigate();
  const match = useMatch('/task/:projectId');
  const [isMenuOpen, setIsMenuOpen] = useState(false); // Gestion du menu utilisateur
  const [isDarkMode, setIsDarkMode] = useState(false); // Mode sombre/clair
  const menuRef = useRef(null); // Référence pour gérer les clics extérieurs
  const userEmail = sessionStorage.getItem('mail') || 'admin@hubtask.io';
  const { resetTasks } = useContext(TaskContext);

  // Vérifier le mode sombre au chargement
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

  // Fonction pour gérer la déconnexion
  const handleLogout = () => {
    logout();
    resetTasks();
    navigate('/');
  };

  // Gérer les clics extérieurs pour fermer le menu
  const handleClickOutside = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setIsMenuOpen(false);
    }
  };

  const handleProjectClick = () => {
    resetTasks();
    navigate('/project');
  }

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <nav className="bg-neutral-100 dark:bg-neutral-800 shadow-md sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center py-2 px-6">
        {/* Logo et Titre */}
        <div className="flex items-center">
          <img
            src="/images/Logo.png"
            alt="Logo"
            className="w-48 h-auto"
          />
          
        </div>

        {/* Liens de navigation */}
        <ul className="hidden md:flex gap-6 items-center">
          {match && (
            <li>
              <button
                className="text-neutral-700 dark:text-white-500 hover:text-primary dark:hover:text-primary-500 transition"
                onClick={() => handleProjectClick()}
              >
                Mes Projets
              </button>
            </li>
          )}
        </ul>

        {/* Menu Utilisateur */}
        <div className="relative">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="flex items-center gap-2 text-neutral-700 dark:text-white-500 hover:text-primary dark:hover:text-primary-500 transition"
          >
            <span>{userEmail || "Utilisateur"}</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>
          {isMenuOpen && (
            <div
              ref={menuRef}
              className="absolute right-0 mt-2 w-48 bg-white-500 dark:bg-neutral-800 rounded-lg shadow-lg py-2 z-10"
            >
              <button
                onClick={() => navigate('/settings')}
                className="block w-full px-4 py-2 text-left text-neutral-700 dark:text-white-500 hover:bg-neutral-100 dark:hover:bg-neutral-700 transition"
              >
                Mon Profil
              </button>
              <button
                onClick={handleLogout}
                className="block w-full px-4 py-2 text-left text-red-500 hover:bg-red-100 dark:hover:bg-red-700 hover:text-white-500 transition"
              >
                Déconnexion
              </button>
            </div>
          )}
        </div>

        {/* Bouton Mode sombre/clair */}
        <DarkModeToggle toggleDarkMode={() => setIsDarkMode(!isDarkMode)} />
      </div>
    </nav>
  );
};

export default Navbar;