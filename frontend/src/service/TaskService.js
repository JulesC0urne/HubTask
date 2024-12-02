import axios from 'axios';

// Constantes de configuration de l'url pour accéder au service de gestion des tâches
const url = "http://localhost:8080/api/tasks";

/**
 * Fonction qui retourne le token d'authentification
 * 
 * @returns le token jwt de l'utilisateur
 */
const getAuthToken = () => {
  return sessionStorage.getItem('jwtToken');
};

/**
 * Récupère la liste des tâches
 * 
 * @returns response.data - list of tasks
 */
export async function getAllTasks() {
  try {
    const response = await axios.get(url, {
      headers: {
        'Authorization': `Bearer ${getAuthToken()}`
      }
    });
    return response.data; 
  } catch (error) {
    console.error('Erreur lors de la récupération des tâches:', error.response ? error.response.data : error.message);
    throw error; 
  }
}

/**
 * Créer une nouvelle tâche
 * 
 * @param {Object} task - la tâche à créer
 * @returns response.data - la tâche crée
 */
export async function createTask(task) {
  try {
    const response = await axios.post(`${url}/create`, task, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${getAuthToken()}`
      }
    });

    console.log('Tâche créée avec succès:', response.data);
    return response.data; 
  } catch (error) {
    console.error('Erreur de création de tâche:', error.response ? error.response.data : error.message);
    throw error; 
  }
}

/**
 * Modifie une tâche
 * 
 * @param {Date} createDate - la date de création de la tâche à modifier
 * @param {Object} updatedTicket - la tâche modifié
 * @returns la tâche modifié
 */
export const updateTask = async (createDate, updatedTicket) => {

  return await axios.put(`${url}/update?createDate=${createDate}`, updatedTicket, {
      headers: {
          'Authorization': `Bearer ${getAuthToken()}`,
          'Content-Type': 'application/json',
      },
  });
};

/**
 * Récupère la tâche avec l'id id
 * 
 * @param {number} id - l'id de la tâche à récupérer
 * @returns response.data - la tâche avec l'id id
 */
export async function getTaskById(id) {
  try {
    const response = await axios.get(`${url}/${id}`, {
      headers: {
        'Authorization': `Bearer ${getAuthToken()}`
      }
    });
    return response.data; 
  } catch (error) {
    console.error('Erreur lors de la récupération de la tâche:', error.response ? error.response.data : error.message);
    throw error; 
  }
}

/**
 * Récupère la liste de tâches associés à l'email de l'utilisateur
 * 
 * @param {string} userEmail - l'email de l'utilisateur associé aux tâches à récupérer
 * @returns response.data - la liste de tâches
 */
export async function getTasksByUserEmail(userEmail) {
  try {
    const response = await axios.get(`${url}/user/${userEmail}`, {
      headers: {
        'Authorization': `Bearer ${getAuthToken()}` 
      }
    });
    return response.data;
  } catch (error) {
    console.error('Erreur lors de la récupération des tâches de l\'utilisateur:', error.response ? error.response.data : error.message);
    throw error;
  }
}

/**
 * Supprimer la tâche avec l'id id
 * 
 * @param {number} id - l'id de la tâche à supprimer
 */
export async function deleteTask(id) {
  try {
    await axios.delete(`${url}/${id}`, {
      headers: {
        'Authorization': `Bearer ${getAuthToken()}`
      }
    });
    console.log(`Tâche ${id} supprimée avec succès`);
  } catch (error) {
    console.error('Erreur de suppression de la tâche:', error.response ? error.response.data : error.message);
    throw error; 
  }
}

/**
 * Supprime la tâche avec la date de création
 * 
 * @param {Date} createDate - la date de la tâche à supprimer
 * @returns true si supprimer, false sinon.
 */
export const deleteTaskByCreateDate = async (createDate) => {
  try {
    const response = await axios.delete(`${url}/delete`, {
      params: { createDate },
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${getAuthToken()}` 
      }
    });
    return response.data;
  } catch (error) {
    console.error("Erreur lors de la suppression de la tâche:", error);
    throw error;
  }
};

/**
 * Récupère la liste des tâches d'un projet.
 * 
 * @param {number} projectId - l'id du projet associé aux tâches
 * @returns liste de tâches
 */
export const getTasksByProjectId = async (projectId) => {
  try {
      const response = await axios.get(`${url}/project/${projectId}`, {
        headers: {
          'Authorization': `Bearer ${getAuthToken()}` // Add Bearer token to the headers
        }
      });
      return response.data; // Renvoie les tâches récupérées
  } catch (error) {
      console.error("Erreur lors de la récupération des tâches par projet:", error);
      throw error;
  }
};