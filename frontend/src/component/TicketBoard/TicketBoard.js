import React, { useContext, useEffect, useState } from 'react';
import { TaskContext } from '../../context/TaskContext/TaskContext';
import TicketModal from '../TicketModal/TicketModal';
import AlertService from '../../utils/AlertService';

/**
 * Composant principal TicketBoard permettant de drag and drop les tickets dans quatre colonnes 
 * (A faire, En progression, En test, Fait)
 * 
 * @returns {JSX.Element} Le tableau de tickets
 */
const TicketBoard = () => {
  // Extraction des variables du contexte TaskContext
  const { projectEnd, 
          projectBegin, 
          tickets, 
          updateTicket, 
          deleteTicket, 
          selectedTicket, 
          selectTicket, 
          clearSelectedTicket, 
          selectTicketField, 
          clearTicketField 
        } = useContext(TaskContext);

  // État pour savoir si le modal est ouvert ou non
  const [isModalOpen, setIsModalOpen] = useState(false);

  /**
   * Fonction appelée lors du début du drag d'un ticket
   * 
   * @param {*} event 
   * @param {Object} ticket Le ticket à drag & drop
   */
  const handleDragStart = (event, ticket) => {
    event.dataTransfer.setData('ticket', JSON.stringify(ticket));
  };

  /**
   * Fonction appelée lors du drop d'un ticket dans une nouvelle colonne
   * 
   * @param {*} event 
   * @param {string} newStatus Le nouveau status du ticket après le drop
   */
  const handleDrop = (event, newStatus) => {
    event.preventDefault();
    const ticketData = JSON.parse(event.dataTransfer.getData('ticket'));
    updateTicket(ticketData.createDate, { ...ticketData, status: newStatus });
  };

  /**
   * Fonction pour supprimer un ticket
   * 
   * @param {Date} createDate la date de création du ticket à supprimer
   */
  const handleDelete = async (createDate) => {
    try {
      await deleteTicket(createDate);
      AlertService.success('Tâche supprimée avec succès !');
    } catch (error) {
      AlertService.error("Erreur lors de la suppression de la tâche.");
    }
  };

  /**
   * Fonction pour ouvrir le modal avec un ticket et un champ spécifique (par exemple titre, description)
   * 
   * @param {Object} ticket le ticket pour lequel ouvrir la modal
   * @param {string} field le champs du ticket à modifier
   */
  const openModal = (ticket, field) => {
    selectTicket(ticket);
    selectTicketField(field);
    setIsModalOpen(true);
  };

  /**
   * Fonction pour fermer le modal
   */
  const closeModal = () => {
    clearSelectedTicket();
    clearTicketField();
    setIsModalOpen(false);
  };

  return (
    <div className="flex gap-4 p-0 bg-neutral-100 dark:bg-neutral-900 min-h-screen">
      {["To Do", "In Progress", "In Testing", "Done"].map((status) => (
        <div
          key={status}
          className="flex-1 flex flex-col bg-white-800 dark:bg-neutral-800 p-4 rounded-lg shadow-sm"
          onDrop={(event) => handleDrop(event, status)}
          onDragOver={(event) => event.preventDefault()}
          style={{
            boxShadow: "4px 0 8px rgba(0, 0, 0, 0.1), -4px 0 8px rgba(0, 0, 0, 0.1)", // Ombres à gauche et à droite
          }}
        >
          <div 
            className={`text-lg font-semibold text-white mb-4 text-center rounded-lg h-[50px] flex items-center justify-center ${getStatusColor(status).split(' ')[0]} dark:${getStatusColor(status).split(' ')[1]}`}  
          >
            {mapStatus(status)}
          </div>



          {/* Liste des tickets */}
          <div 
            className="flex flex-col gap-4 overflow-y-auto shadow-md"
          >
            {tickets.filter(ticket => ticket.status === status).map((ticket) => (
              <div
                key={ticket.createDate}
                className="p-4 bg-white-500 dark:bg-neutral-700 rounded-md transition cursor-pointer shadow-md"
                draggable
                onDragStart={(event) => handleDragStart(event, ticket)}
              >
                {/* Titre */}
                <div className="flex justify-between items-center mb-2">
                  <strong
                    className="text-sm font-semibold text-neutral-900 dark:text-white"
                    onClick={() => openModal(ticket, "title")}
                  >
                    {ticket.title}
                  </strong>
                  <button
                    className="text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-500 transition"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDelete(ticket.createDate);
                    }}
                  >
                    ✕
                  </button>
                </div>

                {/* Dates */}
                <div className="flex justify-between items-center text-sm mb-4">
                  <div className="flex items-center gap-2 w-auto">
                      <span className="inline-block bg-green-100 text-green-600 dark:bg-green-700 dark:text-green-300 px-2 py-1 rounded-full text-xs font-medium">
                          Créé:<br /> {new Date(ticket.createDate).toLocaleDateString('fr-FR')}
                      </span>
                  </div>
                  <div className="flex items-center gap-2" onClick={() => openModal(ticket, "dueDate", projectBegin, projectEnd)}>
                      <span className="inline-block bg-red-100 text-red-600 dark:bg-red-700 dark:text-red-300 px-2 py-1 rounded-full text-xs font-medium text-right">
                          Échéance:<br />  {new Date(ticket.dueDate).toLocaleDateString('fr-FR')}
                      </span>
                  </div>
              </div>

                {/* Description */}
                <div className="text-sm text-neutral-700 dark:text-neutral-300 mt-2" onClick={() => openModal(ticket, "description")}>
                  {ticket.description || "Aucune description"}
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}

      {/* Modal */}
      {selectedTicket && (
        <TicketModal isOpen={isModalOpen} onClose={closeModal} projectBegin={projectBegin} projectEnd={projectEnd}/>
      )}
    </div>
  );
};

/**
 * Fonction utilitaire pour gérer les couleurs des statuts
 * 
 * @param {*} status status pour lequel avoir la couleur
 * @returns Un string représentant la couleur pour le mode clair et le mode sombre
 */
const getStatusColor = (status) => {
  switch (status) {
    case "To Do":
      return "bg-red-200 bg-red-700";
    case "In Progress":
      return "bg-yellow-200 bg-yellow-700";
    case "In Testing":
      return "bg-orange-200 bg-orange-700";
    case "Done":
      return "bg-green-200 bg-green-700";
    default:
      return "neutral";
  }
};

/**
 * Map le status en anglais pour l'afficher en francais
 * 
 * @param {*} status le status en anglais
 * @returns Le status en francais
 */
const mapStatus = (status) => {
  switch (status) {
    case "To Do":
      return "A faire";
    case "In Progress":
      return "En progression";
    case "In Testing":
      return "En test";
    case "Done":
      return "Fait";
    default:
      return "";
  }
}

export default TicketBoard;
