import React, { useState, useEffect, useContext } from 'react';
import { ProjectContext } from '../../context/ProjectContext/ProjectProvider';
import AlertService from '../../utils/AlertService';
import DarkModeToggle from "../DarkModalToggle/DarkModalToggle";

const FormProject = () => {
  const { addProject } = useContext(ProjectContext);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [beginDate, setBeginDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [isDarkMode, setIsDarkMode] = useState(false);

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
