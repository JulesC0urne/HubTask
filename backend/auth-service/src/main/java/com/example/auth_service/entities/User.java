package com.example.auth_service.entities;

import jakarta.persistence.*;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;

import com.example.auth_service.enums.UserRole;

import java.util.Collection;
import java.util.List;

/**
 * Entité représentant un utilisateur dans l'application. 
 * Cette classe implémente l'interface {@link UserDetails} de Spring Security 
 * afin de gérer l'authentification et l'autorisation des utilisateurs.
 * 
 * Elle est liée à la table "user_dt" de la base de données via JPA.
 * 
 * @author Jules Courné
 * @version 1.0
 */
@Entity
@Table(name = "user_dt")
public class User implements UserDetails {

    /**
     * Identifiant unique de l'utilisateur dans la base de données.
     * Il est généré automatiquement lors de la création d'un nouvel utilisateur.
     */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    /**
     * Nom d'utilisateur (Email) unique utilisé pour l'authentification. 
     */
    private String username;

    /**
     * Mot de passe de l'utilisateur, stocké sous forme chiffrée.
     */
    private String password;

    /**
     * Rôle de l'utilisateur. Peut être un utilisateur standard ou un administrateur.
     */
    @Enumerated(EnumType.STRING)
    private UserRole role;

    /**
     * Constructeur par défaut nécessaire pour JPA.
     */
    public User() {
    }

    /**
     * Constructeur permettant de créer un utilisateur avec un nom d'utilisateur et un mot de passe.
     * Le rôle par défaut est "USER".
     * 
     * @param username Le nom d'utilisateur.
     * @param password Le mot de passe de l'utilisateur.
     */
    public User(String username, String password) {
        this.username = username;
        this.password = password;
        this.role = UserRole.USER;
    }

    /**
     * Retourne la liste des autorités (rôles) associées à cet utilisateur.
     * 
     * - Si l'utilisateur est un administrateur, il aura les rôles "ROLE_ADMIN" et "ROLE_USER".
     * - Si l'utilisateur est un utilisateur standard, il aura uniquement le rôle "ROLE_USER".
     * 
     * @return Collection d'objets {@link GrantedAuthority} représentant les rôles de l'utilisateur.
     */
    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        if (this.role == UserRole.ADMIN) {
            return List.of(new SimpleGrantedAuthority(UserRole.ADMIN.getRole()), new SimpleGrantedAuthority(UserRole.USER.getRole()));
        }
        return List.of(new SimpleGrantedAuthority(UserRole.USER.getRole()));
    }


    /**
     * Retourne l'identifiant unique de l'utilisateur.
     * 
     * @return L'identifiant de l'utilisateur.
     */
    public Long getId() {
        return id;
    }

    /**
     * Définit l'identifiant de l'utilisateur.
     * 
     * @param id L'identifiant de l'utilisateur.
     */
    public void setId(Long id) {
        this.id = id;
    }

    /**
     * Retourne le nom d'utilisateur de l'utilisateur.
     * 
     * @return Le nom d'utilisateur.
     */
    public String getUsername() {
        return username;
    }

    /**
     * Définit le nom d'utilisateur de l'utilisateur.
     * 
     * @param username Le nom d'utilisateur.
     */
    public void setUsername(String username) {
        this.username = username;
    }

    /**
     * Retourne le mot de passe de l'utilisateur.
     * 
     * @return Le mot de passe de l'utilisateur.
     */
    public String getPassword() {
        return password;
    }

    /**
     * Définit le mot de passe de l'utilisateur.
     * 
     * @param password Le mot de passe.
     */
    public void setPassword(String password) {
        this.password = password;
    }

    /**
     * Retourne le rôle de l'utilisateur.
     * 
     * @return Le rôle de l'utilisateur.
     */
    public UserRole getRole() {
        return this.role;
    }
}