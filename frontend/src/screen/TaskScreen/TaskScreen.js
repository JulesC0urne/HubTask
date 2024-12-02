import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ConversationContext } from '../../context/ConversationContext/ConversationContext';
import TicketBoard from '../../component/TicketBoard/TicketBoard';
import Navbar from '../../component/Navbar/Navbar';
import '@fortawesome/fontawesome-free/css/all.min.css';
import FormTask from '../../component/FormTask/FormTask';
import Conversation from '../../component/Conversation/Conversation';
import DarkModeToggle from "../../component/DarkModalToggle/DarkModalToggle";
import ProjectMembers from '../../component/ProjectMembers/ProjectMembers';

/**
 * Composant TaskScreen qui représente la page de visualisation, création, suppression et modification des tâches.
 * 
 * @returns {JSX.Element} La page des tâches
 */
const TaskScreen = () => {
    // Déclarez l'état pour le mode sombre
    const [isDarkMode, setIsDarkMode] = useState(false);

    // Fonctions pour gérer les conversations
    const { setConversationId, getConversationById } = useContext(ConversationContext);

     // Récupération de l'ID du projet à partir des paramètres de l'URL
    const { projectId } = useParams();

    // useEffect pour gérer l'activation du mode sombre à partir du localStorage
    useEffect(() => {
        const savedMode = localStorage.getItem("theme");
        if (savedMode === "dark") {
            setIsDarkMode(true);
            document.documentElement.classList.add("dark");  // Active le mode sombre
        } else {
            setIsDarkMode(false);
            document.documentElement.classList.remove("dark");  // Active le mode clair
        }
    }, []);

    // useEffect pour récupérer la conversation associée au projet lorsqu'il est chargé
    useEffect(() => {
        const fetchConv = async () => {
            console.log("TaskScreen get id : ", projectId);
            const conv = await getConversationById(projectId);
            setConversationId(projectId);
            console.log("TaskScreen set conversation id with : ", conv);
        };
        fetchConv();
    },[]);

    return (
        <div>
            <Navbar/>
            <ProjectMembers/>
            <div className="flex min-h-screen bg-white-500 dark:bg-neutral-900">
            
            {/* Partie gauche : Formulaire */}
            <div className="w-1/4 p-8">
                <FormTask projectId={projectId}/>
            </div>

            {/* Partie droite : Projets */}
            <div className="w-3/4 p-8">
                <div className="p-0">
                    <TicketBoard projectId={projectId}/>
                </div>
            </div>
            <Conversation convId={projectId} />
            {/* Mode sombre/clair */}
            <DarkModeToggle toggleDarkMode={() => setIsDarkMode(!isDarkMode)} />
            </div>
        </div>
    );
};

export default TaskScreen;
