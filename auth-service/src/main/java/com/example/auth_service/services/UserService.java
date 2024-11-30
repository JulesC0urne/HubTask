package com.example.auth_service.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

import org.springframework.stereotype.Service;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import com.example.auth_service.repository.UserRepository;
import com.example.auth_service.entities.User;
import com.example.auth_service.exceptions.InvalidJwtException;

import java.util.List;

@Service
public class UserService implements UserDetailsService {

    @Autowired
    private UserRepository userRepository; // Injecte le repository pour interagir avec la base de données des utilisateurs

    /**
     * Méthode pour inscrire un nouvel utilisateur.
     * 
     * Vérifie d'abord si l'utilisateur existe déjà dans la base de données (via son nom d'utilisateur).
     * Si l'utilisateur n'existe pas, son mot de passe est crypté et l'utilisateur est enregistré dans la base de données.
     * 
     * @param user L'objet User contenant les informations de l'utilisateur à inscrire.
     * @return Un objet UserDetails représentant l'utilisateur créé.
     * @throws InvalidJwtException Si l'utilisateur existe déjà dans la base de données.
     */
    public UserDetails signUp(User user) throws InvalidJwtException {
        System.out.println("Méthode signUp appelée avec l'utilisateur : " + user);
        if (userRepository.findByUsername(user.getUsername()) != null) {
            throw new InvalidJwtException("Email already exists");
        }
        String encryptedPassword = new BCryptPasswordEncoder().encode(user.getPassword());

        System.out.println("Encrypter " + encryptedPassword);
        User newUser = new User(user.getUsername(), encryptedPassword);
        return userRepository.save(newUser);
    }

    /**
     * Méthode permettant de charger un utilisateur en fonction de son nom d'utilisateur.
     * Cette méthode est utilisée par Spring Security pour récupérer les détails de l'utilisateur pendant l'authentification.
     * 
     * @param username Le nom d'utilisateur (ou email) de l'utilisateur à charger.
     * @return Un objet UserDetails représentant l'utilisateur chargé.
     * @throws UsernameNotFoundException Si l'utilisateur n'est pas trouvé.
     */
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        var user = userRepository.findByUsername(username);
        return user;
    }

    /**
     * Méthode pour récupérer tous les utilisateurs dans la base de données.
     * 
     * @return Une liste d'objets User représentant tous les utilisateurs.
     */
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }
}
