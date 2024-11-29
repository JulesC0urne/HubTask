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

@Component
public class JwtAuthenticationFilter extends AbstractGatewayFilterFactory<JwtAuthenticationFilter.Config> {

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
    
    public static class Config {
        
    }
}
