package com.example.project_service;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

/**
 * Classe principale pour démarrer l'application Spring Boot.
 * Cette classe lance l'application Spring Boot en initialisant le contexte de l'application et en démarrant le serveur intégré.
 * Elle sert de point d'entrée pour le service de gestion des des projets.
 * 
 * @author Courné Jules
 * @version 1.0
 */
@SpringBootApplication
public class ProjectServiceApplication {

	/**
     * Méthode principale qui lance l'application Spring Boot.
     * 
     * @param args Les arguments de ligne de commande passés lors du démarrage de l'application.
     *             Généralement utilisés pour la configuration de l'application ou le profil.
     */
	public static void main(String[] args) {
		SpringApplication.run(ProjectServiceApplication.class, args);
	}

}
