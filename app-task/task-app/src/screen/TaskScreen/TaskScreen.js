import React, { useContext, useEffect, useState } from 'react'; // Ajout de useState pour gérer l'état du mode sombre
import { useParams, useNavigate } from 'react-router-dom';
import { TaskContext } from '../../context/TaskContext/TaskContext';
import { ConversationContext } from '../../context/ConversationContext/ConversationContext';
import TicketBoard from '../../component/TicketBoard/TicketBoard';
import Navbar from '../../component/Navbar/Navbar';
import '@fortawesome/fontawesome-free/css/all.min.css';
import FormTask from '../../component/FormTask/FormTask';
import Conversation from '../../component/Conversation/Conversation';
import DarkModeToggle from "../../component/DarkModalToggle/DarkModalToggle";
import ProjectMembers from '../../component/ProjectMembers/ProjectMembers';

const TaskScreen = () => {
    // Déclarez l'état pour le mode sombre
    const [isDarkMode, setIsDarkMode] = useState(false);  // Gestion de l'état du mode sombre

    const { resetTasks } = useContext(TaskContext);
    const { resetConversation, setConversationId, getConversationById } = useContext(ConversationContext);
    const { projectId } = useParams();
    const navigate = useNavigate();

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

    const handleBackClick = () => {
        navigate('/project');
        resetTasks(); 
        resetConversation();
    };

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
