import React, { useContext, useEffect, useState } from 'react';
import { TaskContext } from '../../context/TaskContext/TaskContext';
import AlertService from '../../utils/AlertService';

/**
 * Composant TicketModal pour afficher et modifier les informations d'un ticket
 * 
 * @param {Object} props - Les propriétés du composant
 * @param {boolean} props.isOpen - Boolean pour savoir si la modal est ouverte ou non
 * @param {function} props.onClose - Function du container parent qui ferme la modal et reset les champs.
 * @param {Date} props.projectBegin - Date de début du projet
 * @param {Date} props.projectEnd - Date de fin du projet
 * @returns {JSX.Element} La modal du champs concerner pour un ticket donné
 */
const TicketModal = ({ isOpen, onClose, projectBegin, projectEnd}) => {
    
    // Extraction des informations du contexte TaskContext (ticket sélectionné, mise à jour de ticket, champ sélectionné à modifier)
    const { selectedTicket, updateTicket, ticketField } = useContext(TaskContext);

    // État local pour stocker les informations mises à jour du ticket
    const [updatedTicket, setUpdatedTicket] = useState(selectedTicket);

    // Hook useEffect pour mettre à jour l'état local chaque fois que selectedTicket change
    useEffect(() => {
        if (selectedTicket) {
            setUpdatedTicket(selectedTicket);
        }
    }, [selectedTicket]);

    /**
     * Fonction appelée lorsque l'utilisateur modifie un champ du ticket dans le modal
     * 
     * @param {*} event
     */
    const handleChange = (event) => {
        setUpdatedTicket({
            ...updatedTicket,
            [event.target.name]: event.target.value
        });
    };

    /**
     * Fonction appelée pour fermer le modal (passée depuis le parent)
     */
    const handleClose = () => {
        onClose();
    };
    
    /**
     * Fonction pour accepter les modifications et mettre à jour le ticket
     */
    const handleAccept = async () => {
        if(ticketField == "dueDate"){
            if (new Date(updatedTicket.dueDate) <= new Date(updatedTicket.createDate)){
                AlertService.info("La date d'échéance ne peut être inférieur à la date de création.");
                return;
            }
            if (new Date(updatedTicket.dueDate) > new Date(projectEnd)){
                AlertService.info("La date d'échéance ne peut être supérieur à la date de fin du projet.");
                return;
            }
            if (new Date(updatedTicket.dueDate) < new Date(projectBegin)){
                AlertService.info("La date d'échéance ne peut être inférieur à la date de début du projet.");
                return;
            }
        }
        await updateTicket(updatedTicket.createDate, updatedTicket);
        handleClose();
    };

    /**
     * Fonction pour rendre l'input approprié en fonction du champ sélectionné (title, description, dueDate)
     * 
     * @returns Un input ou un textarea en fonction champs selectionné
     */
    const renderField = () => {
        const fieldMapping = {
            description: (
                <textarea
                    aria-label="modal-description"
                    name="description"
                    value={updatedTicket.description}
                    onChange={handleChange}
                    className="w-full p-2 border rounded-lg text-sm bg-gray-100 dark:bg-neutral-700 dark:text-white-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            ),
            title: (
                <input
                    aria-label="modal-title"
                    type="text"
                    name="title"
                    value={updatedTicket.title}
                    onChange={handleChange}
                    className="w-full p-2 border rounded-lg text-sm bg-gray-100 dark:bg-neutral-700 dark:text-white-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            ),
            dueDate: (
                <input
                    aria-label="modal-dueDate"
                    type="datetime-local"
                    name="dueDate"
                    value={updatedTicket.dueDate.split('.')[0]} // Ensure proper format
                    onChange={handleChange}
                    className="w-full p-2 border rounded-lg text-sm bg-gray-100 dark:bg-neutral-700 dark:text-white-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            )
        };

        return fieldMapping[ticketField] || null; // Use ticketField to render the correct input
    };

    return isOpen ? (
        <div className="fixed inset-0 bg-black flex justify-center items-center z-50" role="dialog" aria-modal="true" aria-labelledby="modal-title">
            <div className="modal-content bg-white-500 dark:bg-neutral-800 rounded-lg shadow-lg p-6 max-w-lg w-full">
                <h2 id="modal-title" className="text-lg font-semibold text-neutral-900 dark:text-white-500 mb-4">Modifier {mapTitle(ticketField)}</h2>
                {renderField()}
                <div className="modal-buttons flex justify-end space-x-4 mt-4">
                    <button 
                        aria-label="close-button" 
                        className="cancel-button bg-red-200 text-white-200 dark:bg-red-700 dark:text-white-700 py-2 px-4 rounded-lg hover:bg-gray-300 dark:hover:bg-neutral-600 transition"
                        onClick={handleClose}
                    >
                        ✕ Annuler
                    </button>
                    <button 
                        aria-label="accept-button" 
                        className="accept-button bg-green-200 text-white-200 py-2 px-4 dark:bg-green-700 dark:text-white-700 rounded-lg hover:bg-green-600 transition"
                        onClick={handleAccept}
                    >
                        ✓ Accepter
                    </button>
                </div>
            </div>
        </div>
    ) : null;
};

export default TicketModal;

/**
 * Fonction qui translate le titre de l'anglais vers le francais
 * 
 * @param {string} title le titre du champs à translate
 * @returns le titre en francais
 */
const mapTitle = (title) => {
    switch (title) {
      case "dueDate":
        return "la date d'échéance";
      case "title":
        return "le titre";
      case "description":
        return "la description";
      default:
        return "";
    }
}