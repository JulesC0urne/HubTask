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

git clone <URL_DE_VOTRE_DEPOT>
cd <NOM_DU_REPERTOIRE>

docker compose up --build -d

## Utilisation

Se rendre sur l'url http://localhost:3000

## Architecture
.
├── auth-service/             # Microservice d'authentification
├── project-service/          # Microservice de gestion des projets
├── task-service/             # Microservice de gestion des tâches
├── message-service/          # Microservice de gestion des messages
├── frontend/                 # Application frontend en React
│   ├── src/                  # Code source de l'application frontend
│   ├── package.json          # Dépendances et scripts du frontend
├── gateway/                  # API Gateway (Spring Cloud Gateway ou autre)
│   ├── src/                  # Code source de l'application Gateway
│   ├── pom.xml               # Dépendances Maven pour le Gateway
│   └── application.properties # Configuration de l'API Gateway
├── db-init/                  # Scripts d'initialisation de la base de données (SQL)
│   └── init.sql              # Script pour initialiser les tables et données de la base
├── docker-compose.yml        # Définition des services Docker (PostgreSQL, backend, frontend, gateway)
└── README.md                 # Documentation du projet

