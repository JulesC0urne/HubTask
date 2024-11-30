package com.example.auth_service.configs;

import com.example.auth_service.entities.User;
import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTCreationException;
import com.auth0.jwt.exceptions.JWTVerificationException;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneOffset;

@Service
public class TokenProvider {

    // Clé secrète utilisée pour signer le JWT (à ne pas exposer en production)
    private String JWT_SECRET = "mykey";

    /**
     * Génère un token d'accès JWT pour un utilisateur.
     * Ce token contient des informations sur l'utilisateur, comme son nom d'utilisateur et son rôle.
     * 
     * @param user L'utilisateur pour lequel générer le token.
     * @return Un token JWT signé avec la clé secrète.
     * @throws JWTCreationException Si une erreur survient lors de la création du token.
     */
    public String generateAccessToken(User user) {
        try {
            Algorithm algorithm = Algorithm.HMAC256(JWT_SECRET);
            return JWT.create()
                    .withSubject(user.getUsername())
                    .withClaim("username", user.getUsername())
                    .withClaim("role", user.getRole().name())
                    .withExpiresAt(genAccessExpirationDate())
                    .sign(algorithm);
        } catch (JWTCreationException exception) {
            throw new JWTCreationException("Error while generating token", exception);
        }
    }

    /**
     * Valide un token JWT et extrait le sujet (nom d'utilisateur) du token.
     * 
     * @param token Le token JWT à valider.
     * @return Le nom d'utilisateur (sujet) extrait du token.
     * @throws JWTVerificationException Si le token est invalide ou si l'authentification échoue.
     */
    public String validateToken(String token) {
        try {
            Algorithm algorithm = Algorithm.HMAC256(JWT_SECRET);
            return JWT.require(algorithm)
                    .build()
                    .verify(token)
                    .getSubject();
        } catch (JWTVerificationException exception) {
            throw new JWTVerificationException("Error while validating token", exception);
        }
    }

    /**
     * Génère la date d'expiration du token d'accès (2 heures à partir du moment actuel).
     * 
     * @return L'instant représentant la date et l'heure d'expiration du token.
     */
    private Instant genAccessExpirationDate() {
        return LocalDateTime.now().plusHours(2).toInstant(ZoneOffset.of("-03:00"));
    }
}