import React, { createContext, useState, useEffect } from 'react';
import { EventSourcePlus } from "event-source-plus";
import axios from 'axios';

export const ConversationContext = createContext();

export const ConversationProvider = ({ children }) => {

    const [conversationId, setConversationId] = useState(null);
    const jwtToken = sessionStorage.getItem('jwtToken'); 
    const userEmail = sessionStorage.getItem('mail');
    const [eventSourceListener, setEventSourceListener] = useState(null);
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!jwtToken || !conversationId) return;
    
        if (eventSourceListener) return;
    
        const eventSource = new EventSourcePlus(`http://localhost:8080/api/messages/stream/${conversationId}`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${jwtToken}`
            }
        });
        //console.log("event source MESSAGE created...");
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
            console.log(response.data);
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
        console.log("loading is true"); 
        try {
            const response = await axios.get(`http://localhost:8080/api/messages/${id}`, {
                headers: {
                    'Authorization': `Bearer ${jwtToken}`,
                }
            });
            //console.log("Messages get on initialisation with value : ", response.data);
            setMessages(response.data);
            setConversationId(id);
        } catch (error) {
            console.error("Erreur lors de la récupération des conversations:", error);
        } finally {
            setLoading(false); 
            console.log("loading is false"); 
        }
    };
    

    // Reset the conversation state
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
