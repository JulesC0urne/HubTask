package gateway.configs;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.reactive.CorsConfigurationSource;
import org.springframework.web.cors.reactive.CorsWebFilter;
import org.springframework.web.cors.reactive.UrlBasedCorsConfigurationSource;

import java.util.List;

@Configuration
public class WebConfig {

    /**
     * Crée un bean de type CorsWebFilter, qui applique les configurations CORS sur les requêtes entrantes.
     * Ce filtre est responsable de gérer les requêtes CORS avant qu'elles n'atteignent les autres filtres.
     *
     * @return Un objet CorsWebFilter, permettant de filtrer les requêtes CORS.
     */

    @Bean
    public CorsWebFilter corsWebFilter() {
        return new CorsWebFilter(corsConfigurationSource());
    }

    /**
     * Crée un bean de type CorsConfigurationSource, qui définit la configuration CORS appliquée à l'application.
     * Cette méthode permet de configurer les origines, les méthodes HTTP, les en-têtes autorisés, et d'autres options CORS.
     *
     * @return Un objet CorsConfigurationSource, contenant la configuration CORS pour l'application.
     */
    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration config = new CorsConfiguration();
        
        config.setAllowedOrigins(List.of("http://localhost:3000", "http://10.2.128.84:3000/")); // Adjust to frontend origin      
        config.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS"));      
        config.setAllowedHeaders(List.of("*"));
        config.setAllowCredentials(true);
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", config);

        return source; 
    }
}
