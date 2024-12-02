import React, { useState, useEffect, useContext } from 'react';
import { ProjectContext } from '../../context/ProjectContext/ProjectProvider';
import AlertService from '../../utils/AlertService';
import DarkModeToggle from "../DarkModalToggle/DarkModalToggle";

/**
 * Composant `FormProject`
 * Ce composant permet à l'utilisateur de créer un projet en remplissant un formulaire.
 * Il vérifie que les dates saisies sont valides et affiche des alertes si nécessaire.
 * 
 * @returns {JSX.Element} Le formulaire pour créer une tâche
 */
const FormProject = () => {
  
  // Accède à la fonction `addProject` du contexte
  const { addProject } = useContext(ProjectContext); 
  
  // État pour le nom du projet
  const [name, setName] = useState(""); 
  
  // État pour la description du projet
  const [description, setDescription] = useState(""); 
  
  // État pour la date de début
  const [beginDate, setBeginDate] = useState(""); 
  
  // État pour la date de fin
  const [endDate, setEndDate] = useState(""); 
  
  // État pour savoir si le mode sombre est activé
  const [isDarkMode, setIsDarkMode] = useState(false); 

  /**
   * Effet pour initialiser le mode sombre selon la préférence enregistrée dans `localStorage`
   * Si le mode sombre est enregistré, il est appliqué lors du premier rendu du composant.
   */
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
   * Fonction qui gère la soumission du formulaire.
   * Elle vérifie les dates saisies, crée un objet `newProject` et le transmet à la fonction `addProject`.
   */
  const handleSubmit = async (event) => {
    event.preventDefault();

    const newProject = {
       name: name,
       description: description,
       owner: sessionStorage.getItem('mail'),
       startDate: beginDate,
       endDate: endDate,
    };

    if (new Date(beginDate) >= new Date(endDate)) {
      AlertService.info('La date de début doit être inférieure à la date de fin.');
      return;
    }

    if (new Date(beginDate) < new Date() || new Date(endDate) < new Date()) {
      AlertService.info("Les dates ne peuvent pas être inférieures à la date d'aujourd'hui");
      return;
    }

    try {
      await addProject(newProject);
      AlertService.success('Projet créé avec succès.');
      resetFormFields();
    } catch (error) {
      AlertService.error('Erreur lors de la création du projet.');
      console.error('Erreur:', error);
    }
  };

  /**
   * Fonction qui réinitialise les champs du formulaire à leur valeur initiale
   */
  const resetFormFields = () => {
    setName("");
    setDescription("");
    setBeginDate("");
    setEndDate("");
  };

  return (
    <div className={`flex min-h-screen bg-white-500 dark:bg-neutral-800 p-4 rounded-xl shadow-lg`}>
      {/* Partie gauche : Formulaire */}
      <div className="w-full p-2 bg-white-500 dark:bg-neutral-800 text-white-500 ">
        <div className="text-center">
          <h1 className="text-2xl font-semibold text-neutral-500 dark:text-white-500 mb-6">
            Ajouter un projet
          </h1>
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Champ Nom */}
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Nom du projet"
              className="w-full px-4 py-2 border border-neutral-600 text-neutral-500 rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-primary dark:bg-neutral-700 dark:text-white-500"
              required
            />

            {/* Champ Description */}
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Description"
              className="w-full px-4 py-2 border border-neutral-600 text-neutral-500 rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-primary dark:bg-neutral-700 dark:text-white-500"
              required
            />

            {/* Champ Date de début */}
            <input
              type="datetime-local"
              value={beginDate}
              onChange={(e) => setBeginDate(e.target.value)}
              className="w-full px-4 py-2 border border-neutral-600 text-neutral-500 rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-primary dark:bg-neutral-700 dark:text-white-500"
              required
            />

            {/* Champ Date de fin */}
            <input
              type="datetime-local"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="w-full px-4 py-2 border border-neutral-600 text-neutral-500 rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-primary dark:bg-neutral-700 dark:text-white-500"
              required
            />

            {/* Bouton Ajouter */}
            <button
              type="submit"
              className="w-full px-8 py-3 bg-primary-500 text-white-500 dark:bg-primary-500 rounded-md shadow-lg hover:bg-primary-accent transition duration-300"
            >
              Ajouter
            </button>
          </form>
        </div>
      </div>

      {/* Bouton de changement de mode sombre */}
      <DarkModeToggle toggleDarkMode={() => setIsDarkMode(!isDarkMode)} />
    </div>
  );
};

export default FormProject;
