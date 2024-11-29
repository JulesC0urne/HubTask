package com.example.auth_service.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Sinks;
import org.springframework.http.MediaType;

import com.example.auth_service.configs.TokenProvider;
import com.example.auth_service.entities.User;
import com.example.auth_service.services.UserService;

import jakarta.servlet.http.HttpServletResponse;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
public class UserController {

    @Autowired
    private AuthenticationManager authenticationManager;  // Pour gérer l'authentification

    @Autowired
    private TokenProvider jwtUtil; // Pour générer et valider les tokens JWT

    private UserService userService; // Service pour gérer la logique des utilisateurs
    
    private final Sinks.Many<Map<String, Object>> userSink; // Flux d'événements en temps réel via WebFlux

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
        this.userSink = Sinks.many().multicast().onBackpressureBuffer();
    }

    /**
     * Endpoint pour recevoir des événements en temps réel concernant les utilisateurs.
     * Utilise le flux Sinks pour envoyer des événements via WebFlux.
     * 
     * @return Flux de Map contenant les événements utilisateurs.
     */
    @GetMapping(value = "/events", produces = MediaType.TEXT_EVENT_STREAM_VALUE)
    public Flux<Map<String, Object>> getProjectUpdates() {
        return userSink.asFlux();
    }

    /**
     * Endpoint pour l'authentification d'un utilisateur (login).
     * L'utilisateur envoie son nom d'utilisateur et son mot de passe, et si l'authentification réussit,
     * un token JWT est généré et retourné.
     * 
     * @param data L'objet User contenant les informations d'identification (username, password).
     * @param response L'objet HttpServletResponse, utilisé pour répondre à la requête.
     * @return ResponseEntity contenant le token d'accès JWT ou un message d'erreur.
     */
    @PostMapping("/login")
    public ResponseEntity<String> signIn(@RequestBody @Validated User data, HttpServletResponse response) {
        var userPassword = new UsernamePasswordAuthenticationToken(data.getUsername(), data.getPassword());
        var authUser = authenticationManager.authenticate(userPassword);
        var accessToken = jwtUtil.generateAccessToken((User) authUser.getPrincipal());
        System.out.println("Access Token : " + accessToken);
        userSink.tryEmitNext(Map.of("type", "USER_LOGGED_IN", "username", data.getUsername()));
        return ResponseEntity.ok(accessToken);
    }

    /**
     * Endpoint pour inscrire un nouvel utilisateur.
     * L'utilisateur envoie ses informations, et si les informations sont valides,
     * l'utilisateur est créé et un événement est émis via le flux.
     * 
     * @param user L'objet User contenant les informations de l'utilisateur à inscrire.
     * @return ResponseEntity contenant un message de succès ou d'erreur.
     */
    @PostMapping("/signup")
    public ResponseEntity<String> signup(@RequestBody User user) {
        if (user == null || user.getUsername() == null || user.getPassword() == null) {
            return ResponseEntity.badRequest().body("Missing required fields: username and password");
        }

        try {
            userService.signUp(user);
            userSink.tryEmitNext(Map.of("type", "USER_CREATED", "user", user));
            return ResponseEntity.ok("User created successfully");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

    /**
     * Endpoint pour récupérer la liste de tous les utilisateurs enregistrés.
     * 
     * @return ResponseEntity contenant la liste des utilisateurs.
     */
    @GetMapping("/users")
    public ResponseEntity<List<User>> getAllUsers() {
        List<User> users = userService.getAllUsers();
        return ResponseEntity.ok(users);
    }
}
