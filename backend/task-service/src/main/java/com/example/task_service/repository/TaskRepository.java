package com.example.task_service.repository;

import com.example.task_service.entities.Task;

import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDateTime;
import java.util.List;

/**
 * Interface de gestion des tâches dans la base de données.
 * 
 * Cette interface étend {@link JpaRepository} et permet d'effectuer des opérations CRUD (Create, Read, Update, Delete)
 * sur les entités `Task`. Elle inclut des méthodes spécifiques pour rechercher des tâches en fonction de différents critères.
 * 
 * @author Courné Jules
 * @version 1.0
 */
public interface TaskRepository extends JpaRepository<Task, Long> {
    
    /**
     * Recherche une tâche par sa date de création.
     * 
     * Cette méthode permet de trouver une tâche en utilisant sa date de création unique.
     * 
     * @param createDate La date de création de la tâche.
     * @return La tâche correspondante à la date de création donnée, ou {@code null} si aucune tâche n'est trouvée.
     */
    Task findByCreateDate(LocalDateTime createDate);

    /**
     * Recherche des tâches associées à un utilisateur en fonction de son email.
     * 
     * Cette méthode permet de récupérer toutes les tâches associées à un utilisateur particulier,
     * identifiées par leur adresse email.
     * 
     * @param userEmail L'email de l'utilisateur pour lequel récupérer les tâches.
     * @return Une liste de tâches associées à l'email de l'utilisateur.
     */
    List<Task> findByUserMail(String userEmail);

    /**
     * Recherche des tâches associées à un projet donné.
     * 
     * Cette méthode permet de récupérer toutes les tâches associées à un projet spécifique, 
     * identifiées par l'ID du projet.
     * 
     * @param id L'ID du projet pour lequel récupérer les tâches.
     * @return Une liste de tâches associées à l'ID du projet.
     */
    List<Task> findByProjectId(Long id);
}
