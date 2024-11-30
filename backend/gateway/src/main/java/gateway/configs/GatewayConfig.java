package gateway.configs;

import gateway.filters.JwtAuthenticationFilter;
import org.springframework.cloud.gateway.route.RouteLocator;
import org.springframework.cloud.gateway.route.builder.RouteLocatorBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.web.server.ServerHttpSecurity;
import org.springframework.security.web.server.SecurityWebFilterChain;

/**
 * Configuration du Spring Cloud Gateway pour gérer les routes entre différents services.
 * 
 * Cette classe configure les routes du passerelle API, définit les filtres à appliquer à chaque route
 * et gère la sécurité des routes en appliquant un filtre JWT pour valider les tokens d'authentification.
 * 
 * - Elle configure des routes spécifiques pour chaque service (authentification, tâches, projets, messages).
 * - Elle applique un filtre d'authentification JWT sur les routes qui nécessitent un accès sécurisé.
 * - Elle gère les règles de sécurité au niveau des routes, en permettant l'accès libre à certaines API comme 
 *   l'inscription, la connexion, tout en sécurisant les autres routes.
 * 
 * Cette configuration permet d'assurer que seules les requêtes avec un token JWT valide pourront accéder 
 * aux ressources protégées tout en permettant l'accès libre à certaines routes publiques.
 * 
 * @author Jules Courné
 * @version 1.0
 */
@Configuration
public class GatewayConfig {

    /**
     * Filtre d'authentification JWT utilisé pour valider les tokens JWT dans les requêtes entrantes.
     * Ce filtre appliqué à toutes les requêtes HTTP afin de valider l'authenticité 
     * du token d'accès et d'en extraire les informations de l'utilisateur avant de poursuivre le traitement.
     * 
     * Ce filtre est crucial pour la sécurisation des API en garantissant que seules les requêtes 
     * contenant un token JWT valide et correctement signé sont autorisées à accéder aux ressources protégées.
     */
    private final JwtAuthenticationFilter jwtAuthenticationFilter;

    /**
     * Constructeur de la classe GatewayConfig.
     * 
     * @param jwtAuthenticationFilter Le filtre d'authentification JWT à appliquer sur certaines routes.
     */
    public GatewayConfig(JwtAuthenticationFilter jwtAuthenticationFilter) {
        this.jwtAuthenticationFilter = jwtAuthenticationFilter;
    }

    /**
     * Définit les routes personnalisées pour le Spring Cloud Gateway.
     *
     * @param builder Le constructeur de routes pour Spring Cloud Gateway.
     * @return Un objet RouteLocator qui définit les différentes routes et leurs filtres.
     */
    @Bean
    public RouteLocator customRouteLocator(RouteLocatorBuilder builder) {
        return builder.routes()
                // Exclude signup from JWT authentication filter
                .route("signup_route", r -> r.path("/api/auth/signup").uri("http://auth-service:8081"))
                .route("login_route", r -> r.path("/api/auth/login").uri("http://auth-service:8081"))
                
                .route("users_route", r -> r.path("/api/auth/users")
                        .filters(f -> f.filter(jwtAuthenticationFilter.apply(new JwtAuthenticationFilter.Config())))
                        .uri("http://auth-service:8081"))

                .route("task_route", r -> r.path("/api/tasks/**")
                        .filters(f -> f.filter(jwtAuthenticationFilter.apply(new JwtAuthenticationFilter.Config())))
                        .uri("http://task-service:8082"))

                .route("project_route", r -> r.path("/api/projects/**")
                        .filters(f -> f.filter(jwtAuthenticationFilter.apply(new JwtAuthenticationFilter.Config())))
                        .uri("http://project-service:8083"))
                
                .route("project_event_route", r -> r.path("/api/projects/events")
                        .filters(f -> f.filter(jwtAuthenticationFilter.apply(new JwtAuthenticationFilter.Config())))
                        .uri("http://project-service:8083")) 

                .route("task_event_route", r -> r.path("/api/tasks/events")
                        .filters(f -> f.filter(jwtAuthenticationFilter.apply(new JwtAuthenticationFilter.Config())))
                        .uri("http://task-service:8082")) 
                
                .route("message_route", r -> r.path("/api/messages/**")
                        .filters(f -> f.filter(jwtAuthenticationFilter.apply(new JwtAuthenticationFilter.Config())))
                        .uri("http://message-service:8084")) 
                
                .route("message_event_route", r -> r.path("/api/messages/stream/**")
                        .filters(f -> f.filter(jwtAuthenticationFilter.apply(new JwtAuthenticationFilter.Config())))
                        .uri("http://message-service:8084"))

                .build();
    }

    /**
     * Définit la chaîne de filtres de sécurité pour les demandes HTTP.
     *
     * @param http Le composant ServerHttpSecurity pour configurer les règles de sécurité des requêtes HTTP.
     * @return Un objet SecurityWebFilterChain configuré pour l'application.
     * @throws Exception Si une erreur se produit lors de la configuration de la sécurité.
     */
    @Bean
    SecurityWebFilterChain springSecurityFilterChain(ServerHttpSecurity http) {
        return http
                .csrf(csrf -> csrf.disable()) 
                .authorizeExchange(exchanges -> exchanges
                    .pathMatchers("/api/auth/signup", "/api/auth/login", "/api/auth/users").permitAll()
                    .pathMatchers("/api/projects/events").permitAll()
                    .pathMatchers("/api/tasks/events").permitAll()
                    .pathMatchers("/api/tasks/**").permitAll()
                    .pathMatchers("/api/projects/**").permitAll()
                    .pathMatchers("/api/messages/**").permitAll()
                    .pathMatchers("/api/messages/stream/**").permitAll()
                    .anyExchange().authenticated()
                )
                .build();
    }
}
