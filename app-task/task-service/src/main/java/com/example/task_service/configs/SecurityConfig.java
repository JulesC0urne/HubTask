package com.example.task_service.configs;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.List;

@EnableWebSecurity
@Configuration
public class SecurityConfig {

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
                .csrf(csrf -> csrf.disable())
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .authorizeHttpRequests(authorize -> authorize
                        .requestMatchers(HttpMethod.OPTIONS, "/api/tasks/**").permitAll()
                        .requestMatchers(HttpMethod.POST, "/api/tasks/**").permitAll()
                        .requestMatchers(HttpMethod.PUT, "/api/tasks/**").permitAll()
                        .requestMatchers(HttpMethod.DELETE, "/api/tasks/**").permitAll()
                        .requestMatchers(HttpMethod.GET, "/api/tasks/**").permitAll()
                        .requestMatchers("/api/tasks/events").permitAll()
                        .anyRequest().authenticated())
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
        configuration.setAllowedOrigins(List.of("http://localhost:3000", "http://10.2.128.84:3000/")); 
        configuration.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS"));
        configuration.setAllowCredentials(true);
        configuration.setAllowedHeaders(List.of("Content-Type", "Authorization"));
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }
}
