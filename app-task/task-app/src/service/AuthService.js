import axios from 'axios';

// Constantes de configuration
const url = "http://localhost:8080"; 

// Fonction de connexion
export async function login(user) {
    try {
        const response = await axios.post(`${url}/api/auth/login`, user, {
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

// Fonction d'inscription
export async function signup(user) {
    try {
        const response = await axios.post(`${url}/api/auth/signup`, user, {
            headers: {
                'Content-Type': 'application/json'
            }
        });

        console.log('Utilisateur créé avec succès:', response.data);

        return response.data; // Renvoie le message de succès
    } catch (error) {
        console.error('Erreur d\'inscription:', error.response ? error.response.data : error.message);
        throw error;
    }
};

// Fonction pour obtenir tous les utilisateurs
export const getAllUsers = async () => {
    try {
        const response = await axios.get(`${url}/api/auth/users`, {
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

// Fonction de déconnexion
export function logout() {
    sessionStorage.removeItem('jwtToken');
    sessionStorage.removeItem('mail');
};
