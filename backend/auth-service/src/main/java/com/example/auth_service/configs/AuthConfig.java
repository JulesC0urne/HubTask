package com.example.auth_service.configs;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.List;

/**
 * Configuration de sécurité pour le service d'authentification.
 * Cette classe configure les aspects de sécurité liés à l'authentification, 
 * à la gestion des sessions, ainsi qu'aux règles CORS.
 * 
 * Elle inclut les configurations de base pour l'authentification, 
 * la gestion des mots de passe, et la configuration des autorisations 
 * d'accès aux différentes routes HTTP.
 * 
 * @author Jules Courné
 * @version 1.0
 */
@Configuration
@EnableWebSecurity
public class AuthConfig {

    /**
     * Configure la sécurité de l'application en définissant les règles de filtrage des requêtes HTTP.
     * 
     * @param httpSecurity L'objet HttpSecurity utilisé pour configurer les règles de sécurité.
     * @return Un objet SecurityFilterChain qui contient les configurations de sécurité.
     */
    @Bean
    SecurityFilterChain securityFilterChain(HttpSecurity httpSecurity) throws Exception {
        return httpSecurity
                .csrf(csrf -> csrf.disable())
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .authorizeHttpRequests(authorize -> authorize
                        .requestMatchers(HttpMethod.POST, "/api/auth/signup").permitAll() 
                        .requestMatchers(HttpMethod.POST, "/api/auth/login").permitAll()
                        .requestMatchers(HttpMethod.GET, "/api/auth/users").permitAll()
                        .anyRequest().authenticated()
                )
                .build();
    }
	
    /**
     * Crée et retourne un objet PasswordEncoder utilisant l'algorithme de hachage BCrypt.
     *
     * @return Un objet PasswordEncoder qui utilise l'algorithme BCrypt pour encoder les mots de passe.
     */
    @Bean
    PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    /**
     * Crée et retourne un gestionnaire d'authentification (AuthenticationManager) en utilisant la configuration fournie.
     *
     * @param authenticationConfiguration La configuration d'authentification utilisée pour obtenir le gestionnaire d'authentification.
     * @return Un objet {@link AuthenticationManager} configuré avec la configuration d'authentification fournie.
     * @throws Exception Si une erreur survient lors de la création du gestionnaire d'authentification.
     */
    @Bean
    AuthenticationManager authenticationManager(AuthenticationConfiguration authenticationConfiguration)
            throws Exception {
        return authenticationConfiguration.getAuthenticationManager();
    }

    /**
     * Crée et retourne une source de configuration CORS pour gérer les demandes
     * provenant de différentes origines.
     *
     * @return Une instance de CorsConfigurationSource qui contient la configuration CORS pour l'application.
     */
    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOrigins(List.of("http://localhost:3000", "http://10.2.128.84:3000/")); 
        configuration.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS"));
        configuration.setAllowCredentials(true);
        configuration.setAllowedHeaders(List.of("Content-Type", "Authorization"));
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration); 
        return source;
    }
}
