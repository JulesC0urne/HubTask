package com.example.auth_service.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.security.core.AuthenticationException;
import org.springframework.web.bind.annotation.ResponseStatus;

/**
 * Exception personnalisée pour indiquer que le token JWT est invalide.
 * Cette exception est lancée lorsqu'un JWT ne peut pas être validé pendant le processus d'authentification.
 * Elle est annotée avec `@ResponseStatus(HttpStatus.FORBIDDEN)` pour retourner automatiquement un code 
 * HTTP 403 (Interdit) en réponse HTTP lorsque cette exception est levée.
 */
@ResponseStatus(HttpStatus.FORBIDDEN)
public class InvalidJwtException extends AuthenticationException {

    /**
     * Constructeur de l'exception InvalidJwtException.
     * @param ex Le message d'erreur expliquant pourquoi le token JWT est invalide.
     */
    public InvalidJwtException(String ex){
        super(ex);
    }
}
