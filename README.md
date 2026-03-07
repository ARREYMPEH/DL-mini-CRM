# Mini-CRM for Digital Agency

A complete mini-CRM web app to manage prospects and track message history.

## Prerequisites
- Node.js installed
- MySQL installed and running

## MySQL Setup
1. Create a database named `mini_crm`:
   ```sql
   CREATE DATABASE mini_crm;
   ```
2. Run the schema script to create tables:
   ```bash
   mysql -u root -p mini_crm < backend/src/db/schema.sql
   ```
   *(Note: If you don't have a password for root, omit `-p`)*

## Installation & Running Backend
1. Install dependencies:
   ```bash
   npm install
   ```
2. Configure `.env`:
   - Copy `.env.example` to `.env`
   - Update `DB_USER` and `DB_PASSWORD` if necessary.
3. Start the server:
   ```bash
   npm start
   ```
   The backend will be running at `http://localhost:5000`.

## Running Frontend
Open `frontend/index.html` in your browser (e.g., using VS Code Live Server).

## API Endpoints
- `GET /prospects`: List all prospects
- `POST /prospects`: Create a prospect
- `GET /prospects/:id`: Get prospect details
- `PUT /prospects/:id`: Update a prospect
- `DELETE /prospects/:id`: Delete a prospect
- `GET /prospects/:id/messages`: List messages for a prospect
- `POST /prospects/:id/messages`: Add a message to a prospect
- `DELETE /messages/:id`: Delete a message

## CRUD Test Checklist
- [ ] Create a prospect (validate name/contact required)
- [ ] Read prospect list and details
- [ ] Update prospect status/source
- [ ] Add inbound/outbound messages
- [ ] Delete a message
- [ ] Delete a prospect (verify messages are also deleted)



DL Prospect Tracker – Mini CRM
Aperçu du projet
DL Prospect Tracker est une application web mini CRM (Customer Relationship Management) conçue pour centraliser et gérer les prospects provenant de plusieurs canaux de communication tels que WhatsApp, Facebook, Instagram et les formulaires de site web.

L'objectif de l'application est d'aider les agences digitales à organiser les informations des prospects, suivre l'historique des communications et gérer efficacement le pipeline de vente.

Ce projet a été développé dans le cadre d'un Test Technique – Développeur Stagiaire Niveau 2.
Fonctionnalités
Gestion des prospects
- Ajouter de nouveaux prospects
- Modifier les informations d'un prospect
- Supprimer des prospects
- Suivre le statut de chaque prospect

Les informations d'un prospect comprennent :
- Nom
- Entreprise
- Téléphone
- Email
- Source (WhatsApp, Facebook, Instagram, Site web)
- Statut (Nouveau, Contacté, En discussion, Converti, Perdu)
- Notes
Historique des messages
Chaque prospect possède une timeline d'historique des messages permettant de :

- Enregistrer les messages entrants ou sortants
- Suivre la communication avec le prospect
- Supprimer un message si nécessaire

Chaque message contient :
- Canal (WhatsApp, Facebook, Instagram, etc.)
- Direction (Entrant / Sortant)
- Contenu du message
- Date et heure
Architecture du système
L'application suit une architecture en trois couches.

Frontend → API Backend → Base de données

Frontend :
Construit avec HTML, CSS et JavaScript Vanilla pour l'interface utilisateur et les interactions.

Backend :
Développé avec Node.js et Express.js pour fournir une API REST permettant de gérer les prospects et les messages.

Base de données :
MySQL est utilisé pour stocker les informations des prospects et l'historique des communications.
Structure de la base de données
Table Prospects
- id
- name
- company
- phone
- email
- source
- status
- created_at
- notes

Table Messages
- id
- prospect_id
- channel
- direction
- content
- created_at
Endpoints de l'API
Prospects
GET /prospects – récupérer tous les prospects
POST /prospects – créer un prospect
GET /prospects/:id – récupérer un prospect
PUT /prospects/:id – modifier un prospect
DELETE /prospects/:id – supprimer un prospect

Messages
GET /prospects/:id/messages – récupérer l'historique des messages
POST /prospects/:id/messages – ajouter un message
DELETE /messages/:id – supprimer un message
Guide d'installation
Prérequis :
- Node.js
- MySQL
- npm

Étapes :
1. Cloner le dépôt GitHub
2. Installer les dépendances backend avec npm install
3. Configurer les variables d'environnement dans un fichier .env
4. Créer la base de données MySQL
5. Exécuter schema.sql pour créer les tables
6. Démarrer le serveur backend
7. Ouvrir le frontend avec Live Server ou directement dans le navigateur

