import React, { useState, useEffect, useRef, useContext } from 'react';
import { getAllUsers } from '../../service/AuthService';
import { TaskContext } from '../../context/TaskContext/TaskContext';
import AlertService from '../../utils/AlertService';

/**
 * Composant ProjectMembers
 * 
 * Ce composant permet de gérer les membres d'un projet. Il affiche une liste des membres actuels du projet, permet d'ajouter 
 * un utilisateur à la liste des membres et de supprimer un utilisateur si l'utilisateur connecté est le propriétaire du projet.
 * Il inclut également un menu pour sélectionner un utilisateur à ajouter.
 * 
 * @returns {JSX.Element} les menus affichant les membres d'un projet et les utilisateur susceptible d'être ajouté
 */
const ProjectMembers = () => {

    // Contrôle l'ouverture/fermeture de la boîte des membres
    const [isOpen, setIsOpen] = useState(false); 

    // Contrôle l'ouverture/fermeture du menu des utilisateurs
    const [isUserMenuOpen, setIsUserMenuOpen] = useState(false); 

    // Liste des utilisateurs récupérés pour l'ajout de membres
    const [users, setUsers] = useState([]); 

    // Fonctions et données du contexte
    const { handleAddMember, members, owner, handleDeleteMember } = useContext(TaskContext); 

    // Récupère l'email de l'utilisateur connecté
    const userEmail = sessionStorage.getItem('mail'); 

    // Référence pour le menu utilisateur
    const userMenuRef = useRef(null); 

    // Référence pour le menu des membres
    const menuRef = useRef(null); 

    // Référence pour le bouton d'ajout de membres (+)
    const buttonRef = useRef(null); 

    // Effet pour afficher une alerte si aucun utilisateur n'est trouvé
    useEffect(() => {
        if (users.length === 0 && isUserMenuOpen) {
            AlertService.info("Aucun utilisateur trouvé.");
        }
    }, [users, isUserMenuOpen]);

    /**
     * Ajoute un écouteur d'événements pour fermer le menu lorsqu'on clique en dehors
     */
    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [])

    /**
     * Fonction pour inverser l'état de la boîte
     */
    const handleToggle = () => {
        setIsOpen(prevState => !prevState); 
    };

    /**
     * Fonction pour afficher/fermer le menu des utilisateurs
     */
    const toggleUserMenu = async () => {

        if (users.length === 0) {
            await fetchUsers(); 
            console.log(users);
        }
        setIsUserMenuOpen(prevState => !prevState);
    };

    /**
     * Fonction pour ajouter un membre au projet
     * 
     * @param {*} user L'utilisateur à ajouter
     */
    const handleUserSelect = (user) => {
        handleAddMember(user.username);
        setIsUserMenuOpen(false); 
    };

    /**
     * Fonction pour fermer le menu si on clique en dehors
     * @param {*} event 
     */
    const handleClickOutside = (event) => {
        if (menuRef.current && !menuRef.current.contains(event.target)) {
          setIsOpen(false);
        }
        if (userMenuRef.current && !userMenuRef.current.contains(event.target) && !buttonRef.current.contains(event.target)) {
          setIsUserMenuOpen(false);
        }
    };
    
    /**
     * Fonction pour récupérer tous les utilisateurs
     */
    const fetchUsers = async () => {
        try {
          const userData = await getAllUsers(); 
          const filteredUsers = userData.filter(user => 
            user.username !== userEmail && 
            user.username && 
            !members.includes("\"" + user.username + "\"") 
          );
          setUsers(filteredUsers);
        } catch (error) {
          console.error("Error fetching users:", error);
        }
    };

    /**
     * Fonction pour supprimer un membre du projet
     * @param {*} email l'email de l'utilisateur à supprimer
     */
    const handleDelete = (email) => {
        if (userEmail === owner) {
          handleDeleteMember(email);
          console.log(email, " supprimé");
        }
    };

    return (
        <div>
            <div
                className={`fixed top-1/2 right-0 transform -translate-y-1/2 w-[20px] h-[50px] bg-white shadow-lg rounded-lg z-50 cursor-pointer transition-all duration-300`}
                onClick={handleToggle}
            >
                {/* Conteneur pour les deux bandes */}
                <div className="flex flex-col justify-around items-center h-full">
                    <div className="w-[5px] h-[45px] bg-gray-500" />
                    <div className="w-[5px] h-[45px] bg-gray-500" />
                </div>
            </div>
    
            {isOpen && (
                <div ref={menuRef} className="fixed top-1/2 right-0 w-[250px] transform -translate-y-1/2 bg-white shadow-lg rounded-lg p-4 z-50 cursor-pointer transition-all duration-300">
                    {/* Liste des membres */}
                    <div className="space-y-2">
                        {userEmail !== owner ? (
                            <>
                                <button
                                    className={`w-full p-2 text-left rounded-md bg-blue-500 hover:bg-blue-600 text-white flex`}
                                    style={{
                                        whiteSpace: 'nowrap', 
                                        overflow: 'hidden', 
                                        textOverflow: 'ellipsis'
                                    }}
                                >
                                    <span className="mr-2">{owner}</span>
                                    <img
                                        src="/images/crown.png" // Update this path based on where the image is located
                                        alt="Crown Icon"
                                        className="ml-2 w-5 h-5" // Optional: Adjust size of the image with w-5 and h-5
                                    />
                                </button>
                                <button
                                    className={`w-full p-2 text-left rounded-md bg-gray-200 dark:bg-gray-700 hover:bg-gray-300`}
                                    style={{
                                        whiteSpace: 'nowrap', 
                                        overflow: 'hidden', 
                                        textOverflow: 'ellipsis'
                                    }}
                                >
                                    {userEmail}
                                </button>
                            </>
                        ) : (
                            <button
                                className={`w-full p-2 text-left rounded-md bg-blue-500 hover:bg-blue-600 text-white flex`}
                                style={{
                                    whiteSpace: 'nowrap', 
                                    overflow: 'hidden', 
                                    textOverflow: 'ellipsis'
                                }}
                            >
                                
                                <span className="mr-2">{userEmail}</span>
                                    <img
                                        src="/images/crown.png" // Update this path based on where the image is located
                                        alt="Crown Icon"
                                        className="ml-2 w-5 h-5" // Optional: Adjust size of the image with w-5 and h-5
                                    />
                            </button>
                        )}
                        {members.map((user, index) => (
                            user !== userEmail && (
                                <button 
                                    key={index} 
                                    className="w-full p-2 text-left bg-gray-200 dark:bg-gray-700 rounded-md hover:bg-gray-300"
                                    style={{
                                        whiteSpace: 'nowrap', 
                                        overflow: 'hidden', 
                                        textOverflow: 'ellipsis' 
                                    }}
                                    onClick={() => handleDelete(user)}
                                >
                                    {user}
                                </button>
                            )
                        ))}
    
                        <button 
                            ref={buttonRef}
                            className="w-full p-2 text-left bg-green-200 text-white rounded-md hover:bg-green-600"
                            onClick={() => toggleUserMenu()} 
                        >
                            +
                        </button>
    
                        {isUserMenuOpen && (
                            <div
                                ref={userMenuRef}
                                className="absolute right-[250px] top-[50%] mt-2 bg-white border border-neutral-200 rounded-lg shadow-lg w-auto max-w-max max-h-[300px] overflow-y-auto"
                            >
                                {
                                    users
                                        .filter(user => !members.includes(user.username) && user.username !== owner)
                                        .map(user => (
                                            <button
                                                key={user.id}
                                                onClick={() => handleUserSelect(user)}
                                                className="w-full p-2 text-left bg-gray-200 dark:bg-gray-700 rounded-md hover:bg-gray-300"
                                                style={{
                                                    whiteSpace: 'nowrap', 
                                                    overflow: 'hidden', 
                                                    textOverflow: 'ellipsis' 
                                                }}
                                            >
                                                {user.username}
                                            </button>
                                        ))
                                    }
                            </div>
                        )}
    
                    </div>
                </div>
            )}
        </div>
    );
    
};

export default ProjectMembers;
