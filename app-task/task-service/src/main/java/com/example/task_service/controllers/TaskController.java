package com.example.task_service.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Sinks;
import org.springframework.http.MediaType;

import com.example.task_service.services.TaskService;
import com.example.task_service.entities.Task;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/tasks")
public class TaskController {

    private TaskService taskService;
    private final Sinks.Many<Map<String, Object>> taskSink; 

    /**
     * Constructeur de TaskController.
     * @param taskService Service des tâches pour accéder aux opérations de gestion des tâches.
     */
    @Autowired
    public TaskController(TaskService taskService) {
        this.taskService = taskService;
        this.taskSink = Sinks.many().multicast().onBackpressureBuffer();
    }
    
    /**
     * Endpoint pour obtenir les mises à jour des tâches sous forme d'événements en temps réel.
     * @return Un Flux de mises à jour des tâches sous forme de Map contenant les informations des tâches.
     */
    @GetMapping(value = "/events", produces = MediaType.TEXT_EVENT_STREAM_VALUE)
    public Flux<Map<String, Object>> getTaskUpdates() {
        return taskSink.asFlux(); 
    }

    /**
     * Endpoint pour récupérer toutes les tâches.
     * @return La liste des tâches existantes.
     */
    @GetMapping
    public List<Task> getAllTasks() {
        return taskService.getAllTasks();
    }

    /**
     * Endpoint pour créer une nouvelle tâche.
     * @param task La tâche à créer.
     * @return La tâche créée, retournée avec un code de statut HTTP 200.
     */
    @PostMapping("/create")
    public ResponseEntity<Task> createTask(@RequestBody Task task) {
        System.out.println("Received task: " + task);
        Task createdTask = taskService.createTask(task);
        taskSink.tryEmitNext(Map.of("type", "TASK_CREATED", "task", createdTask));
        return ResponseEntity.ok(createdTask);
    }

    /**
     * Endpoint pour mettre à jour une tâche existante.
     * @param createDate La date de création de la tâche à mettre à jour.
     * @param newTask Les nouvelles informations pour la tâche.
     * @return La tâche mise à jour ou un code de statut HTTP 404 si la tâche n'est pas trouvée.
     */
    @PutMapping("/update")
    public ResponseEntity<Task> updateTask(@RequestParam LocalDateTime createDate, @RequestBody Task newTask) {
        Task existingTask = taskService.getTaskByCreateDate(createDate);

        if (existingTask == null) {
            return ResponseEntity.notFound().build();
        }

        existingTask.setTitle(newTask.getTitle());
        existingTask.setDescription(newTask.getDescription());
        existingTask.setDueDate(newTask.getDueDate());
        existingTask.setStatus(newTask.getStatus());

        Task updatedTask = taskService.updateTask(existingTask);

        taskSink.tryEmitNext(Map.of("type", "TASK_UPDATED", "task", updatedTask, "createDate", createDate));

        return ResponseEntity.ok(updatedTask);
    }

    /**
     * Endpoint pour récupérer une tâche par son identifiant.
     * @param id L'identifiant de la tâche à récupérer.
     * @return La tâche correspondante, ou un code de statut HTTP 404 si la tâche n'est pas trouvée.
     */
    @GetMapping("/{id}")
    public ResponseEntity<Task> getTaskById(@PathVariable Long id) {
        Task task = taskService.getTaskById(id);
        return ResponseEntity.ok(task);
    }

    /**
     * Endpoint pour récupérer les tâches associées à un utilisateur via son e-mail.
     * @param userEmail L'e-mail de l'utilisateur pour lequel récupérer les tâches.
     * @return La liste des tâches associées à cet utilisateur.
     */
    @GetMapping("/user/{userEmail}")
    public List<Task> getTaskById(@PathVariable String userEmail) {
        List<Task> tasks = taskService.getTaskByUserEmail(userEmail);
        return tasks;
    }

    /**
     * Endpoint pour supprimer une tâche par son identifiant.
     * @param id L'identifiant de la tâche à supprimer.
     * @return Un code de statut HTTP 200 si la tâche a été supprimée avec succès.
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteTask(@PathVariable Long id) {
        taskService.deleteTask(id);

        return ResponseEntity.ok().build();
    }

    /**
     * Endpoint pour supprimer une tâche par sa date de création.
     * @param createDate La date de création de la tâche à supprimer.
     * @return Un code de statut HTTP 200 si la tâche a été supprimée, ou 404 si la tâche n'a pas été trouvée.
     */
    @DeleteMapping("/delete")
    public ResponseEntity<?> deleteByCreateDate(@RequestParam LocalDateTime createDate) {
        Task task = taskService.getTaskByCreateDate(createDate);

        if (task == null) {
            return ResponseEntity.notFound().build();  
        }
        Long id = task.getId();
        taskService.deleteTask(id);
        taskSink.tryEmitNext(Map.of("type", "TASK_DELETED", "createDate", createDate));
        return ResponseEntity.ok().build();
    }

    /**
     * Endpoint pour récupérer les tâches associées à un projet via son identifiant.
     * @param projectId L'identifiant du projet pour lequel récupérer les tâches.
     * @return La liste des tâches associées à ce projet.
     */
    @GetMapping("/project/{projectId}")
    public ResponseEntity<List<Task>> getTaskByProjectId(@PathVariable Long projectId) {
        List<Task> tasks = taskService.getTaskByProjectId(projectId);
        return ResponseEntity.ok(tasks);
    }

}
