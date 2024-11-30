package com.example.auth_service.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.security.core.userdetails.UserDetails;

import com.example.auth_service.entities.User;

/**
 * Interface de dépôt (repository) pour gérer les entités `User`.
 * Cette interface étend `JpaRepository`, ce qui permet de bénéficier de toutes les fonctionnalités 
 * de persistance des entités, telles que la gestion des opérations CRUD (Create, Read, Update, Delete).
 * 
 * Elle contient une méthode personnalisée pour rechercher un utilisateur par son nom d'utilisateur.
 */
@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    /**
     * Recherche un utilisateur en fonction de son nom d'utilisateur.
     * Cette méthode permet de récupérer un utilisateur en utilisant son nom d'utilisateur comme clé de recherche.
     * Elle renvoie un objet `UserDetails` (qui est l'interface utilisée par Spring Security pour représenter un utilisateur authentifié).
     *
     * @param username Le nom d'utilisateur à rechercher.
     * @return Un objet `UserDetails` contenant les informations de l'utilisateur, ou `null` si l'utilisateur n'est pas trouvé.
     */
    UserDetails findByUsername(String username);
}
