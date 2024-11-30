package com.example.project_service.entities;

import jakarta.persistence.*;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "project_dt")
public class Project {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String description;
    private String owner;

    @Column(name = "start_date")
    private LocalDateTime startDate;

    @Column(name = "end_date")
    private LocalDateTime endDate;

    @ElementCollection
    @CollectionTable(
        name = "project_members",
        joinColumns = @JoinColumn(name = "project_id")
    )
    @Column(name = "members")
    private List<String> members;

    public List<String> getMembers() {
        return members;
    }

    public void setMembers(List<String> members) {
        this.members = members;
    }

    // Getter pour id
    public Long getId() {
        return id;
    }

    // Setter pour id
    public void setId(Long id) {
        this.id = id;
    }

    // Getter pour name
    public String getName() {
        return name;
    }

    // Setter pour name
    public void setName(String name) {
        this.name = name;
    }

    // Getter pour description
    public String getDescription() {
        return description;
    }

    // Setter pour description
    public void setDescription(String description) {
        this.description = description;
    }

    // Getter pour startDate
    public LocalDateTime getStartDate() {
        return startDate;
    }

    // Setter pour startDate
    public void setStartDate(LocalDateTime startDate) {
        this.startDate = startDate;
    }

    // Getter pour endDate
    public LocalDateTime getEndDate() {
        return endDate;
    }

    // Setter pour endDate
    public void setEndDate(LocalDateTime endDate) {
        this.endDate = endDate;
    }

    // Getter pour endDate
    public String getOwner() {
        return this.owner;
    }

    // Setter pour endDate
    public void setOwner(String owner) {
        this.owner = owner;
    }

    public void addMember(String member) {
        if (!members.contains(member)) { // Vérifier si le membre n'existe pas déjà
            members.add(member);
        }
    }

    // Suppression de membre
    public void deleteMemberFromProject(String member) {
        members.remove(member); // Retirer le membre de la liste
    }
}
