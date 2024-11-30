import React, { useState, useEffect, useRef, useContext } from 'react';
import { getAllUsers } from '../../service/AuthService';
import { TaskContext } from '../../context/TaskContext/TaskContext';
import AlertService from '../../utils/AlertService';

const ProjectMembers = () => {
    const [isOpen, setIsOpen] = useState(false); // Contrôle de l'état de la boîte (ouverte ou fermée)
    const [isUserMenuOpen, setIsUserMenuOpen] = useState(false); // État pour le menu utilisateur
    const [users, setUsers] = useState([]); // État pour les utilisateurs
    const { handleAddMember, members, owner, handleDeleteMember } = useContext(TaskContext);
    const userEmail = sessionStorage.getItem('mail');
    const userMenuRef = useRef(null);
    const menuRef = useRef(null);
    const buttonRef = useRef(null); // Référence pour le bouton +

    const handleToggle = () => {
        setIsOpen(prevState => !prevState); // Inverse l'état de la boîte
    };

    const toggleUserMenu = async () => {

        if (users.length === 0) {
            await fetchUsers();  // Charger les utilisateurs uniquement si c'est la première fois
            console.log(users);
        }
        setIsUserMenuOpen(prevState => !prevState);
    };

    useEffect(() => {
        if (users.length === 0 && isUserMenuOpen) {
            AlertService.info("Aucun utilisateur trouvé.");
        }
    }, [users, isUserMenuOpen]);
    

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

    const handleUserSelect = (user) => {
        handleAddMember(user.username);
        setIsUserMenuOpen(false); // Ferme le menu après avoir sélectionné un utilisateur
    };

    const handleClickOutside = (event) => {
        if (menuRef.current && !menuRef.current.contains(event.target)) {
          setIsOpen(false);
        }
        if (userMenuRef.current && !userMenuRef.current.contains(event.target) && !buttonRef.current.contains(event.target)) {
          setIsUserMenuOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [])

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
