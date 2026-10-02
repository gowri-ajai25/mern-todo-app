# MERN Stack To-Do List

A full-stack To-Do List web application built with the MERN stack
(MongoDB, Express.js, React, Node.js). A user can add tasks, mark them
complete/incomplete, and delete them. All changes are saved in MongoDB.

## Tech Stack
- **Database:** MongoDB Atlas with Mongoose
- **Backend:** Node.js, Express.js
- **Frontend:** React (Vite), Axios

## Project Structure
```
todo-app/
├── backend/
│   ├── models/Task.js
│   ├── server.js
│   └── package.json
├── frontend/
│   ├── src/
│   └── package.json
├── screenshots/
└── README.md
```

## Prerequisites
- Node.js (LTS version)
- A MongoDB Atlas cluster (or a local MongoDB installation)

## How to Run

### 1. Backend
```
cd backend
npm install
```
Create a `.env` file inside the `backend` folder:
```
MONGO_URI=<your MongoDB connection string>
PORT=5000
```
Example connection string format:
`mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/todoapp`

Start the server:
```
npm run dev
```
The backend runs at http://localhost:5000 and prints "MongoDB connected".

### 2. Frontend
Open a second terminal:
```
cd frontend
npm install
npm run dev
```
Open the URL shown in the terminal (http://localhost:5173).

## API Endpoints
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/tasks | Fetch all tasks |
| POST | /api/tasks | Add a new task |
| PUT | /api/tasks/:id | Update a task (mark complete/incomplete or edit title) |
| DELETE | /api/tasks/:id | Delete a task |

## Task Schema
| Field | Type | Details |
|-------|------|---------|
| title | String | Required |
| completed | Boolean | Default: false |
| createdAt | Date | Default: now |
