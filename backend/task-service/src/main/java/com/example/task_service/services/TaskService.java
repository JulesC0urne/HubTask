package com.example.task_service.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.task_service.repository.TaskRepository;
import com.example.task_service.entities.Task;

import java.time.LocalDateTime;
import java.util.List;

/**
 * Service de gestion des tâches.
 * 
 * Ce service fournit des méthodes pour effectuer des opérations sur les tâches, comme la création, 
 * la récupération, la mise à jour et la suppression de tâches. Il interagit avec le {@link TaskRepository} 
 * pour accéder à la base de données.
 * 
 * @author Courné Jules
 * @version 1.0
 */
@Service
public class TaskService {

    @Autowired
    private TaskRepository taskRepository;

    /**
     * Récupère toutes les tâches disponibles dans la base de données.
     * 
     * @return Une liste contenant toutes les tâches.
     */
    public List<Task> getAllTasks() {
        return taskRepository.findAll();
    }

    /**
     * Crée une nouvelle tâche dans la base de données.
     * 
     * @param task L'objet Task à créer.
     * @return La tâche qui a été enregistrée dans la base de données.
     */
    public Task createTask(Task task) {
        return taskRepository.save(task);
    }

    /**
     * Récupère une tâche par son identifiant.
     * 
     * @param id L'identifiant de la tâche à récupérer.
     * @return La tâche correspondante.
     * @throws RuntimeException Si aucune tâche n'est trouvée avec l'ID donné.
     */
    public Task getTaskById(Long id) {
        return taskRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Task not found"));
    }

    /**
     * Récupère toutes les tâches associées à un utilisateur spécifique via son email.
     * 
     * @param userEmail L'email de l'utilisateur pour lequel récupérer les tâches.
     * @return Une liste de tâches associées à cet utilisateur.
     * @throws RuntimeException Si aucune tâche n'est trouvée pour cet utilisateur.
     */
    public List<Task> getTaskByUserEmail(String userEmail) {
        List<Task> tasks = taskRepository.findByUserMail(userEmail); // Mise à jour pour utiliser userMail
        if (tasks.isEmpty()) {
            throw new RuntimeException("No tasks found for user with email: " + userEmail);
        }
        return tasks;
    }

    /**
     * Supprime une tâche en fonction de son identifiant.
     * 
     * @param id L'identifiant de la tâche à supprimer.
     */
    public void deleteTask(Long id) {
        taskRepository.deleteById(id);
    }

    /**
     * Récupère une tâche en fonction de sa date de création.
     * 
     * @param createDate La date de création de la tâche à rechercher.
     * @return La tâche correspondante à la date de création donnée.
     */
    public Task getTaskByCreateDate(LocalDateTime createDate) {
        return taskRepository.findByCreateDate(createDate);
    }

    /**
     * Met à jour une tâche existante.
     * 
     * @param task L'objet Task contenant les nouvelles informations pour la tâche à mettre à jour.
     * @return La tâche mise à jour.
     */
    public Task updateTask(Task task) {
        return taskRepository.save(task);
    }

    /**
     * Récupère les tâches associées à un projet donné par son identifiant.
     * 
     * @param projectId L'identifiant du projet pour lequel récupérer les tâches.
     * @return Une liste de tâches associées au projet.
     */
    public List<Task> getTaskByProjectId(Long projectId) {
        return taskRepository.findByProjectId(projectId);
    }
}
