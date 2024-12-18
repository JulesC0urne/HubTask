import React, { createContext, useState, useEffect } from 'react';
import { createProject, updateProject, deleteProjectById, getProjectsByOwner, getProjectsByMember } from '../../service/ProjectService';
import { EventSourcePlus } from "event-source-plus";

//Création du contexte pour les projets
export const ProjectContext = createContext();

/**
 * Provider pour gérer l'état global des projets d'un utilisateur
 * 
 * @param {*} children
 * @returns {Provider} ProjectContext.Provider
 */
export const ProjectProvider = ({ children }) => {

    // Projets que l'utilisateur possède
    const [projectsOwned, setProjectsOwned] = useState([]);  

    // Projets où l'utilisateur est membre
    const [projectsMember, setProjectsMember] = useState([]);

    // Indicateur de chargement pour les projets possédés
    const [loadingOwned, setLoadingOwned] = useState(true);  

    // Indicateur de chargement pour les projets membres
    const [loadingMember, setLoadingMember] = useState(true); 

    // Récupération du token JWT et de l'email de l'utilisateur depuis la session
    const jwtToken = sessionStorage.getItem('jwtToken'); 
    const userEmail = sessionStorage.getItem('mail');

    // États pour gérer la connexion en temps réel avec EventSource
    const [eventSourceListener, setEventSourceListener] = useState(null);

    // useEffect pour établir une connexion en temps réel avec EventSourcePlus
    useEffect(() => {
        console.log("useEffect for EventSourcePlus triggered.");
    
        if (!jwtToken) {
            console.error("No JWT token found. Please log in.");
            return;
        }
    
        console.log("Establishing EventSourcePlus connection with token:", jwtToken);
        
        if (!eventSourceListener) {
            console.log("Establishing EventSourcePlus connection on Projects with token:", jwtToken);

            const eventSource = new EventSourcePlus("http://localhost:8080/api/projects/events", {
                method: "GET", 
                headers: {
                    "Authorization": `Bearer ${jwtToken}`,
                    "Content-Type": "application/json"
                }
            });
        
            const listener = eventSource.listen({
                async onMessage(event) {

                    try{
                        console.log("Received message from EventSourcePlus:", event);
                        const data = JSON.parse(event.data);
                        
                        // Vérifier le type d'événement
                        switch (data.type) {
                            case 'PROJECT_CREATED':
                                if (data.project.members !== null && data.project.members.includes(userEmail)) {
                                    // Ajouter le projet uniquement s'il n'existe pas déjà
                                    setProjectsMember((prevUpdates) => {
                                        if (!prevUpdates.find(project => project.id === data.project.id)) {
                                            return [...prevUpdates, data.project];
                                        }
                                        return prevUpdates; // Ne pas ajouter si déjà présent
                                    });
                                }
                                break;
                            case 'PROJECT_UPDATED':
                                setProjectsMember((prevUpdates) => {
                                    return prevUpdates.map(project => 
                                        project.id === data.project.id ? data.project : project
                                    );
                                });
                                break;
                            case 'PROJECT_DELETED':
                                setProjectsMember((prevUpdates) => {
                                    return prevUpdates.filter(project => project.id !== data.id);
                                });
                                break;
                            case 'MEMBER_ADDED': // Nouveau cas pour gérer l'ajout de membres
                                if (data.project.members !== null && data.project.members.includes(userEmail)) {
                                    setProjectsMember((prevUpdates) => {
                                        // Vérifiez si le projet existe déjà dans prevUpdates
                                        const projectExists = prevUpdates.find(existingProject => existingProject.id === data.project.id);
                                        
                                        // Si le projet n'existe pas encore dans la liste, ajoutez-le
                                        if (!projectExists) {
                                            return [...prevUpdates, data.project];
                                        }
                                        
                                        // Si le projet existe déjà, mettez à jour le membre
                                        // Cette étape s'assure que l'on met à jour l'état même si le projet est déjà présent
                                        return prevUpdates.map(existingProject => {
                                            if (existingProject.id === data.project.id) {
                                                // Retourner un projet mis à jour
                                                return {
                                                    ...existingProject,
                                                    members: data.project.members // Mettre à jour la liste des membres
                                                };
                                            }
                                            return existingProject;
                                        });
                                    });
                                }
                                break;
                            case 'MEMBER_REMOVED': 
                                if (data.project.members !== null) {
                                    setProjectsMember((prevUpdates) => {
                                        return prevUpdates
                                            .map(existingProject => {
                                                if (existingProject.id === data.project.id) {
                                                    return {
                                                        ...existingProject,
                                                        members: data.project.members // Mettez à jour la liste des membres
                                                    };
                                                }
                                                return existingProject;
                                            })
                                            .filter(existingProject => existingProject.members.includes(userEmail)); // Filtrer uniquement les projets où l'utilisateur est membre
                                    });
                                }
                                break;
                            
                            default:
                                console.warn("Unknown event type:", data.type);
                        }
                    }
                    catch(error){
                        console.error("Error in onMessage:", error);
                    }
                },
                onError(error) {
                    console.error("EventSourcePlus error:", error);
                    listener.abort();
                }
            });
            setEventSourceListener(eventSource);
        }

    }, [projectsOwned, projectsMember, eventSourceListener]);

    /**
     * Récupération des projets possédés par l'utilisateur
     */
    const getProjectsOwned = async () => {
        try {
            const owner = sessionStorage.getItem('mail');
            const allProjects = await getProjectsByOwner(owner);
            setProjectsOwned(allProjects);
        } catch (error) {
            console.error('Error fetching owned projects:', error);
        } finally {
            setLoadingOwned(false);
        }
    };

    /**
     * Récupération des projets où l'utilisateur est membre
     */
    const fetchProjectsByMember = async () => {
        try {
            const memberEmail = sessionStorage.getItem('mail');
            const projectsData = await getProjectsByMember(memberEmail);
            setProjectsMember(projectsData);
        } catch (error) {
            console.error('Error fetching member projects:', error);
        } finally {
            setLoadingMember(false);
        }
    };

    /**
     * Ajouter un projet et informer en temps réel
     * 
     * @param {Object} newProject - Le projet à créer
     */
    const addProject = async (newProject) => {
        try {
            const createdProject = await createProject(newProject);
            setProjectsOwned(prevProjects => [...prevProjects, createdProject]);
        } catch (error) {
            console.error('Error creating project:', error);
        }
    };

    /**
     * Modifier un projet existant
     * 
     * @param {number} projectId - l'id du projet à modifier
     * @param {Object} updatedProject - le projet modifié
     */
    const doUpdateProject = async (projectId, updatedProject) => {
        try {
            const project = await updateProject(projectId, updatedProject);
            setProjectsOwned(prevProjects =>
                prevProjects.map(p => (p.id === projectId ? { ...p, ...project } : p))
            );
        } catch (error) {
            console.error('Error updating project:', error);
        }
    };
    
    /**
     * Supprime le projet avec l'id projectId
     * 
     * @param {number} projectId - L'id du projet à supprimer
     */
    const deleteProject = async (projectId) => {
        try {
            await deleteProjectById(projectId);
            setProjectsOwned(prevProjects => prevProjects.filter(project => project.id !== projectId));
        } catch (error) {
            console.error('Error deleting project:', error);
        }
    };

    /**
     * Réinitialiser les projets associés à l'utilisateur
     */
    const resetProjects = () => {
        setProjectsOwned([]);
        setProjectsMember([]);
    };

    return (
        <ProjectContext.Provider 
            value={{ 
                projectsOwned, 
                addProject, 
                doUpdateProject, 
                deleteProject, 
                resetProjects,
                projectsMember,
                loadingOwned,
                loadingMember,
                fetchProjectsByMember,
                getProjectsOwned,
            }}
        >
            {children}
        </ProjectContext.Provider>
    );
};
