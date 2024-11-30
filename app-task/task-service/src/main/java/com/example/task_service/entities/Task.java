package com.example.task_service.entities;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "task_dt")
public class Task {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;
    private String description;

    @Column(name = "create_date")
    private LocalDateTime createDate;

    @Column(name = "due_date")
    private LocalDateTime dueDate;

    private String status;

    @Column(name = "user_email")
    private String userMail;

    @Column(name = "project_id")
    private Long projectId;

    public Task(){

    }
    
    public Task(String title, String description, LocalDateTime createDate, LocalDateTime dueDate, String status, String userMail, Long projectId) {
        this.title = title;
        this.description = description;
        this.createDate = createDate;
        this.dueDate = dueDate;
        this.status = status;
        this.userMail = userMail;
        this.projectId = projectId;
    }

    // Getters et setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public LocalDateTime getcreateDate() {
        return createDate;
    }

    public void setCreateDate(LocalDateTime createDate) {
        this.createDate = createDate;
    }

    public LocalDateTime getDueDate() {
        return dueDate;
    }

    public void setDueDate(LocalDateTime dueDate) {
        this.dueDate = dueDate;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getUserMail() {
        return userMail;
    }

    public void setUserMail(String userMail) {
        this.userMail = userMail;
    }

    public Long getProjectId() {
        return projectId;
    }

    public void setProjectId(Long projectId) {
        this.projectId = projectId;
    }

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
