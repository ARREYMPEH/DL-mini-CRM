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
