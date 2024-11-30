package com.example.project_service.controllers;

import com.example.project_service.entities.Project;
import com.example.project_service.services.ProjectService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Sinks;
import org.springframework.http.MediaType;

import java.util.List;
import java.util.Map;

/**
 * Contrôleur REST pour gérer les opérations liées aux projets.
 * 
 * Ce contrôleur fournit des endpoints pour effectuer des opérations CRUD sur les projets, ainsi que des
 * fonctionnalités pour gérer les membres d'un projet. Il utilise également Server-Sent Events (SSE) pour envoyer
 * des notifications en temps réel concernant les mises à jour des projets aux clients abonnés.
 * 
 * Les méthodes de ce contrôleur permettent de créer, lire, mettre à jour et supprimer des projets, 
 * ainsi que de gérer les membres des projets (ajout, suppression et consultation).
 * 
 * Les notifications de mise à jour de projet sont envoyées via un flux réactif.
 * 
 * @author Courné Jules
 * @version 1.0
 */
@RestController
@RequestMapping("/api/projects")
public class ProjectController {

    /** 
     * Service des projets pour gérer les opérations liées aux projets. 
     */
    private final ProjectService projectService;

    /** 
     * Sinks pour diffuser les mises à jour des projets sous forme d'événements. 
     */
    private final Sinks.Many<Map<String, Object>> projectSink; 

    /**
     * Constructeur du contrôleur `ProjectController`.
     * 
     * Le constructeur initialise les dépendances nécessaires, notamment le service de gestion des projets
     * (`ProjectService`) et le flux de notification des événements de projet (`projectSink`).
     * 
     * @param projectService le service utilisé pour gérer les projets.
     */
    @Autowired
    public ProjectController(ProjectService projectService) {
        this.projectService = projectService;
        this.projectSink = Sinks.many().multicast().onBackpressureBuffer();
    }

    /**
     * Endpoint pour obtenir les mises à jour des projets en temps réel (via Server-Sent Events).
     * 
     * @return un flux de notifications des mises à jour des projets.
     */
    @GetMapping(value = "/events", produces = MediaType.TEXT_EVENT_STREAM_VALUE)
    public Flux<Map<String, Object>> getProjectUpdates() {
        return projectSink.asFlux(); 
    }

    /**
     * Endpoint pour créer un nouveau projet.
     * 
     * @param project le projet à créer.
     * @return la réponse HTTP contenant le projet créé et un statut 201 (Created).
     */
    @PostMapping
    public ResponseEntity<Project> createProject(@RequestBody Project project) {
        Project createdProject = projectService.createProject(
                project.getName(), project.getDescription(), project.getOwner(),
                project.getStartDate(), project.getEndDate());
        
        // Émettre un événement de création
        projectSink.tryEmitNext(Map.of("type", "PROJECT_CREATED", "project", createdProject));

        return new ResponseEntity<>(createdProject, HttpStatus.CREATED);
    }  

    /**
     * Endpoint pour obtenir tous les projets.
     * 
     * @return la liste de tous les projets existants.
     */
    @GetMapping
    public ResponseEntity<List<Project>> getAllProjects() {
        List<Project> projects = projectService.getAllProjects();
        return new ResponseEntity<>(projects, HttpStatus.OK);
    }

