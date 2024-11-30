import axios from 'axios';

//const url = "http://task-service:8080/api/tasks"; // Base URL for task-related APIs
const url = "http://localhost:8080/api/tasks";

// Function to get the Bearer token from local storage
const getAuthToken = () => {
  return sessionStorage.getItem('jwtToken'); // Retrieve the token from local storage
};

// Get all tasks
export async function getAllTasks() {
  try {
    const response = await axios.get(url, {
      headers: {
        'Authorization': `Bearer ${getAuthToken()}` // Add Bearer token to the headers
      }
    });
    return response.data; // Return the list of tasks
  } catch (error) {
    console.error('Erreur lors de la récupération des tâches:', error.response ? error.response.data : error.message);
    throw error; // Rethrow the error for handling in the component
  }
}

// Create a new task
export async function createTask(task) {
  try {
    const response = await axios.post(`${url}/create`, task, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${getAuthToken()}` // Add Bearer token to the headers
      }
    });

    console.log('Tâche créée avec succès:', response.data);
    return response.data; // Return the created task
  } catch (error) {
    console.error('Erreur de création de tâche:', error.response ? error.response.data : error.message);
    throw error; // Rethrow the error for handling in the component
  }
}

export const updateTask = async (createDate, updatedTicket) => {


  return await axios.put(`${url}/update?createDate=${createDate}`, updatedTicket, {
      headers: {
          'Authorization': `Bearer ${getAuthToken()}`, // Ensure you include the token if authentication is required
          'Content-Type': 'application/json',
      },
  });
};


// Get a task by ID
export async function getTaskById(id) {
  try {
    const response = await axios.get(`${url}/${id}`, {
      headers: {
        'Authorization': `Bearer ${getAuthToken()}` // Add Bearer token to the headers
      }
    });
    return response.data; // Return the requested task
  } catch (error) {
    console.error('Erreur lors de la récupération de la tâche:', error.response ? error.response.data : error.message);
    throw error; // Rethrow the error for handling in the component
  }
}

// Get tasks by user email
export async function getTasksByUserEmail(userEmail) {
  try {
    const response = await axios.get(`${url}/user/${userEmail}`, {
      headers: {
        'Authorization': `Bearer ${getAuthToken()}` // Add Bearer token to the headers
      }
    });
    return response.data; // Return the list of tasks for the specified user
  } catch (error) {
    console.error('Erreur lors de la récupération des tâches de l\'utilisateur:', error.response ? error.response.data : error.message);
    throw error; // Rethrow the error for handling in the component
  }
}

// Delete a task
export async function deleteTask(id) {
  try {
    await axios.delete(`${url}/${id}`, {
      headers: {
        'Authorization': `Bearer ${getAuthToken()}` // Add Bearer token to the headers
      }
    });
    console.log(`Tâche ${id} supprimée avec succès`);
  } catch (error) {
    console.error('Erreur de suppression de la tâche:', error.response ? error.response.data : error.message);
    throw error; // Rethrow the error for handling in the component
  }
}

export const deleteTaskByCreateDate = async (createDate) => {
  try {
    const response = await axios.delete(`${url}/delete`, {
      params: { createDate },
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${getAuthToken()}` // Add Bearer token to the headers
      }
    });
    return response.data;
  } catch (error) {
    console.error("Erreur lors de la suppression de la tâche:", error);
    throw error;
  }
};

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