import React, { useState, useEffect, useContext, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { TaskContext } from '../../context/TaskContext/TaskContext';
import { ProjectContext } from '../../context/ProjectContext/ProjectProvider';
import ProjectCard from '../../component/ProjectCard/ProjectCard';
import FormProject from '../../component/FormProject/FormProject';
import DarkModeToggle from "../../component/DarkModalToggle/DarkModalToggle";
import Navbar  from '../../component/Navbar/Navbar';

/**
 * Composant ProjectScreen qui représente la page de visualisation, création et suppression des projets d'un utilisateur.
 * 
 * @returns {JSX.Element} La page des projets
 */
const ProjectScreen = () => {
  // Récupération des données et fonctions depuis ProjectContext
  const { projectsOwned, 
          getProjectsOwned, 
          projectsMember, 
          fetchProjectsByMember, 
          loadingOwned, 
          loadingMember, 
          deleteProject 
        } = useContext(ProjectContext);
  
  // Récupération des données et fonctions depuis TaskContext
  const { setProjectId } = useContext(TaskContext);

  // Déclaration de l'état pour gérer le mode sombre
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Utilisation de navigate pour rediriger l'utilisateur vers d'autres pages
  const navigate = useNavigate();  

  // useEffect pour initialiser le mode sombre à partir du localStorage
  useEffect(() => {
    const savedMode = localStorage.getItem("theme");
    if (savedMode === "dark") {
      setIsDarkMode(true);
      document.documentElement.classList.add("dark");
    } else {
      setIsDarkMode(false);
      document.documentElement.classList.remove("dark");
    }
  }, []);

  // useEffect pour récupérer les projets de l'utilisateur
  useEffect(() => {
    const fetchProjects = async () => {
      await Promise.all([getProjectsOwned(), fetchProjectsByMember()]);
    };
    fetchProjects();
  }, []);

  // Mémorise les projets détenus
  const ownedProjects = useMemo(() => projectsOwned, [projectsOwned]);

  // Mémorise les projets auxquels l'utilisateur appartient
  const memberProjects = useMemo(() => projectsMember, [projectsMember]);  

  /**
   * Fonction qui permet de naviguer sur la page des tâches qui ont comme id de projet projectId
   * 
   * @param {number} projectId 
   */
  const handleProjectClick = (projectId) => {
    setProjectId(projectId);
    navigate(`/task/${projectId}`);
  };

  return (
    <div>
        <Navbar/>
        <div className="flex min-h-screen bg-white-500 dark:bg-neutral-900">
        
        {/* Partie gauche : Formulaire */}
        <div className="w-1/4 p-8">
            <FormProject />
        </div>

        {/* Partie droite : Projets */}
        <div className="w-3/4 p-8">
            <div className="p-6">
            {/*<h2 className="text-2xl font-semibold text-neutral-500 dark:text-white-500 mb-6">Projets</h2>*/}

            {/* Owned Projects */}
            <div className="mb-8">
                <h3 className="text-xl font-semibold text-neutral-500 dark:text-white-500 mb-4">Mes Projets</h3>
                {loadingOwned ? (
                <h2 className="text-neutral-400 dark:text-white-500">Chargement...</h2>
                ) : ownedProjects.length === 0 ? (
                <h2 className="text-neutral-400 dark:text-white-500">Aucun projet en tant que propriétaire.</h2>
                ) : (
                <ProjectCard 
                    title="Owned Projects" 
                    projects={ownedProjects} 
                    onDelete={deleteProject} 
                    onClick={handleProjectClick} 
                />
                )}
            </div> 

            {/* Member Projects */}
            <div>
                <h3 className="text-xl font-semibold text-neutral-500 dark:text-white-500 mb-4">Autres projets</h3>
                {loadingMember ? (
                <h2 className="text-neutral-400 dark:text-white-500">Chargement...</h2>
                ) : memberProjects.length === 0 ? (
                <h2 className="text-neutral-400 dark:text-white-500">Aucun projet en tant que membre.</h2>
                ) : (
                <ProjectCard 
                    title="Member Projects" 
                    projects={memberProjects} 
                    onDelete={deleteProject} 
                    onClick={handleProjectClick} 
                />
                )}
            </div>
            </div>
        </div>

        {/* Mode sombre/clair */}
        <DarkModeToggle toggleDarkMode={() => setIsDarkMode(!isDarkMode)} />
        </div>
    </div>
  );
};

export default ProjectScreen;
