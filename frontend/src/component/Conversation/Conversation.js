import React, { useContext, useEffect, useState , useRef} from 'react';
import { ConversationContext } from '../../context/ConversationContext/ConversationContext';
import { TaskContext } from '../../context/TaskContext/TaskContext';
import './Conversation.css'; // Importer le fichier CSS pour les styles
import { InboxIcon } from '@heroicons/react/24/outline';

/**
 * Composant `Conversation`
 * Affiche une fenêtre de conversation où les utilisateurs peuvent envoyer et recevoir des messages.
 * Cette fenêtre peut être ouverte ou fermée en cliquant sur un bouton flottant.
 * 
 * @param {Object} props - Les propriétés du composant
 * @param {number} props.convId - L'identifiant unique de la conversation
 * @returns {JSX.Element} Le formulaire pour créer une tâche
 */
const Conversation = ({ convId }) => {

    // Récupération des valeurs et fonctions depuis le contexte Conversation
    const {
        loading,
        messages,
        newMessage,
        setNewMessage,
        getConversationById,
        sendMessage,
    } = useContext(ConversationContext);

    // Récupération des membres du projet depuis le contexte Task
    const { members } = useContext(TaskContext);

    // Définition de l'état local pour gérer l'ouverture/fermeture de la conversation
    const [isOpen, setIsOpen] = useState(false);

    // Référence pour faire défiler la vue jusqu'au dernier message
    const messagesEndRef = useRef(null);

    /**
     * Fonction pour envoyer un message dans la conversation
     * Elle appelle la fonction `sendMessage` du contexte pour envoyer le message.
     * 
     * @async
     */
    const handleSendMessage = async () => {
        if (!newMessage) return; // Assurer que le message n'est pas vide
        console.log("new message : " +  newMessage.senderEmail);
        await sendMessage(convId, newMessage, members);
        setNewMessage('');
    };

    /**
     * Fonction pour basculer entre l'état ouvert/fermé de la conversation
     */
    const toggleConversation = () => {
        setIsOpen(prevState => !prevState);
    };

    /**
     * Fonction pour récupérer les messages de la conversation au chargement du composant
     * Utilise l'ID de la conversation (convId) pour récupérer les messages via le contexte
     */
    const handleGetConv = async () => {
        await getConversationById(convId);
    };

    // Effet de mise à jour lorsque le composant est monté ou que l'ID de la conversation change
    useEffect(() => {
        handleGetConv();
    }, [convId]);

    // Effet pour faire défiler la vue vers le bas lorsque de nouveaux messages arrivent ou que la conversation est ouverte
    useEffect(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: 'smooth'});
        }
    }, [messages, isOpen]);

     // Effet de débogage pour afficher l'état de chargement des messages
    useEffect(() => {
        console.log("In conversation loading is : ", loading);
    }, [loading]);

    return (
        <div>
            <div
                className={`conversation-box fixed bg-white dark:bg-neutral-700 p-4 rounded-lg shadow-lg w-80 transition-all duration-300 z-50 
                    ${isOpen ? 'translate-x-0' : 'translate-x-full'} 
                    ${!isOpen ? 'pointer-events-none' : ''}`}
                style={{
                    bottom: `calc(50vh + ${isOpen ? 'calc(2rem)' : 0})`,
                    right: isOpen ? '6rem' : '-80px',
                    opacity: isOpen ? 1 : 0,
                }}
            >
                {isOpen && (
                    <div class="flex flex-col flex-grow w-full max-w-xl bg-white shadow-xl rounded-lg overflow-hidden">
                        <div class="flex flex-col flex-grow h-0 p-4 overflow-auto">
                            {loading === true ? ( 
                                    <div>Loading messages...</div>
                                ) : (
                                    messages.flat().map((message, index) => (
                                        
                                        <div key={index} class="flex w-full mt-2 flex-col space-y-1 max-w-xs">

                                            <span className={`text-xs text-gray-500 leading-none m-1 flex ${message.senderEmail === sessionStorage.getItem('mail') ? 'justify-start': 'justify-end'}`}>{message.senderEmail}</span>
                                            <div className={`mt-10 flex ${message.senderEmail === sessionStorage.getItem('mail') ? 'justify-start': 'justify-end'}`}>
                                                <div class="bg-gray-300 p-3 rounded-r-lg rounded-bl-lg inline-block">
                                                    <p class="text-sm">{message.content}</p>
                                                </div>
                                            </div>

                                        </div>
                                    ))
                                )}
                            <div ref={messagesEndRef} />
                        </div>
                        
                    <div class="bg-gray-300 p-1">
                        <input 
                            class="flex items-center h-10 w-full rounded px-3 text-sm" 
                            type="text" 
                            placeholder="Tapez votre message"
                            value={newMessage}
                            onChange={(e) => setNewMessage(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter' && newMessage.trim() !== '') {
                                    handleSendMessage(); 
                                    setNewMessage('');
                                }
                            }}
                        />
                    </div>
                </div>
            
                )}
            </div>

            <button
                onClick={toggleConversation}
                className="fixed bottom-20 right-4 bg-primary-500 text-white p-4 rounded-full shadow-lg hover:bg-primary-accent transition z-10000"
            >
                <InboxIcon className="h-6 w-6 text-white-500" />
            </button>
        </div>
    );
};

export default Conversation;
