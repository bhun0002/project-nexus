# Project Nexus

Project Nexus is a full-stack web application designed to manage and submit software development projects for evaluation and collaboration. This repository contains the **frontend**, **backend**, and **database** modules.

## 📌 Table of Contents

- [Project Overview](#project-overview)
- [Tech Stack](#tech-stack)
- [Folder Structure](#folder-structure)
- [Installation](#installation)
- [Backend Setup](#backend-setup)
- [Frontend Setup](#frontend-setup)
- [Database Setup](#database-setup)
- [API Endpoints](#api-endpoints)
- [Environment Variables](#environment-variables)
- [Features](#features)
- [License](#license)

---

## 📌 Project Overview

Project Nexus allows users to submit projects with details like client name, email, company, project description, and more. The system supports **CRUD operations**, including soft delete functionality, where deleted projects are hidden but retained in the database.

---

## 📌 Tech Stack

- **Frontend:** React.js, React Router, Material UI
- **Backend:** Node.js, Express.js, Mongoose
- **Database:** MongoDB
- **State Management:** useState, useEffect
- **API Communication:** Fetch API, Axios

---

## 📌 Folder Structure

```
Project-Nexus/
│── backend/              # Backend code (Express.js, Node.js, MongoDB)
│   ├── src/
│   │   ├── controllers/  # API Controllers
│   │   ├── models/       # Mongoose Models
│   │   ├── routes/       # API Routes
│   │   ├── database/     # MongoDB Connection
│   │   ├── server.js     # Main server entry point
│   ├── .env              # Environment variables
│   ├── package.json      # Dependencies and scripts
│── frontend/             # Frontend code (React.js)
│   ├── src/
│   │   ├── components/   # UI Components
│   │   │   ├── ClientInputForm.js
│   │   │   ├── ProjectList.js
│   │   │   ├── Navbar.js
│   │   │   ├── Footer.js
│   │   ├── pages/        # Page-level components
│   │   ├── api.js        # API interaction
│   │   ├── App.js        # Main React app
│   │   ├── index.js      # Entry file
│   ├── .env              # Environment variables
│   ├── package.json      # Dependencies and scripts
│── database/             # Database scripts (if any)
│── .gitignore            # Ignore files
│── README.md             # Project documentation
```

---

## 📌 Installation

### Clone the Repository
```sh
git clone https://github.com/your-repo/project-nexus.git
cd project-nexus
```

### Install Dependencies
For **Backend**:
```sh
cd backend
npm install
```

For **Frontend**:
```sh
cd frontend
npm install
```

---

## 📌 Backend Setup

1. Navigate to the backend directory:
   ```sh
   cd backend
   ```

2. Create a `.env` file and set the environment variables:
   ```
   MONGO_URI=mongodb://127.0.0.1:27017/project-nexus
   PORT=5000
   ```

3. Start the backend server:
   ```sh
   npm run dev
   ```

---

## 📌 Frontend Setup

1. Navigate to the frontend directory:
   ```sh
   cd frontend
   ```

2. Create a `.env` file and set the environment variables:
   ```
   REACT_APP_API_BASE_URL=http://localhost:5000/api
   ```

3. Start the frontend:
   ```sh
   npm start
   ```

---

## 📌 Database Setup

- Ensure MongoDB is running locally or use a cloud-based MongoDB instance.
- Connect using the `MONGO_URI` in the `.env` file.

To check data in MongoDB:
```sh
mongosh
use project-nexus
db.projects.find().pretty()
```

---

## 📌 API Endpoints

### Project Management

| Method | Endpoint | Description |
|--------|---------|-------------|
| `GET` | `/api/projects` | Fetch all active projects |
| `POST` | `/api/projects` | Create a new project |
| `GET` | `/api/projects/:id` | Get a single project by ID |
| `PUT` | `/api/projects/:id` | Update an existing project |
| `DELETE` | `/api/projects/:id` | Soft delete a project (`isDeleted: true`) |

---

## 📌 Environment Variables

Backend (`backend/.env`):
```
MONGO_URI=mongodb://127.0.0.1:27017/project-nexus
PORT=5000
```

Frontend (`frontend/.env`):
```
REACT_APP_API_BASE_URL=http://localhost:5000/api
```

---

## 📌 Features

✔️ Submit projects with complete details  
✔️ Fetch and display projects dynamically  
✔️ Soft delete functionality (`isDeleted: true`)  
✔️ Update project details  
✔️ API-based communication between frontend and backend  

---

## 📌 License

This project is licensed under the MIT License. Feel free to use and modify it.

---

This README provides a complete overview of **Project Nexus** and guides contributors and users on setting up and running the project. 🚀
