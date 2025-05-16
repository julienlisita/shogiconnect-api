# Utilise une image officielle Node.js
FROM node:18

# Crée un dossier pour l'app
WORKDIR /app

# Copie les fichiers de ton projet
COPY . .

# Installe les dépendances
RUN npm install

# Expose le port utilisé par ton app (modifie si différent)
EXPOSE 3000

# Démarre l'app
CMD ["npm", "run", "start"]