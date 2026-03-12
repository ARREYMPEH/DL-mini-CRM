# Mini-CRM for Digital Agency

A complete mini-CRM web app to manage prospects and track message history.

## Prerequisites
- Node.js installed

## Database Setup
The project now uses **SQLite**. The database is automatically created and initialized when you start the backend server for the first time. No manual database setup (like XAMPP or MySQL) is required.

## Installation & Running Backend
1. Install dependencies:
   ```bash
   npm install
   ```
2. Start the server:
   ```bash
   node backend/src/server.js
   ```
   *Note: If you are on Windows and encounter execution policy errors with `npm start`, use `node` directly as shown above.*

   The backend will be running at `http://localhost:5000` and the database will be stored in `database.sqlite` in the project root.

## Running Frontend
Open `frontend/index.html` in your browser.

## Architecture du système
L'application suit une architecture en trois couches.

Frontend :
Construit avec HTML, CSS et JavaScript Vanilla.

Backend :
Développé avec Node.js et Express.js.

Base de données :
**SQLite** est utilisé pour stocker les informations, offrant une solution légère et sans configuration.

## Guide d'installation
Étapes :
1. Cloner le dépôt
2. Installer les dépendances avec `npm install`
3. Démarrer le serveur backend avec `node backend/src/server.js`
4. Ouvrir le frontend dans votre navigateur

