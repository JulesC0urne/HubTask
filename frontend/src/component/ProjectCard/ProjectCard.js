import React, { useState, memo } from 'react';
import AlertService from '../../utils/AlertService';
import { TrashIcon } from "@heroicons/react/24/outline"; // Import de l'icône Trash

/**
 * Composant ProjectCard
 * 
 * Ce composant est responsable de l'affichage des informations de plusieurs projets dans des carte individuelle. Il affiche des 
 * informations telles que le nom du projet, sa description, les dates de début et de fin, ainsi que le propriétaire et 
 * les membres du projet pour chaque projets. Il permet également de supprimer un projet si l'utilisateur est le propriétaire du projet.
 * 
 * @param {Object} props - Propriétés transmises au composant.
 * @param {Array} props.projects - Liste des projets à afficher.
 * @param {Function} props.onDelete - Fonction appelée pour supprimer un projet.
 * @param {Function} props.onClick - Fonction appelée lors d'un clic sur la carte du projet.
 * @returns {JSX.Element} les cartes des projets
 */
const ProjectCard = memo(({ projects, onDelete, onClick }) => {

    /**
     * Fonction handleDelete
     * 
     * Cette fonction permet de supprimer un projet si l'utilisateur est le propriétaire du projet. Si l'utilisateur n'est 
     * pas le propriétaire, un message d'alerte est affiché.
     * 
     * @param {Object} project - Le projet à supprimer.
     */
    const handleDelete = (project) => {
        if(project.owner === sessionStorage.getItem('mail')){
            onDelete(project.id);
        }
        else{
            AlertService.info('Seul le propriétaire du projet peut le supprimer.'); 
        }
    };

    return (
        <div className="project-list flex overflow-x-auto space-x-6 p-4 hide-scrollbar">
            {projects.map((project) => (
                <div 
                    key={project.id} 
                    className="project-card flex-shrink-0 bg-white-500 dark:bg-neutral-800 w-72 p-6 rounded-xl shadow-md cursor-pointer transition duration-300"
                    onClick={() => onClick(project.id)}
                >
                    {/* Titre du projet */}
                    <div className="flex relative justify-between mb-4">
                        <h3 className="text-lg font-semibold text-neutral-900 dark:text-white-500 pr-8">
                            {project.name}
                        </h3>
                        <button 
                            className="absolute top-0 right-0 flex items-center gap-2 text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-500 transition"
                            onClick={(e) => {
                                e.stopPropagation();
                                handleDelete(project);
                            }}
                        >
                            <TrashIcon className="w-5 h-5 top-0" />
                        </button>
                    </div>

                    {/* Description */}
                    <p className="text-sm text-neutral-600 dark:text-neutral-300 mb-4">
                        {project.description || "Aucune description disponible."}
                    </p>

                    {/* Dates */}                    
                    <div className="flex justify-between items-center text-sm mb-4">
                        <div className="flex items-center gap-2 w-auto">
                            <span className="inline-block bg-green-100 text-green-600 dark:bg-green-700 dark:text-green-300 px-2 py-1 rounded-full text-xs font-medium">
                                Début:<br /> {new Date(project.startDate).toLocaleDateString()}
                            </span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="inline-block bg-red-100 text-red-600 dark:bg-red-700 dark:text-red-300 px-2 py-1 rounded-full text-xs font-medium text-right">
                                Fin:<br />  {new Date(project.endDate).toLocaleDateString()}
                            </span>
                        </div>
                    </div>

                    {/* Propriétaire et Membres */}
                    <div className="text-sm text-neutral-600 dark:text-neutral-400">
                        <p className="mb-2">
                            <strong className="mb-1">Propriétaire:</strong> 
                            <div className="flex">
                                <span className="bg-blue-100 text-black dark:bg-blue-700 dark:text-black px-2 py-1 rounded-full text-xs font-medium">
                                    {project.owner.split('@')[0]}
                                </span>
                            </div>
                        </p>
                        <p>
                        <strong className="mb-1">Membres:</strong>
                            {project.members == null ? (
                                "Aucun membre"
                            ) : (
                                <div className="flex"
                                    style={{
                                        flexWrap: 'wrap',
                                        gap: '8px', 
                                        wordBreak: 'break-word'    
                                    }}
                                >
                                    {project.members.map((member, index) => (
                                         <span key={index} className="bg-blue-100 text-black dark:bg-blue-700 dark:text-black px-2 py-1 rounded-full text-xs font-medium">
                                            {member.split('@')[0]}
                                         </span>
                                    ))}
                                </div>
                            )}
                        </p>
                    </div>
                </div>
            ))}
        </div>
    );
});

export default ProjectCard;
