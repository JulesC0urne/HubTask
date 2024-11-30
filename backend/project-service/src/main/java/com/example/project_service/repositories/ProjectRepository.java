package com.example.project_service.repositories;

import com.example.project_service.entities.Project;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Repository pour accéder aux données des projets dans la base de données.
 * Cette interface étend {@link JpaRepository} pour fournir des méthodes CRUD de base pour l'entité {@link Project}.
 * Elle inclut également des méthodes personnalisées pour rechercher des projets selon des critères spécifiques.
 * 
 * @author Courné Jules
 * @version 1.0
 */
@Repository
public interface ProjectRepository extends JpaRepository<Project, Long> {
    
    /**
     * Trouver tous les projets d'un propriétaire spécifié.
     * 
     * @param owner l'email ou l'identifiant du propriétaire des projets.
     * @return une liste de projets associés au propriétaire spécifié.
     */
    List<Project> findByOwner(String owner);

    /**
     * Trouver tous les projets dans lesquels un membre spécifique est inclus.
     * 
     * @param memberEmail l'email ou l'identifiant du membre recherché.
     * @return une liste de projets auxquels appartient le membre spécifié.
     */
    List<Project> findByMembersContaining(String memberEmail);
}
