package gateway.filters;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.auth0.jwt.exceptions.JWTVerificationException;
import org.springframework.cloud.gateway.filter.GatewayFilter;
import org.springframework.cloud.gateway.filter.factory.AbstractGatewayFilterFactory;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ServerWebExchange;
import reactor.core.publisher.Mono;

/**
 * Composant de sécurité dans l'architecture de passerelle (Gateway) utilisé pour intercepter
 * les requêtes HTTP entrantes afin de valider la présence et la validité d'un token JWT 
 * dans l'en-tête d'autorisation ("Authorization header").
 * 
 * Ce filtre vérifie chaque requête pour s'assurer que le token JWT est valide et signé correctement. 
 * Si le token est valide, il permet à la requête de continuer son chemin vers le service de backend.
 * Si le token est invalide ou manquant, une erreur HTTP 401 (Non autorisé) est renvoyée.
 * 
 * Ce filtre est appliqué à travers le Spring Cloud Gateway, permettant ainsi une sécurisation des routes
 * en amont, avant même qu'elles n'atteignent les services backend.
 * 
 * Ce filtre est utilisé pour la gestion des requêtes d'authentification et la gestion de la sécurité dans
 * une architecture de microservices, où la passerelle agit comme point d'entrée unique pour les requêtes.
 * 
 * @author Jules Courné
 * @version 1.0
 */
@Component
public class JwtAuthenticationFilter extends AbstractGatewayFilterFactory<JwtAuthenticationFilter.Config> {

    /**
     * Constructeur par défaut du filtre.
     * 
     * Utilise la classe Config comme modèle de configuration pour ce filtre.
     */
    public JwtAuthenticationFilter() {
        super(Config.class); 
    }

    /**
     * Applique le filtre d'authentification JWT sur la requête.
     * Ce filtre vérifie que l'en-tête d'autorisation contient un token JWT valide.
     *
     * @param config La configuration à appliquer (peut être utilisée pour ajouter des propriétés supplémentaires si nécessaire).
     * @return Un GatewayFilter qui exécute la vérification du token JWT sur la requête.
     */
    @Override
    public GatewayFilter apply(Config config) {
        return (exchange, chain) -> {
            String authHeader = exchange.getRequest().getHeaders().getFirst(HttpHeaders.AUTHORIZATION);
            System.out.println("Incoming request to: " + exchange.getRequest().getURI());
            System.out.println("Authorization header: " + authHeader);

            if (authHeader == null || !authHeader.startsWith("Bearer ")) {
                return onError(exchange, "Authorization header not found", HttpStatus.UNAUTHORIZED);
            }

            String token = authHeader.substring(7);
            try {
                Algorithm algorithm = Algorithm.HMAC256("mykey"); // Replace with your secret key
                DecodedJWT jwt = JWT.require(algorithm).build().verify(token);
                // Log the details of the JWT
                System.out.println("Token verified successfully. Subject: " + jwt.getSubject());
                System.out.println("Token expiration: " + jwt.getExpiresAt());
                
                // Ajouter des informations de l'utilisateur aux attributs de la requête si nécessaire
                exchange.getRequest().mutate().header("userId", jwt.getSubject()).build();
                return chain.filter(exchange);
            } catch (JWTVerificationException exception) {
                System.out.println("JWT verification failed: " + exception.getMessage());
                return onError(exchange, "Invalid JWT token", HttpStatus.UNAUTHORIZED);
            }
        };
    }

    /**
     * Retourne le nom du filtre.
     *
     * @return Le nom du filtre.
     */
    @Override
    public String name() {
        return "JwtAuthenticationFilter";
    }

    /**
     * Gère les erreurs liées à la vérification du JWT, en renvoyant une réponse d'erreur.
     *
     * @param exchange L'échange de la requête.
     * @param error Le message d'erreur à inclure dans la réponse.
     * @param httpStatus Le code HTTP à renvoyer dans la réponse.
     * @return Mono<Void> indique que la réponse a été complétée.
     */
    private Mono<Void> onError(ServerWebExchange exchange, String error, HttpStatus httpStatus) {
        exchange.getResponse().setStatusCode(httpStatus);
        return exchange.getResponse().setComplete();
    }
    
    /**
     * Classe de configuration de JwtAuthenticationFilter par default
     */
    public static class Config {
        
    }
}
