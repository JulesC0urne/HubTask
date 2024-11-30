# Project Name

**Description**: Cette application est une solution full-stack utilisant React pour le frontend, Spring Boot pour le backend, PostgreSQL comme base de données, un API Gateway pour gérer les services et Docker pour la conteneurisation.

## Table des matières

- [Prérequis](#prérequis)
- [Installation](#installation)
  - [Docker](#docker)
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

## Installation

git clone https://github.com/JulesC0urne/HubTask.git
cd app-task

docker compose up --build -d

## Utilisation

Se rendre sur l'url http://localhost:3000

## Architecture
.
├── auth-service/             # Microservice d'authentification  
│   ├── src/                  # Code source du service d'authentification   
│   ├── pom.xml               # Dépendances Maven pour le service d'authentification  
│   └── Dockerfile	      # Dockerfile du service d'authentification  
├── project-service/          # Microservice de gestion des projets  
│   ├── src/                  # Code source du service de gestion de projets    
│   ├── pom.xml               # Dépendances Maven pour le service de gestion de projets  
│   └── Dockerfile	      # Dockerfile du service de gestion de projets  
├── task-service/             # Microservice de gestion des tâches  
│   ├── src/                  # Code source du service de gestion des tâches    
│   ├── pom.xml               # Dépendances Maven pour le service de gestion des tâches  
│   └── Dockerfile	      # Dockerfile du service de gestion des tâches  
├── gateway/                  # API Gateway (Spring Cloud Gateway)  
│   ├── src/                  # Code source de l'application Gateway  
│   ├── pom.xml               # Dépendances Maven pour le Gateway  
│   └── application.properties # Configuration de l'API Gateway  
├── message-service/          # Microservice de gestion des messages  
│   ├── src/                  # Code source du service de gestion des messages  
│   ├── pom.xml               # Dépendances Maven pour le service de gestion des messages  
│   └── Dockerfile	      # Dockerfile du service de gestion des messages  
├── frontend/                 # Application frontend en React  
│   ├── src/                  # Code source de l'application frontend  
│   └── package.json          # Dépendances et scripts du frontend  
├── db-init/                  # Scripts d'initialisation des base de données  
│   ├── auth-db-init.sql      # Script pour initialiser la base de données d'authentification  
│   ├── project-db-init.sql   # Script pour initialiser la base de données de gestion des projets  
│   ├── task-db-init.sql      # Script pour initialiser la base de données de gestion des tâches  
│   └── message-db-init.sql   # Script pour initialiser la base de données de gestion des messages  
├── docker-compose.yml        # Définition des services Docker (PostgreSQL, backend, frontend, gateway)  
└── README.md                 # Documentation du projet  

