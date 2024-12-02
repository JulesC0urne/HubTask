import React, { useState, useEffect } from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';
import AlertService from '../../utils/AlertService';
import { signup } from '../../service/AuthService';
import DarkModeToggle from "../DarkModalToggle/DarkModalToggle";

/**
 * Composant `SignupModal`
 * Ce composant représente une fenêtre modale pour l'inscription d'un utilisateur.
 * Il permet à l'utilisateur de s'inscrire via un formulaire avec un email et un mot de passe et une vérification de mot de passe.
 * Il gère également le mode sombre, l'affichage d'un slider d'images, et la navigation vers d'autres pages de l'application.
 * 
 * @param {Object} props - Les propriétés passées au composant
 * @param {Function} props.backClick - Fonction qui gère le clic sur le bouton "Retour"
 * @param {Function} props.goToToLogin - Fonction qui redirige vers le formulaire de connexion
 * @returns {JSX.Element} Le formulaire de connexion avec le slider d'images et les boutons de navigation
 */
const SignupModal = ({ backClick , goToLogin}) => {

  // État pour l'index de l'image affichée dans le slider
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // État pour savoir si le mode sombre est activé
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Tableau contenant les URLs des images à afficher dans le slider
  const images = [
    "https://images.pexels.com/photos/4342498/pexels-photo-4342498.jpeg",
    "https://images.pexels.com/photos/3182755/pexels-photo-3182755.jpeg",
    "https://images.pexels.com/photos/3727511/pexels-photo-3727511.jpeg",
  ];

  // useEffect pour changer l'image affichée toutes les 4,5 secondes (rotation du slider)
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 4500);

    return () => clearInterval(interval);
  }, []);

  // useEffect pour gérer l'état du thème (clair ou sombre) en fonction de la préférence de l'utilisateur
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

  /**
   * Méthode pour gérer le clic sur le bouton "Retour"
   */
  const handleBackClick = () => {
    backClick();
  };
  
  /**
   * Méthode pour gérer la navigation vers le formulaire de connexion
   */
  const handleLoginClick = () => {
    goToLogin();
  }

  /**
   * Méthode pour gérer l'envoi du formulaire d'inscription
   * 
   * @param {*} event 
   */
  const handleSubmit = async (event) => {
      event.preventDefault();
      const data = new FormData(event.target);

      const email = data.get("Email");
      const password = data.get("Password");
      const password2 = data.get("Password2");

      // Validation des mots de passe
      if (password !== password2) {
          AlertService.error('Les mots de passes doivent être identiques.');
          return;
      }

      // Validation de l'email (format email)
      const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      if (!emailRegex.test(email)) {
          AlertService.error('Veuillez entrer un email valide.');
          return;
      }

      const user = {
          username: email,
          password: password,
          role: "USER"
      };

      try {
          const response = await signup(user);
          AlertService.success('Inscription réussie !').then((result) => {
              if (result.isConfirmed) {
                  console.log('Utilisateur inscrit:', response);
                  handleLoginClick();
              }
          });
      } catch (error) {
          AlertService.error('Échec de la création du compte. Veuillez réessayer.');
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
        <div className="w-full max-w-xl p-6 rounded-xl shadow-lg dark:bg-neutral-800 dark:text-white-500">
          {/* Logo au-dessus du formulaire */}
          <div className="mb-8 w-full text-center">
            <img
              src="/images/Logo.png"
              alt="Logo de l'app"
              className="w-48 h-auto mx-auto"
            />
          </div>

          <h1 className="text-3xl font-semibold mb-2 text-primary dark:text-white-500">Inscrivez-vous</h1>

          {/* Texte sous le titre */}
          <p className="text-sm text-neutral-600 dark:text-neutral-300 mb-6">
            Créez votre compte pour accéder à la gestion de vos projets et tâches.
          </p>

          <form onSubmit={handleSubmit}>
            {/* Champ Email */}
            <div className="mb-4">
              <input
                className="w-full px-4 py-2 border border-neutral-300 rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-primary dark:bg-neutral-700 dark:border-neutral-600 dark:text-white-500"
                type="email"
                id="Email"
                name="Email"
                placeholder="Entrez votre email"
                required
              />
            </div>

            {/* Champ Password */}
            <div className="mb-4">
              <input
                className="w-full px-4 py-2 border border-neutral-300 rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-primary dark:bg-neutral-700 dark:border-neutral-600 dark:text-white-500"
                type="password"
                id="Password"
                name="Password"
                placeholder="********"
                required
              />
            </div>

            {/* Champ Confirm Password */}
            <div className="mb-6">
              <input
                className="w-full px-4 py-2 border border-neutral-300 rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-primary dark:bg-neutral-700 dark:border-neutral-600 dark:text-white-500"
                type="password"
                id="Password2"
                name="Password2"
                placeholder="Confirmer le mot de passe"
                required
              />
            </div>

            {/* Bouton submit */}
            <button
              type="submit"
              className="w-full py-3 bg-primary-500 text-white-500 rounded-md shadow-md hover:bg-primary-dark transition duration-300 mb-4 dark:bg-primary dark:hover:bg-primary-dark"
            >
              S'inscrire
            </button>
          </form>

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

      {/* Bouton de changement de mode sombre */}
      <DarkModeToggle toggleDarkMode={() => setIsDarkMode(!isDarkMode)} />
    </div>
  );
};

export default SignupModal;
