# Utiliser l'image de base Node.js
FROM node:18 AS build

# Définir le répertoire de travail
WORKDIR /app

# Copier votre certificat CA
COPY SOLUTEC-RootCA_base64.crt /usr/local/share/ca-certificates/

# Mettre à jour les certificats CA
RUN apt-get update && apt-get install -y ca-certificates && update-ca-certificates


# Configurer npm pour utiliser le certificat CA
RUN npm config set cafile /usr/local/share/ca-certificates/SOLUTEC-RootCA_base64.crt

RUN npm config set strict-ssl false

# Copier les fichiers de package
COPY package*.json ./

# Nettoyer le cache npm et installer les dépendances
RUN npm cache clean --force && npm install --max-old-space-size=4096

# Copier le reste des fichiers de l'application
COPY . .

# Construire l'application pour la production
RUN npm run build

# Utiliser Nginx pour servir l'application construite
FROM nginx:alpine

# Copier les fichiers construits depuis l'étape précédente vers le répertoire par défaut de Nginx
COPY --from=build /app/build /usr/share/nginx/html

# Exposer le port sur lequel Nginx écoute
EXPOSE 80

# Commande par défaut pour démarrer Nginx
CMD ["nginx", "-g", "daemon off;"]