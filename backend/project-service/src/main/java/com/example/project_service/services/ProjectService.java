package com.example.project_service.services;

import com.example.project_service.entities.Project;
import com.example.project_service.repositories.ProjectRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import jakarta.persistence.EntityNotFoundException;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

/**
 * Service pour gérer les projets dans l'application.
 * Ce service interagit avec le {@link ProjectRepository} pour effectuer des opérations sur les projets,
 * telles que la création, la récupération, la mise à jour et la suppression des projets.
 * 
 * @author Courné Jules
 * @version 1.0
 */
@Service
public class ProjectService {

    private final ProjectRepository projectRepository;

    /**
     * Constructeur de la classe {@link ProjectService}.
     * 
     * @param projectRepository le repository pour interagir avec la base de données des projets.
     */
    @Autowired
    public ProjectService(ProjectRepository projectRepository) {
        this.projectRepository = projectRepository;
    }

    /**
     * Créer un nouveau projet.
     * 
     * @param name        le nom du projet.
     * @param description la description du projet.
     * @param owner       le propriétaire du projet (généralement un email ou identifiant d'utilisateur).
     * @param startDate   la date de début du projet.
     * @param endDate     la date de fin du projet.
     * @return le projet créé.
     */
    public Project createProject(String name, String description, String owner, LocalDateTime startDate, LocalDateTime endDate) {
        Project project = new Project();
        project.setName(name);
        project.setDescription(description);
        project.setOwner(owner);
        project.setStartDate(startDate);
        project.setEndDate(endDate);
        return projectRepository.save(project);
    }

    /**
     * Récupérer tous les projets existants.
     * 
     * @return une liste de tous les projets.
     */
    public List<Project> getAllProjects() {
        return projectRepository.findAll();
    }

    /**
     * Récupérer tous les projets d'un propriétaire spécifié.
     * 
     * @param owner l'email ou l'identifiant du propriétaire des projets.
     * @return une liste de projets associés au propriétaire spécifié.
     */
    public List<Project> getProjectsByOwner(String owner) {
        return projectRepository.findByOwner(owner);
    }

    /**
     * Récupérer un projet par son identifiant.
     * 
     * @param id l'identifiant du projet à rechercher.
     * @return un {@link Optional} contenant le projet si trouvé, sinon {@link Optional#empty()}.
     */
    public Optional<Project> getProjectById(Long id) {
        return projectRepository.findById(id);
    }

    /**
     * Mettre à jour les informations d'un projet existant.
     * 
     * @param id          l'identifiant du projet à mettre à jour.
     * @param name        le nouveau nom du projet.
     * @param description la nouvelle description du projet.
     * @param startDate   la nouvelle date de début du projet.
     * @param endDate     la nouvelle date de fin du projet.
     * @return le projet mis à jour.
     * @throws RuntimeException si le projet avec l'ID spécifié n'est pas trouvé.
     */
    public Project updateProject(Long id, String name, String description, LocalDateTime startDate, LocalDateTime endDate) {
        Optional<Project> existingProject = projectRepository.findById(id);
        if (existingProject.isPresent()) {
            Project project = existingProject.get();
            project.setName(name);
            project.setDescription(description);
            project.setStartDate(startDate);
            project.setEndDate(endDate);
            return projectRepository.save(project);
        }
        throw new RuntimeException("Project not found with id " + id);
    }

    /**
     * Supprimer un projet par son identifiant.
     * 
     * @param id l'identifiant du projet à supprimer.
     * @return {@code true} si le projet a été supprimé, {@code false} sinon.
     */
    public boolean deleteProject(Long id) {
        if (projectRepository.existsById(id)) {
            projectRepository.deleteById(id);
            return true;
        } 
        return false;
    }

    /**
     * Récupérer tous les membres d'un projet spécifié par son identifiant.
     * 
     * @param projectId l'identifiant du projet.
     * @return une liste des membres du projet.
     * @throws EntityNotFoundException si le projet n'est pas trouvé avec l'ID spécifié.
     */
    public List<String> getMembersByProjectId(Long projectId) {
        Project project = projectRepository.findById(projectId)
            .orElseThrow(() -> new EntityNotFoundException("Project not found with id: " + projectId));
        return project.getMembers();
    }

    /**
     * Ajouter un membre à un projet spécifié par son identifiant.
     * 
     * @param projectId l'identifiant du projet auquel ajouter un membre.
     * @param member    l'email ou l'identifiant du membre à ajouter.
     * @return le projet mis à jour.
     * @throws EntityNotFoundException si le projet n'est pas trouvé avec l'ID spécifié.
     */
    public Project addMemberToProject(Long projectId, String member) {
        Project project = projectRepository.findById(projectId)
            .orElseThrow(() -> new EntityNotFoundException("Project not found with id: " + projectId));
        project.addMember(member);
        projectRepository.save(project); // Enregistrer le projet mis à jour
        return project; // Retourner le projet modifié
    }
    

    /**
     * Supprimer un membre d'un projet spécifié par son identifiant.
     * 
     * @param projectId l'identifiant du projet auquel supprimer un membre.
     * @param member    l'email ou l'identifiant du membre à supprimer.
     * @return le projet mis à jour.
     * @throws EntityNotFoundException si le projet n'est pas trouvé avec l'ID spécifié.
     */
    public Project deleteMemberFromProject(Long projectId, String member) {
        Project project = projectRepository.findById(projectId)
            .orElseThrow(() -> new EntityNotFoundException("Project not found with id: " + projectId));
        project.deleteMemberFromProject(member); // Suppression du membre
        projectRepository.save(project); // Enregistrer le projet mis à jour
        return project; // Retourner le projet modifié
    }
    
    /**
     * Récupérer tous les projets d'un membre spécifié.
     * 
     * @param memberEmail l'email ou l'identifiant du membre.
     * @return une liste des projets auxquels ce membre appartient.
     */
    public List<Project> getProjectsByMember(String memberEmail) {
        return projectRepository.findByMembersContaining(memberEmail);
    }
}