    /**
     * Endpoint pour obtenir un projet par son identifiant.
     * 
     * @param id l'identifiant du projet à rechercher.
     * @return le projet trouvé ou un statut 404 si non trouvé.
     */
    @GetMapping("/{id}")
    public ResponseEntity<Project> getProjectById(@PathVariable Long id) {
        return projectService.getProjectById(id)
                .map(project -> new ResponseEntity<>(project, HttpStatus.OK))
                .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    /**
     * Endpoint pour mettre à jour un projet existant.
     * 
     * @param id l'identifiant du projet à mettre à jour.
     * @param project les nouvelles informations du projet.
     * @return le projet mis à jour avec un statut 200 (OK).
     */
    @PutMapping("/{id}")
    public ResponseEntity<Project> updateProject(@PathVariable Long id, @RequestBody Project project) {
        Project updatedProject = projectService.updateProject(
                id, project.getName(), project.getDescription(),
                project.getStartDate(), project.getEndDate());

        projectSink.tryEmitNext(Map.of("type", "PROJECT_UPDATED", "project", updatedProject));

        return new ResponseEntity<>(updatedProject, HttpStatus.OK);
    }

    /**
     * Endpoint pour supprimer un projet par son identifiant.
     * 
     * @param id l'identifiant du projet à supprimer.
     * @return un statut 204 (No Content) si le projet est supprimé ou 500 si une erreur se produit.
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProject(@PathVariable Long id) {
        Project projectToDelete = projectService.getProjectById(id).orElse(null);

        if (projectToDelete == null) {
            return ResponseEntity.notFound().build();
        }

        projectToDelete.getMembers().forEach(memberEmail -> {
            projectService.deleteMemberFromProject(id, memberEmail);
        });

        boolean isDeleted = projectService.deleteProject(id);

        if (isDeleted) {
            projectSink.tryEmitNext(Map.of("type", "PROJECT_DELETED", "id", id)); 
            return ResponseEntity.noContent().build(); 
        } else {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build(); // 500 si échec
        }
    }

    /**
     * Endpoint pour obtenir tous les projets d'un propriétaire spécifié.
     * 
     * @param owner le propriétaire des projets à rechercher.
     * @return la liste des projets du propriétaire.
     */
    @GetMapping("/owner/{owner}")
    public ResponseEntity<List<Project>> getProjectsByOwner(@PathVariable String owner) {
        List<Project> projects = projectService.getProjectsByOwner(owner);
        return new ResponseEntity<>(projects, HttpStatus.OK);
    }

    /**
     * Endpoint pour obtenir tous les membres d'un projet spécifié.
     * 
     * @param id l'identifiant du projet.
     * @return la liste des membres du projet.
     */
    @GetMapping("/{id}/members")
    public ResponseEntity<List<String>> getMembersByProjectId(@PathVariable Long id) {
        List<String> members = projectService.getMembersByProjectId(id);
        return ResponseEntity.ok(members);
    }

    /**
     * Endpoint pour ajouter un membre à un projet spécifié.
     * 
     * @param id l'identifiant du projet.
     * @param payload le corps de la requête contenant l'email du membre à ajouter.
     * @return le projet mis à jour avec un statut 201 (Created).
     */
    @PostMapping("/{id}/members")
    public ResponseEntity<Project> addMemberToProject(@PathVariable Long id, @RequestBody Map<String, String> payload) {
        String memberEmail = payload.get("memberEmail"); 
        Project updatedProject = projectService.addMemberToProject(id, memberEmail); 

        projectSink.tryEmitNext(Map.of("type", "MEMBER_ADDED", "project", updatedProject));

        return ResponseEntity.status(HttpStatus.CREATED).body(updatedProject); 
    }

    /**
     * Endpoint pour supprimer un membre d'un projet spécifié.
     * 
     * @param id l'identifiant du projet.
     * @param payload le corps de la requête contenant l'email du membre à supprimer.
     * @return le projet mis à jour avec un statut 200 (OK).
     */
    @DeleteMapping("/{id}/members")
    public ResponseEntity<Project> deleteMemberFromProject(@PathVariable Long id, @RequestBody Map<String, String> payload) {
        String memberEmail = payload.get("memberEmail");
        Project updatedProject = projectService.deleteMemberFromProject(id, memberEmail); 
        projectSink.tryEmitNext(Map.of("type", "MEMBER_REMOVED", "project", updatedProject));

        return ResponseEntity.ok(updatedProject);
    }

    /**
     * Endpoint pour obtenir tous les projets d'un membre spécifié.
     * 
     * @param memberEmail l'email du membre dont les projets sont recherchés.
     * @return la liste des projets du membre.
     */
    @GetMapping("/member/{memberEmail}")
    public ResponseEntity<List<Project>> getProjectsByMember(@PathVariable String memberEmail) {
        List<Project> projects = projectService.getProjectsByMember(memberEmail);
        return new ResponseEntity<>(projects, HttpStatus.OK);
    }
}
