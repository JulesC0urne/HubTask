import axios from 'axios';

const API_URL = 'http://localhost:8080/api/projects'; // Modifiez l'URL en fonction de votre configuration

const getAuthToken = () => {
    return sessionStorage.getItem('jwtToken');  // Adjust according to your token storage logic
};

// Récupérer les projets par nom d'utilisateur
export const getProjectsByOwner = async (owner) => {
    try {
        const response = await axios.get(`${API_URL}/owner/${owner}`, {
            headers: {
                'Authorization': `Bearer ${getAuthToken()}` // Add Bearer token to the headers
            }
        });
        return response.data;
    } catch (error) {
        console.error("Erreur lors de la récupération des projets:", error);
        throw error;
    }
};

// Créer un nouveau projet
export const createProject = async (projectData) => {
    try {
        const response = await axios.post(API_URL, projectData, {
            headers: {
                'Authorization': `Bearer ${getAuthToken()}` // Add Bearer token to the headers
            }
        });
        return response.data;
    } catch (error) {
        console.error("Erreur lors de la création du projet:", error);
        throw error;
    }
};

// Récupérer un projet par ID
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

// Mettre à jour un projet
export const updateProject = async (projectId, projectData) => {
    try {
        const response = await axios.put(`${API_URL}/${projectId}`, projectData, {
            headers: {
                'Authorization': `Bearer ${getAuthToken()}` // Add Bearer token to the headers
            }
        });
        return response.data;
    } catch (error) {
        console.error("Erreur lors de la mise à jour du projet:", error);
        throw error;
    }
};

// Supprimer un projet par ID
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

// Récupérer les membres d'un projet par ID
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

// Ajouter un membre à un projet
export const addMemberToProject = async (projectId, memberEmail) => {
    try {
        await axios.post(`${API_URL}/${projectId}/members`, { memberEmail }, {  // Envoyer un objet JSON
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${getAuthToken()}`
            }
        });
        console.log("Member added successfully");
    } catch (error) {
        console.error("Error adding member:", error);
        throw error; // Lève l'erreur pour la gérer dans le composant appelant
    }
};


// Supprimer un membre d'un projet
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