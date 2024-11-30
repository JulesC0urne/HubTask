package com.example.project_service.entities;

import jakarta.persistence.*;
import java.time.LocalDateTime;
import java.util.List;

/**
 * Entité représentant un projet.
 * Un projet contient des informations sur son nom, sa description, son propriétaire, ses dates de début et de fin,
 * ainsi que la liste de ses membres.
 * 
 * @author Courné Jules
 * @version 1.0
 */
@Entity
@Table(name = "project_dt")
public class Project {

    /**
     * Identifiant unique du projet.
     * Ce champ est généré automatiquement à partir de la base de données.
     */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    /**
     * Nom du projet.
     */
    private String name;

    /**
     * Description détaillée du projet.
     */
    private String description;

    /**
     * Propriétaire du projet (Email).
     */
    private String owner;

    /**
     * Date de début du projet.
     */
    @Column(name = "start_date")
    private LocalDateTime startDate;

    /**
     * Date de fin du projet.
     */
    @Column(name = "end_date")
    private LocalDateTime endDate;

    /**
     * Liste des membres du projet (emails).
     * Utilisation de `@ElementCollection` pour stocker une collection d'éléments simples dans une table séparée.
     */
    @ElementCollection
    @CollectionTable(
        name = "project_members",
        joinColumns = @JoinColumn(name = "project_id")
    )
    @Column(name = "members")
    private List<String> members;

    /**
     * Getter pour la liste des membres du projet.
     * 
     * @return la liste des membres du projet.
     */
    public List<String> getMembers() {
        return members;
    }

    /**
     * Setter pour la liste des membres du projet.
     * 
     * @param members la nouvelle liste des membres du projet.
     */
    public void setMembers(List<String> members) {
        this.members = members;
    }

    /**
     * Getter pour l'identifiant du projet.
     * 
     * @return l'identifiant du projet.
     */
    public Long getId() {
        return id;
    }

    /**
     * Setter pour l'identifiant du projet.
     * 
     * @param id l'identifiant du projet.
     */
    public void setId(Long id) {
        this.id = id;
    }

    /**
     * Getter pour le nom du projet.
     * 
     * @return le nom du projet.
     */
    public String getName() {
        return name;
    }

    /**
     * Setter pour le nom du projet.
     * 
     * @param name le nom du projet.
     */
    public void setName(String name) {
        this.name = name;
    }

    /**
     * Getter pour la description du projet.
     * 
     * @return la description du projet.
     */
    public String getDescription() {
        return description;
    }

    /**
     * Setter pour la description du projet.
     * 
     * @param description la description du projet.
     */
    public void setDescription(String description) {
        this.description = description;
    }

    /**
     * Getter pour la date de début du projet.
     * 
     * @return la date de début du projet.
     */
    public LocalDateTime getStartDate() {
        return startDate;
    }

    /**
     * Setter pour la date de début du projet.
     * 
     * @param startDate la date de début du projet.
     */
    public void setStartDate(LocalDateTime startDate) {
        this.startDate = startDate;
    }

    /**
     * Getter pour la date de fin du projet.
     * 
     * @return la date de fin du projet.
     */
    public LocalDateTime getEndDate() {
        return endDate;
    }

    /**
     * Setter pour la date de fin du projet.
     * 
     * @param endDate la date de fin du projet.
     */
    public void setEndDate(LocalDateTime endDate) {
        this.endDate = endDate;
    }

    /**
     * Getter pour le propriétaire du projet.
     * 
     * @return le propriétaire du projet.
     */
    public String getOwner() {
        return this.owner;
    }

    /**
     * Setter pour le propriétaire du projet.
     * 
     * @param owner le propriétaire du projet.
     */
    public void setOwner(String owner) {
        this.owner = owner;
    }

    /**
     * Ajouter un membre au projet si ce membre n'est pas déjà dans la liste des membres.
     * 
     * @param member l'email ou identifiant du membre à ajouter.
     */
    public void addMember(String member) {
        if (!members.contains(member)) { // Vérifie si le membre n'existe pas déjà
            members.add(member);
        }
    }

    /**
     * Supprimer un membre du projet.
     * 
     * @param member l'email ou identifiant du membre à supprimer.
     */
    public void deleteMemberFromProject(String member) {
        members.remove(member); // Retirer le membre de la liste des membres
    }
}
