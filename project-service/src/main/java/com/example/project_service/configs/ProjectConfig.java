package com.example.project_service.configs;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.List;

@Configuration
@EnableWebSecurity
public class ProjectConfig {

    /**
     * Configure le filtre de sécurité pour gérer les paramètres de sécurité HTTP.
     * 
     * @param httpSecurity l'objet HttpSecurity utilisé pour configurer les paramètres de sécurité.
     * @return le SecurityFilterChain configuré.
     * @throws Exception si une erreur se produit dans la configuration de la sécurité.
     */
    @Bean
    SecurityFilterChain securityFilterChain(HttpSecurity httpSecurity) throws Exception {
        return httpSecurity
                .csrf(csrf -> csrf.disable()) // Disable CSRF
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS)) // Stateless sessions
                .authorizeHttpRequests(authorize -> authorize
                        .requestMatchers(HttpMethod.POST, "/api/projects/**").permitAll() // Allow POST
                        .requestMatchers(HttpMethod.GET, "/api/projects/**").permitAll() // Allow GET
                        .requestMatchers(HttpMethod.PUT, "/api/projects/**").permitAll() // Allow PUT
                        .requestMatchers(HttpMethod.DELETE, "/api/projects/**").permitAll() // Allow DELETE
                        .requestMatchers(HttpMethod.OPTIONS, "/api/projects/**").permitAll() // Allow OPTIONS
                        .requestMatchers("/api/projects/events").permitAll() // Allow access to events
                        .anyRequest().authenticated() // All other requests need authentication
                )
                .build();
    }

    /**
     * Configure les paramètres CORS (Cross-Origin Resource Sharing) pour l'application.
     * 
     * @return le CorsConfigurationSource contenant les paramètres CORS pour l'application.
     */
    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOrigins(List.of("http://localhost:3000", "http://10.2.128.84:3000/")); // Ajustez si nécessaire
        configuration.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS"));
        configuration.setAllowCredentials(true);
        configuration.setAllowedHeaders(List.of("Content-Type", "Authorization"));
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration); // Appliquez à tous les endpoints
        return source;
    }
}
