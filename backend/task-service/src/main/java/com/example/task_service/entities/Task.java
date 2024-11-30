package com.example.task_service.entities;

import jakarta.persistence.*;
import java.time.LocalDateTime;

/**
 * Représente une tâche dans le système.
 * 
 * Cette classe est une entité JPA mappée à une table dans la base de données. 
 * Elle contient les informations relatives à une tâche, telles que le titre, la description, 
 * les dates importantes (création et échéance), le statut de la tâche, l'email de l'utilisateur 
 * associé et l'ID du projet auquel la tâche appartient.
 * 
 * @author Courné Jules
 * @version 1.0
 */
@Entity
@Table(name = "task_dt")
public class Task {

    /**
     * L'ID unique de la tâche.
     * 
     * Il s'agit de la clé primaire de l'entité, générée automatiquement par la base de données.
     */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    /**
     * Le titre de la tâche.
     * 
     * Ce champ est utilisé pour décrire brièvement l'objet ou l'objectif de la tâche.
     */
    private String title;

    /**
     * La description détaillée de la tâche.
     * 
     * Ce champ permet d'ajouter des informations supplémentaires sur ce que la tâche implique ou ce qui doit être fait.
     */
    private String description;

    /**
     * La date de création de la tâche.
     * 
     * Ce champ enregistre la date et l'heure auxquelles la tâche a été créée.
     */
    @Column(name = "create_date")
    private LocalDateTime createDate;

    /**
     * La date d'échéance de la tâche.
     * 
     * Ce champ enregistre la date et l'heure auxquelles la tâche doit être terminée.
     */
    @Column(name = "due_date")
    private LocalDateTime dueDate;

    /**
     * Le statut actuel de la tâche.
     * 
     * Ce champ indique l'état actuel de la tâche (To Do, In Progress, In Testing, Done)
     */
    private String status;

    /**
     * L'email de l'utilisateur associé à la tâche.
     * 
     * Ce champ permet de lier la tâche à un utilisateur spécifique. Il s'agit de 
     * l'email de la personne responsable de la tâche.
     */
    @Column(name = "user_email")
    private String userMail;

    /**
     * L'ID du projet auquel la tâche appartient.
     * 
     * Ce champ est utilisé pour lier la tâche à un projet spécifique.
     */
    @Column(name = "project_id")
    private Long projectId;

    /**
     * Constructeur par défaut.
     * 
     * Utilisé principalement par JPA lors de la création de l'entité.
     */
    public Task(){

    }
    
    /**
     * Constructeur avec tous les paramètres pour initialiser une tâche.
     * 
     * @param title Le titre de la tâche.
     * @param description La description de la tâche.
     * @param createDate La date de création de la tâche.
     * @param dueDate La date d'échéance de la tâche.
     * @param status Le statut de la tâche.
     * @param userMail L'email de l'utilisateur associé à la tâche.
     * @param projectId L'ID du projet auquel la tâche appartient.
     */
    public Task(String title, String description, LocalDateTime createDate, LocalDateTime dueDate, String status, String userMail, Long projectId) {
        this.title = title;
        this.description = description;
        this.createDate = createDate;
        this.dueDate = dueDate;
        this.status = status;
        this.userMail = userMail;
        this.projectId = projectId;
    }

    /**
     * Récupère l'ID de la tâche.
     * 
     * @return L'ID unique de la tâche.
     */
    public Long getId() {
        return id;
    }

    /**
     * Définit l'ID de la tâche.
     * 
     * @param id L'ID unique de la tâche.
     */
    public void setId(Long id) {
        this.id = id;
    }

    /**
     * Récupère le titre de la tâche.
     * 
     * @return Le titre de la tâche.
     */
    public String getTitle() {
        return title;
    }

    /**
     * Définit le titre de la tâche.
     * 
     * @param title Le titre de la tâche.
     */
    public void setTitle(String title) {
        this.title = title;
    }

    /**
     * Récupère la description de la tâche.
     * 
     * @return La description de la tâche.
     */
    public String getDescription() {
        return description;
    }

    /**
     * Définit la description de la tâche.
     * 
     * @param description La description de la tâche.
     */
    public void setDescription(String description) {
        this.description = description;
    }

    /**
     * Récupère la date de création de la tâche.
     * 
     * @return La date de création de la tâche.
     */
    public LocalDateTime getCreateDate() {
        return createDate;
    }

    /**
     * Définit la date de création de la tâche.
     * 
     * @param createDate La date de création de la tâche.
     */
    public void setCreateDate(LocalDateTime createDate) {
        this.createDate = createDate;
    }

    /**
     * Récupère la date d'échéance de la tâche.
     * 
     * @return La date d'échéance de la tâche.
     */
    public LocalDateTime getDueDate() {
        return dueDate;
    }

    /**
     * Définit la date d'échéance de la tâche.
     * 
     * @param dueDate La date d'échéance de la tâche.
     */
    public void setDueDate(LocalDateTime dueDate) {
        this.dueDate = dueDate;
    }

    /**
     * Récupère le statut de la tâche.
     * 
     * @return Le statut actuel de la tâche.
     */
    public String getStatus() {
        return status;
    }

    /**
     * Définit le statut de la tâche.
     * 
     * @param status Le statut actuel de la tâche.
     */
    public void setStatus(String status) {
        this.status = status;
    }

    /**
     * Récupère l'email de l'utilisateur associé à la tâche.
     * 
     * @return L'email de l'utilisateur associé à la tâche.
     */
    public String getUserMail() {
        return userMail;
    }

    /**
     * Définit l'email de l'utilisateur associé à la tâche.
     * 
     * @param userMail L'email de l'utilisateur associé à la tâche.
     */
    public void setUserMail(String userMail) {
        this.userMail = userMail;
    }

    /**
     * Récupère l'ID du projet auquel la tâche appartient.
     * 
     * @return L'ID du projet auquel la tâche appartient.
     */
    public Long getProjectId() {
        return projectId;
    }

    /**
     * Définit l'ID du projet auquel la tâche appartient.
     * 
     * @param projectId L'ID du projet auquel la tâche appartient.
     */
    public void setProjectId(Long projectId) {
        this.projectId = projectId;
    }

    /**
     * Retourne une représentation en chaîne de caractères de l'objet Task.
     * 
     * @return La représentation en chaîne de caractères de l'objet Task.
     */
    @Override
    public String toString() {
        return "Task{" +
                "id=" + id +
                ", title='" + title + '\'' +
                ", description='" + description + '\'' +
                ", createDate='" + createDate + '\'' +
                ", dueDate=" + dueDate +
                ", status='" + status + '\'' +
                ", userMail='" + userMail + '\'' +
                '}';
    }
}
