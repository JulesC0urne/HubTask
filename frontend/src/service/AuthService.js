import axios from 'axios';

// Constantes de configuration de l'url pour accéder au service d'authentification
const url = "http://localhost:8080/api/auth"; 

/**
 * Fonction de connexion
 * 
 * @param {Object} user - Object user pour la connexion
 * @returns {string} accessToken - le token d'authentification
 */
export async function login(user) {
    try {
        const response = await axios.post(`${url}/login`, user, {
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const accessToken = response.data;

        sessionStorage.setItem('jwtToken', accessToken);
        sessionStorage.setItem('mail', user.username);

        return accessToken;
    } catch (error) {
        console.error('Erreur de connexion:', error.response ? error.response.data : error.message);
        throw error;
    }
};

/**
 * Fonction d'inscription
 * 
 * @param {Object} user - Object user pour l'inscription
 * @returns {string} response.data - le message de succes
 */
export async function signup(user) {
    try {
        const response = await axios.post(`${url}/signup`, user, {
            headers: {
                'Content-Type': 'application/json'
            }
        });

        console.log('Utilisateur créé avec succès:', response.data);

        return response.data; 
    } catch (error) {
        console.error('Erreur d\'inscription:', error.response ? error.response.data : error.message);
        throw error;
    }
};

/**
 *  Fonction pour obtenir tous les utilisateurs
 * 
 * @returns response.data - la liste des utilisateurs
 */
export const getAllUsers = async () => {
    try {
        const response = await axios.get(`${url}/users`, {
            headers: {
                'Authorization': `Bearer ${sessionStorage.getItem('jwtToken')}`
            }
        });
        return response.data; // Retourne la liste des utilisateurs
    } catch (error) {
        console.error("Error fetching users:", error);
        throw error; // Rejette l'erreur pour être géré par le composant appelant
    }
};

/**
 * Fonction de déconnexion
 */
export function logout() {
    sessionStorage.removeItem('jwtToken');
    sessionStorage.removeItem('mail');
};
