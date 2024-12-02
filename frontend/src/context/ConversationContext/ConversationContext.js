import React, { createContext, useState, useEffect } from 'react';
import { EventSourcePlus } from "event-source-plus";
import axios from 'axios';

// Création du contexte ConversationContext
export const ConversationContext = createContext();

/**
 * Provider pour gérer l'état global de la conversation
 * 
 * @param {*} children
 * @returns {Provider} ConversationContext.Provider
 */
export const ConversationProvider = ({ children }) => {

    // L'ID de la conversation actuelle
    const [conversationId, setConversationId] = useState(null); 

    // Récupération du token JWT depuis sessionStorage
    const jwtToken = sessionStorage.getItem('jwtToken'); 

    // Récupération de l'email de l'utilisateur depuis sessionStorage
    const userEmail = sessionStorage.getItem('mail'); 

    // Écouteur de messages en temps réel
    const [eventSourceListener, setEventSourceListener] = useState(null); 

    // Liste des messages de la conversation
    const [messages, setMessages] = useState([]); 

    // Message actuellement saisi par l'utilisateur
    const [newMessage, setNewMessage] = useState(''); 

    // Indicateur de chargement des messages
    const [loading, setLoading] = useState(true); 

    // useEffect pour établir une connexion EventSource lorsque la conversation change
    useEffect(() => {
        if (!jwtToken || !conversationId) return;
    
        if (eventSourceListener) return;
    
        const eventSource = new EventSourcePlus(`http://localhost:8080/api/messages/stream/${conversationId}`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${jwtToken}`
            }
        });

        const listener = eventSource.listen({
            async onMessage(event) {
                const data = JSON.parse(event.data);
                if (data.type === 'MESSAGE_RECEIVED') {
                    console.log("message received with value :", data.message);
                    setMessages(prevMessages => [...prevMessages, data.message]);
                }
            },
            onError(error) {
                console.error("EventSourcePlus error:", error);
                listener.abort();
            }
        });
    
        setEventSourceListener(eventSource);
    
        return () => {
            listener.abort();
            setEventSourceListener(null);
        };
    }, [conversationId, jwtToken, loading]);
    
    /**
     * Fonction d'envoie d'un nouveau message
     * 
     * @param {number} conversationId - L'id de la conversation dans laquelle envoyer le message
     * @param {string} newMessage - Le nouveau message à envoyer
     * @param {string[]} members - La liste d'emails représentant les membre inclus dans la conversation
     */
    const sendMessage = async (conversationId, newMessage, members) => {

        const message = {
            content: newMessage, 
            senderEmail: userEmail,
            allowedEmails: members.includes(userEmail) ? members : [...members, userEmail],
            conversationId: conversationId
        };
        try {
            const response = await axios.post('http://localhost:8080/api/messages', message, {
                headers: {
                    'Authorization': `Bearer ${jwtToken}`,
                    'Content-Type': 'application/json',
                }
            });

            if (response.data === "Message sent") {
                setNewMessage('');
                console.log("Message send with value : ", message);
            } else {
                console.log('Error: ' + response.data);
            }
        } catch (error) {
            console.error('Error sending message:', error);
        }
    };

    /**
     * Fonction qui récupère la conversation à partir de son id.
     * 
     * @param {number} id - L'id de la conversation à récupérer
     */
    const getConversationById = async (id) => {
        const jwtToken = sessionStorage.getItem('jwtToken'); 
        if (!id) {
            console.error("conversationId is undefined or empty");
            return;
        }
        if (!jwtToken) {
            console.error("jwtToken is undefined or empty");
            return;
        }
        
        setLoading(true);

        try {
            const response = await axios.get(`http://localhost:8080/api/messages/${id}`, {
                headers: {
                    'Authorization': `Bearer ${jwtToken}`,
                }
            });

            setMessages(response.data);
            setConversationId(id);
        } catch (error) {
            console.error("Erreur lors de la récupération des conversations:", error);
        } finally {
            setLoading(false); 
            console.log("loading is false"); 
        }
    };
    
    /**
     * Reset les champs lié à la conversation en cours
     */
    const resetConversation = () => {
        setConversationId("");
        setMessages([]);
        setNewMessage("");
        setLoading(true);
    };

    return (
        <ConversationContext.Provider 
            value={{
                getConversationById,
                conversationId,
                setConversationId,
                messages,
                newMessage,
                setNewMessage,
                sendMessage,
                resetConversation,
                loading
            }}
        >
            {children}
        </ConversationContext.Provider>
    );
};
