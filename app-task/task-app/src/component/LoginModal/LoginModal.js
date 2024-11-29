import React, { useState, useEffect } from "react";
import '@fortawesome/fontawesome-free/css/all.min.css';
import AlertService from '../../utils/AlertService';
import { login } from '../../service/AuthService';
import DarkModeToggle from "../DarkModalToggle/DarkModalToggle";


const LoginModal = ({ backClick, goToProject, goToSignup }) => {
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
    }, 4500);

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

  const handleBackClick = () => {
    backClick();
  };

  const handleSignupClick = () => {
    goToSignup();
  }

  const handleProjectClick = () => {
    goToProject();
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.target);

    const user = {
      username: data.get("Email"), 
      password: data.get("Password"),
      role: "USER"
    };

    try {
      const token = await login(user);
      console.log(token);
      AlertService.success('Connexion réussie !').then(() => {
        handleProjectClick();
      });
    } catch (error) {
      AlertService.error('Identifiants invalides, veuillez réessayer.');
    }
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


      {/* Formulaire à droite */}
      <div className={`w-1/2 h-screen flex justify-center items-center p-8 bg-white dark:bg-neutral-900`}>
        {/* Conteneur du formulaire */}
        <div className="w-full max-w-xl p-6 rounded-xl shadow-lg bg-white dark:bg-neutral-800 dark:text-white-500">
          {/* Logo au-dessus du formulaire */}
          <div className="mb-8 w-full text-center">
            <img
              src="/images/Logo.png"
              alt="Logo de l'app"
              className="w-48 h-auto mx-auto"
            />
          </div>

          <h1 className="text-3xl font-semibold mb-2 text-primary dark:text-white-500">Connectez-vous</h1>

          {/* Texte sous le titre */}
          <p className="text-sm text-neutral-600 dark:text-neutral-300 mb-6">
            Gérez vos projets, organisez vos tâches et restez productif grâce à notre application.
          </p>

          <form onSubmit={handleSubmit}>
            {/* Champ Email */}
            <div className="mb-4">
              <input 
                className="w-full px-4 py-2 border border-neutral-300 rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-primary dark:bg-neutral-700 dark:border-neutral-600 dark:text-white"
                type="email"
                id="Email"
                name="Email"
                placeholder="Entrez votre email"
                required
              />
            </div>

            {/* Champ Password */}
            <div className="mb-6">
              <input 
                className="w-full px-4 py-2 border border-neutral-300 rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-primary dark:bg-neutral-700 dark:border-neutral-600 dark:text-white"
                type="password"
                id="Password"
                name="Password"
                placeholder="********"
                required
              />
            </div>

            {/* Bouton submit */}
            <button
              type="submit"
              className="w-full py-3 bg-primary-500 text-white-500 rounded-md shadow-md hover:bg-primary-dark transition duration-300 mb-4 dark:bg-primary dark:hover:bg-primary-dark"
            >
              Se connecter
            </button>

            {/* Lien mot de passe oublié */}
            <div className="text-right">
              <a href="#" className="text-sm text-neutral-600 dark:text-neutral-300">Mot de passe oublié ?</a>
            </div>
          </form>

          {/* Lien pour l'inscription */}
          <div className="mt-4 text-right">
            <p className="text-sm text-neutral-600 dark:text-neutral-300">
              Vous n'avez pas de compte ?{" "}
              <button onClick={handleSignupClick} className="text-sm text-neutral-600 dark:text-neutral-300">Inscrivez-vous ici</button>
            </p>
          </div>
          
          {/* Retour */}
          <div className="mt-8 text-left">
            <button
              onClick={handleBackClick}
              className="text-sm text-neutral-600 hover:text-primary dark:text-neutral-300"
            >
              <i className="fas fa-arrow-left mr-2"></i> Retour
            </button>
          </div>
        </div>
      </div>
      <DarkModeToggle toggleDarkMode={toggleDarkMode} />
    </div>
  );
};

export default LoginModal;
