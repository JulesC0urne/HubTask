package com.example.auth_service.enums;

/**
 * L'énumération {@code UserRole} définit les différents rôles utilisateur dans l'application.
 * Chaque rôle est associé à un nom spécifique, qui inclut le préfixe {@code ROLE_}, utilisé
 * par Spring Security pour gérer les autorisations.
 */
public enum UserRole {

    /**
     * Rôle d'administrateur.
     * Ce rôle donne un accès complet aux fonctionnalités de l'application, 
     * généralement pour la gestion des utilisateurs et des données sensibles.
     */
    ADMIN("ROLE_ADMIN"),

    /**
     * Rôle d'utilisateur standard.
     * Ce rôle est attribué aux utilisateurs ayant des permissions limitées,
     * principalement pour accéder aux fonctionnalités de l'application.
     */
    USER("ROLE_USER");

    /**
     * La chaîne de caractères représentant le rôle de l'utilisateur.
     * Chaque rôle inclut un préfixe {@code ROLE_} qui est attendu par Spring Security.
     */
    private String role;

    /**
     * Constructeur pour initialiser le rôle avec son nom sous forme de chaîne de caractères.
     * 
     * @param role Le nom du rôle, incluant le préfixe {@code ROLE_}.
     */
    UserRole(String role) {
        this.role = role;
    }

    /**
     * Retourne le nom du rôle sous forme de chaîne de caractères.
     * 
     * @return Le nom du rôle, incluant le préfixe {@code ROLE_}.
     */
    public String getRole() {
        return role;
    }
}
