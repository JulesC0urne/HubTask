import React, { useState, useEffect, useContext, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { TaskContext } from '../../context/TaskContext/TaskContext';
import { ProjectContext } from '../../context/ProjectContext/ProjectProvider';
import ProjectCard from '../../component/ProjectCard/ProjectCard';
import FormProject from '../../component/FormProject/FormProject';
import DarkModeToggle from "../../component/DarkModalToggle/DarkModalToggle";
import Navbar  from '../../component/Navbar/Navbar';

const ProjectScreen = () => {
  const { projectsOwned, getProjectsOwned, projectsMember, fetchProjectsByMember, loadingOwned, loadingMember, deleteProject } = useContext(ProjectContext);
  const { setProjectId } = useContext(TaskContext);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const navigate = useNavigate();

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

  useEffect(() => {
    const fetchProjects = async () => {
      await Promise.all([getProjectsOwned(), fetchProjectsByMember()]);
    };
    fetchProjects();
  }, []);

  const ownedProjects = useMemo(() => projectsOwned, [projectsOwned]);
  const memberProjects = useMemo(() => projectsMember, [projectsMember]);

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
