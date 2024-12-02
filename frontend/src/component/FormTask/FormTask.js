import React, { useState, useContext, useEffect } from 'react'; 
import { TaskContext } from '../../context/TaskContext/TaskContext'; 
import '@fortawesome/fontawesome-free/css/all.min.css';
import AlertService from '../../utils/AlertService';
import DarkModeToggle from "../DarkModalToggle/DarkModalToggle";

/**
 * Composant `FormTask`
 * Ce composant permet à l'utilisateur de créer une nouvelle tâche liée à un projet.
 * Il vérifie la validité des dates et affiche des alertes pour l'utilisateur.
 * 
 * @param {Object} props - Les propriétés du composant
 * @param {number} props.projectId - L'identifiant unique de la conversation
 * @returns {JSX.Element} Le formulaire pour créer une tâche
 */
const FormTask = ({projectId }) => { 
    
    // Récupère les fonctions et données du contexte des tâches
    const { addTicket, projectBegin, projectEnd } = useContext(TaskContext); 

    // Nom de la tâche
    const [projectName, setProjectName] = useState(""); 

    // Date d'échéance de la tâche
    const [projectDate, setProjectDate] = useState(""); 

    // Description de la tâche
    const [description, setDescription] = useState(""); 

    // Statut de la tâche
    const [status, setStatus] = useState("To Do"); 

    // État pour savoir si le mode sombre est activé
    const [isDarkMode, setIsDarkMode] = useState(false); 

    /**
     * Effet pour initialiser le mode sombre en fonction des préférences sauvegardées dans `localStorage`.
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
     * Elle crée un ticket et le soumet à l'API pour l'ajouter.
     */
    const handleSubmit = async (event) => {
        event.preventDefault(); // Empêche le comportement par défaut du formulaire.

        // Création d'un nouvel objet ticket à partir des valeurs des champs.
        const newTicket = {
            title: projectName, // Titre de la tâche.
            description: description, // Description de la tâche.
            createDate: new Date().toISOString(), // Date de création au format ISO.
            dueDate: projectDate, // Date d'échéance.
            status: status, // Statut de la tâche.
            userMail: sessionStorage.getItem('mail'), // Récupère l'email de l'utilisateur depuis sessionStorage.
            projectId: projectId // ID du projet auquel la tâche est associée.
        };

        if (new Date(projectDate) <= projectBegin || new Date(projectDate) > projectEnd){
            AlertService.info("La date de fin de la tâche doit correspondre aux dates du projet.");
            return;
        }

        try{
            await addTicket(newTicket); // Appelle la fonction addTicket pour ajouter la tâche.
            AlertService.success('Tâche crée avec succès.');
            resetFormFields(); // Réinitialise les champs du formulaire après la soumission réussie.
        }
        catch(error){
            AlertService.error('Erreur de création de la tâche.');
            console.log('Erreur de création de la tâche : ', error);
        }
    };

    /**
     * Fonction pour réinitialiser les champs du formulaire après une soumission réussie
     */
    const resetFormFields = () => {
        setProjectName(""); // Réinitialise le champ du nom de la tâche.
        setDescription(""); // Réinitialise le champ de la description.
        setProjectDate(""); // Réinitialise le champ de la date d'échéance.
        setStatus("To Do"); // Réinitialise le statut à "To Do".
    };

    return (
        <div className={`flex min-h-screen bg-white-500 dark:bg-neutral-800 p-4 rounded-xl shadow-lg`}>
        {/* Partie gauche : Formulaire */}
        <div className="w-full p-2 bg-white-500 dark:bg-neutral-800 text-white-500 ">
            <div className="text-center">
            <h1 className="text-2xl font-semibold text-neutral-500 dark:text-white-500 mb-6">
                Ajouter une Tâche
            </h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                {/* Champ Nom */}
                <input
                    type="text"
                    className="w-full px-4 py-2 border border-neutral-600 text-neutral-500 rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-primary dark:bg-neutral-700 dark:text-white-500"
                    placeholder="Nom de la tâche" // Placeholder pour le champ
                    value={projectName} // Valeur liée à l'état
                    onChange={(e) => setProjectName(e.target.value)} // Met à jour l'état lorsque l'utilisateur tape
                    required // Champ requis
                />

                {/* Champ Description */}
                <input
                    type="text"
                    placeholder="Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)} // Met à jour l'état de la description
                    required
                    className="w-full px-4 py-2 border border-neutral-600 text-neutral-500 rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-primary dark:bg-neutral-700 dark:text-white-500"
                />

                <input
                    type="datetime-local" // Type pour une entrée de date et heure
                    placeholder="Due date"
                    value={projectDate}
                    onChange={(e) => setProjectDate(e.target.value)} // Met à jour l'état de la date d'échéance
                    required
                    className="w-full px-4 py-2 border border-neutral-600 text-neutral-500 rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-primary dark:bg-neutral-700 dark:text-white-500"
                />

                <select
                    className="w-full px-4 py-2 border border-neutral-600 text-neutral-500 rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-primary dark:bg-neutral-700 dark:text-white-500" // Classe pour le style du select
                    value={status} // Valeur liée à l'état du statut
                    onChange={(e) => setStatus(e.target.value)} // Met à jour l'état lorsque l'utilisateur change le statut
                    required
                >
                    <option label="todo" value="To Do">To Do</option> // Options du select pour le statut
                    <option label="progress" value="In Progress">In Progress</option>
                    <option label="testing" value="In Testing">In Testing</option>
                    <option label="done" value="Done">Done</option>
                </select>

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

export default FormTask; 

