# Projet de gestion de tâches.

**Description**: Cette application est une solution full-stack permettant de gérer des utilisateurs, des projets, des tâches. Un système de messagerie pour chaque projet est mis en place permettant à tous les acteurs d'un projet de communiquer. Toutes les actions sont mis à jour en temps réel.

L'application utilise React pour le frontend, Spring Boot pour le backend, PostgreSQL comme base de données, Spring cloud gateway pour le gateway, et Docker pour la conteneurisation.

## Table des matières

- [Prérequis](#prérequis)
- [Versions](#versions)
- [Installation](#installation)
  - [Docker](#docker)
- [Documentation Backend](#documentation)
- [Utilisation](#utilisation)
- [Architecture](#architecture)

## Prérequis

Avant de commencer, assurez-vous d'avoir installé les outils suivants :

1. **Docker** : Suivez les instructions officielles pour installer Docker sur votre système :
   - [Installation Docker - Linux](https://docs.docker.com/engine/install/)
   - [Installation Docker - MacOS](https://docs.docker.com/desktop/install/mac-install/)
   - [Installation Docker - Windows](https://docs.docker.com/desktop/install/windows-install/)

2. **Docker Compose** : Docker Compose est généralement inclus avec Docker Desktop. Pour vérifier si Docker Compose est installé, vous pouvez exécuter la commande suivante :
   
   ```bash
   docker-compose --version


## Versions

Ce projet utilise les versions suivantes :  

- **React** : 18.3.1  
- **Spring Boot** : 3.3.*  
- **PostgreSQL** : 17
- **Docker** : 27.2.0
- **Docker Compose** : 2.29.2
- **Spring Cloud Gateway** : 2023.0.2
- **Java** : 17
- **Node.js** : 20.18.0


## Installation

git clone https://github.com/JulesC0urne/HubTask.git  
cd HubTask  

docker compose up --build -d  

## Utilisation

-  Se rendre sur l'url http://localhost:3000  

-  Enregistrer un utilisateur sur la page d'inscription puis se connecter  

-  Créez et gérez vos projets, tâches et discutez avec vos collaborateurs.  

## Documentation Backend

Vous pouvez accéder à la documentation complète du backend de ce projet en cliquant sur le lien ci-dessous :

[Voir la documentation Javadoc](./backend/docs/auth-service/index.html)


## Architecture

HubTask/  
│  
├── backend/                       <!-- Contient tous les services backend (microservices et API Gateway) -->  
│     ├── auth-service/            <!-- Service gérant l'authentification des utilisateurs -->  
│     │   ├── src/                 <!-- Code principal du service -->  
│     │   ├── pom.xml              <!-- Gestion des dépendances Java -->  
│     │   └── Dockerfile           <!-- Configuration pour la création du conteneur Docker -->  
│     │  
│     ├── project-service/         <!-- Service gérant les projets -->  
│     │   ├── src/                 <!-- Code principal pour la gestion des projets -->  
│     │   ├── pom.xml              <!-- Dépendances Java pour la gestion des projets -->  
│     │   └── Dockerfile           <!-- Fichier de configuration Docker -->  
│     │  
│     ├── task-service/            <!-- Service responsable des tâches -->  
│     │   ├── src/                 <!-- Code du service pour gérer les tâches -->  
│     │   ├── pom.xml              <!-- Dépendances Java pour gérer les tâches -->  
│     │   └── Dockerfile           <!-- Fichier Docker pour ce service -->  
│     │  
│     ├── gateway/                 <!-- Service de passerelle pour gérer les requêtes entrantes -->  
│     │   ├── src/                 <!-- Code source pour la gestion des requêtes vers les microservices -->  
│     │   ├── pom.xml              <!-- Dépendances de la passerelle API -->  
│     │   └── Dockerfile           <!-- Fichier Docker pour le gateway -->  
│     │  
│     ├── message-service/         <!-- Service pour gérer les messages entre utilisateurs -->  
│     │   ├── src/                 <!-- Code principal du service des messages -->  
│     │   ├── pom.xml              <!-- Dépendances de gestion des messages -->  
│     │   └── Dockerfile           <!-- Configuration Docker pour ce service -->  
│     │  
│     ├── doc/                     <!-- Documentation du backend -->  
│     │   ├── auth-service/        <!-- Documentation spécifique pour le service auth -->  
│     │   ├── project-service/     <!-- Documentation spécifique pour le service projet -->  
│     │   ├── task-service/        <!-- Documentation spécifique pour le service task -->  
│     │   ├── message-service/     <!-- Documentation spécifique pour le service message -->  
│     │   └── gateway/             <!-- Documentation spécifique pour le gateway -->  
│  
├── frontend/                      <!-- Interface utilisateur construite en React -->  
│     ├── src/                     <!-- Code frontend de l'application React -->  
│     │   ├── components/          <!-- Composants de l'application React -->  
│     │   ├── context/             <!-- Contexts pour gérer les données de l'application React -->  
│     │   ├── screens/             <!-- Pages de l'application React -->  
│     │   ├── services/            <!-- Services de l'application React -->  
│     │   ├── utils/               <!-- Méthodes et classes utilitaire de l'application React -->  
│     ├── package.json             <!-- Dépendances et commandes pour l'application React -->  
│     └── Dockerfile               <!-- Fichier Docker pour la création du conteneur frontend -->  
│  
├── db-init/                     <!-- Scripts pour créer et initialiser les bases de données -->  
│     ├── auth-db-init.sql         <!-- Script pour configurer la base de données d'authentification -->  
│     ├── project-db-init.sql      <!-- Script pour configurer la base des projets -->  
│     ├── task-db-init.sql         <!-- Script pour configurer la base des tâches -->  
│     └── message-db-init.sql      <!-- Script pour la base des messages -->  
│  
├── docker-compose.yml           <!-- Configuration des conteneurs Docker pour tous les services -->  
└── README.md                    <!-- Description générale et détails du projet -->
