import React, { createContext, useState, useEffect } from 'react';
import { createTask, updateTask, deleteTaskByCreateDate, getTasksByProjectId } from '../../service/TaskService';
import { getMembersByProjectId, addMemberToProject, deleteMemberFromProject, getProjectById } from '../../service/ProjectService';
import { EventSourcePlus } from "event-source-plus";

//Création du contexte pour les tâches
export const TaskContext = createContext();

/**
 * Provider pour gérer l'état global des tâches associés à un projet
 * 
 * @param {*} children 
 * @returns {Provider} TaskContext.Provider
 */
export const TaskProvider = ({ children }) => {

    // Liste des tâches (tickets)
    const [tickets, setTickets] = useState([]);  
    
    // Tâche sélectionnée
    const [selectedTicket, setSelectedTicket] = useState(null); 

    // Champ de saisie lié à la tâche
    const [ticketField, setTicketField] = useState("");
    
    // ID du projet auquel les tâches sont associées
    const [projectId, setProjectId] = useState(null); 
    
    // Date de début du projet
    const [projectBegin, setProjectBegin] = useState("");
    
    // Date de fin du projet
    const [projectEnd, setProjectEnd] = useState("");   
    
    // Liste des membres du projet
    const [members, setMembers] = useState([]);    
    
    // Propriétaire du projet
    const [owner, setOwner] = useState(null);         
    
    // Récupération du JWT token de la session
    const jwtToken = sessionStorage.getItem('jwtToken'); 
    
    // Récupération de l'email de l'utilisateur
    const userEmail = sessionStorage.getItem('mail');  

    // Écouteur des événements via EventSourcePlus      
    const [eventSourceListener, setEventSourceListener] = useState(null);

    // useEffect pour récupérer les informations du projet dès que l'ID du projet change
    useEffect(() => {
        const fetchData = async () => {
            if (!projectId) return; // Vérifie que projectId existe
    
            try {
                const fetchedProject = await getProjectById(projectId);
                setProjectBegin(fetchedProject.startDate);
                setProjectEnd(fetchedProject.endDate);
                setOwner(fetchedProject.owner);
    
                const membersList = await getMembersByProjectId(projectId);
                setMembers(membersList);
    
                const projectTasks = await getTasksByProjectId(projectId);
                setTickets(projectTasks);
            } catch (error) {
                console.error("Error fetching project data:", error);
            }
        };
    
        fetchData();
    }, [projectId]);

    // useEffect pour gérer la connexion en temps réel avec les événements de tâches
    useEffect(() => {
        if (!jwtToken) {
            console.error("No JWT token found. Please log in.");
            return;
        }
        
        if (!eventSourceListener) {
            console.log("Establishing EventSourcePlus connection on Task with token:", jwtToken);
            const eventSource = new EventSourcePlus(`http://localhost:8080/api/tasks/events`, {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${jwtToken}`,
                    "Content-Type": "application/json"
                }
            });

            const listener = eventSource.listen({
                onMessage(event) {
                    const data = JSON.parse(event.data);

                    // Traite l'événement uniquement si `task.user_email` est différent de `userEmail`
                    switch (data.type) {
                        case "TASK_CREATED":
                            if (data.task.userMail !== userEmail){
                                setTickets(prevTickets => [...prevTickets, data.task]);
                            }
                            break;
                        case "TASK_UPDATED":
                            if (data.task.useMail !== userEmail){
                                setTickets(prevTickets =>
                                    prevTickets.map(ticket => 
                                        ticket.createDate === data.createDate ? { ...ticket, ...data.task } : ticket
                                    )
                                );
                            }
                            break;
                        case "TASK_DELETED":
                            setTickets(prevTickets => 
                                prevTickets.filter(ticket => ticket.createDate !== data.createDate)
                            );
                            break;
                        default:
                            console.warn("Unknown event type:", data.type);
                    }
                },
                onError(error) {
                    console.error("EventSource error:", error);
                    listener.abort();
                }
            });

            setEventSourceListener(eventSource);
        }

    }, [projectId, tickets, eventSourceListener]);

    /**
     * Fonction qui ajoute un nouveau membre au projet en cours.
     * 
     * @param {string} newMemberEmail 
     */
    const handleAddMember = async (newMemberEmail) => {
        try {
            await addMemberToProject(projectId, newMemberEmail);
            setMembers([...members, newMemberEmail]); 
        } catch (error) {
            console.error("Failed to add member", error);
        }
    };

    /**
     * Fonction qui supprime un membre au projet en cours.
     * 
     * @param {string} email 
     */
    const handleDeleteMember = async (email) => {
        try {
            await deleteMemberFromProject(projectId, email);
            setMembers(members.filter(member => member !== email));
        } catch (error) {
            console.error("Failed to delete member", error);
        }
    };

    /**
     * Fonction qui ajoute une tâche au projet en cours
     * 
     * @param {Object} newTicket 
     */
    const addTicket = async (newTicket) => {
        try {
            const createdTask = await createTask(newTicket);
            setTickets(prevTickets => [...prevTickets, createdTask]);
        } catch (error) {
            console.error('Error creating task:', error);
        }
    };
    
    /**
     * Fonction qui met à jour le ticket avec l'id ticketId
     * 
     * @param {number} ticketId 
     * @param {Object} updatedTicket 
     */
    const updateTicket = async (ticketId, updatedTicket) => {
        try {
            await updateTask(ticketId, updatedTicket);
            setTickets(prevTickets =>
                prevTickets.map(ticket =>
                    ticket.createDate === ticketId ? { ...ticket, ...updatedTicket } : ticket
                )
            );
            console.log("TICKET UPDATED");
        } catch (error) {
            console.error('Error updating task:', error);
        }
    };

    /**
     * Fonction qui supprime le ticket avec la date de création createDate
     * 
     * @param {Date} createDate 
     */
    const deleteTicket = async (createDate) => {
        try {
            await deleteTaskByCreateDate(createDate);
            setTickets(prevTickets => prevTickets.filter(ticket => ticket.createDate !== createDate));
        } catch (error) {
            console.error('Error deleting task:', error);
        }
    };

    /**
     * Reset les champs associé au projet en cours et aux tâches
     */
    const resetTasks = () => {
        setTickets([]);
        setSelectedTicket(null);
        setTicketField("");
        setProjectId(null);
        setOwner(null);
        setMembers([]);
        setProjectBegin("");
        setProjectEnd("");
    };

    const selectTicket = (ticket) => setSelectedTicket(ticket); 
    const clearSelectedTicket = () => setSelectedTicket(null); 
    const selectTicketField = (field) => setTicketField(field);
    const clearTicketField = () => setTicketField("");

    return (
        <TaskContext.Provider 
            value={{ 
                tickets,
                projectBegin,
                projectEnd,
                addTicket, 
                updateTicket, 
                deleteTicket, 
                selectedTicket, 
                selectTicket, 
                clearSelectedTicket,
                ticketField,
                selectTicketField,
                clearTicketField,
                projectId,    
                setProjectId,
                handleAddMember,
                handleDeleteMember,
                members,
                owner,
                resetTasks
            }}
        >
            {children}
        </TaskContext.Provider>
    );
};
