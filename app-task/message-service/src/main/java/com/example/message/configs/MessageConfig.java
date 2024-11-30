package com.example.message.configs;

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
public class MessageConfig {

    /**
     * Configure la sécurité HTTP de l'application.
     * 
     * @param httpSecurity l'objet HttpSecurity utilisé pour configurer la sécurité
     * @return une instance de SecurityFilterChain qui définit la manière dont la sécurité est appliquée
     * @throws Exception en cas d'erreur lors de la configuration de la sécurité
     */
    @Bean
    SecurityFilterChain securityFilterChain(HttpSecurity httpSecurity) throws Exception {
        return httpSecurity
                .csrf(csrf -> csrf.disable()) // Disable CSRF
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS)) // Stateless sessions
                .authorizeHttpRequests(authorize -> authorize
                        .requestMatchers(HttpMethod.POST, "/api/messages/**").permitAll() // Allow signup
                        .requestMatchers(HttpMethod.GET, "/api/messages/**").permitAll() // Allow login
                        .requestMatchers(HttpMethod.OPTIONS, "/api/messages/**").permitAll() // Allow user access
                        .requestMatchers("/api/messages/stream/**").permitAll() // Allow access to events
                        .anyRequest().authenticated() // All other requests need authentication
                )
                .build();
    }

    /**
     * Configure les paramètres CORS (Cross-Origin Resource Sharing) pour gérer les requêtes provenant d'autres origines.
     * Cela permet de spécifier les origines, méthodes, et en-têtes autorisés pour les requêtes HTTP entre différents domaines.
     * 
     * @return un CorsConfigurationSource qui définit les règles CORS pour l'application
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
