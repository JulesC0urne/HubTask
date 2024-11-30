package com.example.project_service.services;

import com.example.project_service.entities.Project;
import com.example.project_service.repositories.ProjectRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import jakarta.persistence.EntityNotFoundException; // Si vous utilisez Jakarta

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class ProjectService {

    private final ProjectRepository projectRepository;

    @Autowired
    public ProjectService(ProjectRepository projectRepository) {
        this.projectRepository = projectRepository;
    }

    // Créer un projet
    public Project createProject(String name, String description, String owner, LocalDateTime startDate, LocalDateTime endDate) {
        Project project = new Project();
        project.setName(name);
        project.setDescription(description);
        project.setOwner(owner);
        project.setStartDate(startDate);
        project.setEndDate(endDate);
        return projectRepository.save(project);
    }

    // Récupérer tous les projets
    public List<Project> getAllProjects() {
        return projectRepository.findAll();
    }

    // Récupérer les projets par nom d'utilisateur
    public List<Project> getProjectsByOwner(String owner) {
        return projectRepository.findByOwner(owner);
    }

    // Récupérer un projet par son ID
    public Optional<Project> getProjectById(Long id) {
        return projectRepository.findById(id);
    }

    // Mettre à jour un projet
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

    // Supprimer un projet par son ID
    public boolean deleteProject(Long id) {
        if (projectRepository.existsById(id)) {
            projectRepository.deleteById(id);
            return true;
        } 
        return false;
    }

    public List<String> getMembersByProjectId(Long projectId) {
        Project project = projectRepository.findById(projectId)
            .orElseThrow(() -> new EntityNotFoundException("Project not found with id: " + projectId));
        return project.getMembers();
    }

    // Ajouter un membre à un projet
    public Project addMemberToProject(Long projectId, String member) {
        Project project = projectRepository.findById(projectId)
            .orElseThrow(() -> new EntityNotFoundException("Project not found with id: " + projectId));
        project.addMember(member);
        projectRepository.save(project); // Enregistrer le projet mis à jour
        return project; // Retourner le projet modifié
    }
    

    // Supprimer un membre d'un projet
    public Project deleteMemberFromProject(Long projectId, String member) {
        Project project = projectRepository.findById(projectId)
            .orElseThrow(() -> new EntityNotFoundException("Project not found with id: " + projectId));
        project.deleteMemberFromProject(member); // Suppression du membre
        projectRepository.save(project); // Enregistrer le projet mis à jour
        return project; // Retourner le projet modifié
    }
    

    public List<Project> getProjectsByMember(String memberEmail) {
        return projectRepository.findByMembersContaining(memberEmail);
    }
}
