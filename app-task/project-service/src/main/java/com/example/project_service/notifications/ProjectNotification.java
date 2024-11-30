package com.example.project_service.notifications;

import com.example.project_service.entities.Project;

public class ProjectNotification {
    private Project project;
    private String action; // "CREATE", "UPDATE", "DELETE"

    public ProjectNotification(Project project, String action) {
        this.project = project;
        this.action = action;
    }

    // Getters et setters
    public Project getProject() {
        return project;
    }

    public void setProject(Project project) {
        this.project = project;
    }

    public String getAction() {
        return action;
    }

    public void setAction(String action) {
        this.action = action;
    }
}
