import axios from 'axios';

// Constantes de configuration de l'url pour accéder au service de gestion des projets
const API_URL = 'http://localhost:8080/api/projects';

/**
 * Fonction qui retourne le token d'authentification
 * 
 * @returns le token jwt de l'utilisateur
 */
const getAuthToken = () => {
    return sessionStorage.getItem('jwtToken'); 
};

/**
 * Récupérer les projets par nom d'utilisateur ou il est propriétaire
 * 
 * @param {string} owner - l'email de l'utilisateur qui est propriétaire du projet
 * @returns response.data - la liste des projets
 */
export const getProjectsByOwner = async (owner) => {
    try {
        const response = await axios.get(`${API_URL}/owner/${owner}`, {
            headers: {
                'Authorization': `Bearer ${getAuthToken()}` 
            }
        });
        return response.data;
    } catch (error) {
        console.error("Erreur lors de la récupération des projets:", error);
        throw error;
    }
};

/**
 * Créer un nouveau projet
 * 
 * @param {Object} projectData - le projet à créer
 * @returns response.data - le message de réussite ou d'échec
 */
export const createProject = async (projectData) => {
    try {
        const response = await axios.post(API_URL, projectData, {
            headers: {
                'Authorization': `Bearer ${getAuthToken()}`
            }
        });
        return response.data;
    } catch (error) {
        console.error("Erreur lors de la création du projet:", error);
        throw error;
    }
};

/**
 * Récupérer un projet par ID
 * 
 * @param {number} projectId - l'id du projet à récupérer
 * @returns response.data - le projet qui à l'id projectId
 */
export const getProjectById = async (projectId) => {
    try {
        const response = await axios.get(`${API_URL}/${projectId}`, {
            headers: {
                'Authorization': `Bearer ${getAuthToken()}` // Add Bearer token to the headers
            }
        });
        return response.data;
    } catch (error) {
        console.error("Erreur lors de la récupération du projet:", error);
        throw error;
    }
};

/**
 *  Mettre à jour un projet
 * 
 * @param {number} projectId - l'id du projet à modifier
 * @param {Object} projectData  - le projet à modifier
 * @returns response.data - le projet modifier
 */
export const updateProject = async (projectId, projectData) => {
    try {
        const response = await axios.put(`${API_URL}/${projectId}`, projectData, {
            headers: {
                'Authorization': `Bearer ${getAuthToken()}`
            }
        });
        return response.data;
    } catch (error) {
        console.error("Erreur lors de la mise à jour du projet:", error);
        throw error;
    }
};

/**
 * Supprimer un projet par ID
 * 
 * @param {number} projectId - l'id du projet à supprimer
 * @returns true si supprimer, false sinon
 */
export const deleteProjectById = async (projectId) => {
    try {
        const response = await axios.delete(`${API_URL}/${projectId}`, {
            headers: {
                'Authorization': `Bearer ${getAuthToken()}`,
                'Content-Type': 'application/json'
            }
        });
        return response.data; // Renvoie true si la suppression a réussi
    } catch (error) {
        console.error("Erreur lors de la suppression du projet:", error);
        throw error;
    }
};

/**
 *  Récupérer les membres d'un projet par ID
 * 
 * @param {number} projectId - l'id du projet où récuperer les membres
 * @returns response.data - une liste d'emails
 */
export const getMembersByProjectId = async (projectId) => {
    try {
        const response = await axios.get(`${API_URL}/${projectId}/members`, {
            headers: {
                'Authorization': `Bearer ${getAuthToken()}` // Add Bearer token to the headers
            }
        });
        return response.data; // retourne la liste des membres
    } catch (error) {
        console.error("Error fetching members:", error);
        throw error; // Lève l'erreur pour la gérer dans le composant appelant
    }
};
 
/**
 * Ajouter un membre à un projet
 * 
 * @param {number} projectId - l'id du projet ou ajouter les membres
 * @param {string} memberEmail - l'emil du membre à ajouter au projet
 */
export const addMemberToProject = async (projectId, memberEmail) => {
    try {
        await axios.post(`${API_URL}/${projectId}/members`, { memberEmail }, {  
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${getAuthToken()}`
            }
        });
        console.log("Member added successfully");
    } catch (error) {
        console.error("Error adding member:", error);
        throw error; 
    }
};
 
/**
 * Supprimer un membre d'un projet
 * 
 * @param {number} projectId - l'id du projet où supprimer un membre
 * @param {string} memberEmail - l'email du membre à supprimer
 */
export const deleteMemberFromProject = async (projectId, memberEmail) => {
    
    try {
        const token = getAuthToken();
        console.log("Using JWT token:", token);
        await axios.delete(`${API_URL}/${projectId}/members`, {
            data: { memberEmail }, // Correct: utilisez 'data' pour envoyer l'email dans le corps
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });        
        console.log("Member deleted successfully");
    } catch (error) {
        console.error("Error deleting member:", error);
        throw error; // Lève l'erreur pour la gérer dans le composant appelant
    }
};

/**
 * Récupère les projets dont memberEmail est membre
 * 
 * @param {string} memberEmail - l'email du membre
 * @returns response.data - les projets
 */
export const getProjectsByMember = async (memberEmail) => {
    try {
        const response = await axios.get(`${API_URL}/member/${memberEmail}`, {
            headers: {
                'Authorization': `Bearer ${getAuthToken()}` // Add Bearer token to the headers
            }
        });
        return response.data; // Renvoie la liste des projets
    } catch (error) {
        console.error("Error fetching projects by member:", error);
        throw error; // Rejette l'erreur pour un traitement ultérieur
    }
};