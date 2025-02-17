# Project Nexus

Project Nexus is a full-stack web application designed for managing and submitting software development projects for evaluation and collaboration. It features a **React.js frontend**, **Express.js backend**, and a **MongoDB database**. This repository includes the **frontend**, **backend**, and database modules.

## 📌 Table of Contents

- [Project Overview](#project-overview)
- [Tech Stack](#tech-stack)
- [Folder Structure](#folder-structure)
- [Installation](#installation)
- [Backend Setup](#backend-setup)
- [Frontend Setup](#frontend-setup)
- [Database Setup](#database-setup)
- [API Endpoints](#api-endpoints)
- [Authentication](#authentication)
- [Environment Variables](#environment-variables)
- [Features](#features)
- [License](#license)

---

## 📌 Project Overview

Project Nexus allows users to submit projects with details like **client name, email, company, project description, and more**. The system supports **CRUD operations**, including **soft delete functionality**, where deleted projects are hidden but retained in the database.

It also provides **session-based authentication**, allowing users to **sign up, log in, and log out securely**.

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
│── backend/                                 # Backend code (Express.js, Node.js, MongoDB)
│   ├── src/
│   │   ├── controllers/                     # API Controllers
│   │   │   ├── authController.js            # Handles authentication (Login/Signup)
│   │   │   ├── projectController.js         # Handles project operations
│   │   ├── models/                          # Mongoose Models
│   │   │   ├── User.js                      # Schema for user authentication
│   │   │   ├── project.js                   # Schema for project management
│   │   ├── routes/                          # API Routes
│   │   │   ├── authRoutes.js                # Routes for login/signup/logout
│   │   │   ├── projectRoutes.js             # Routes for project management
│   │   ├── database/                        # MongoDB Connection
│   │   ├── middleware/                      # Middleware (Authentication, Authorization)
│   │   ├── server.js                        # Main server entry point
│   ├── .env                                 # Backend environment variables
│   ├── package.json                         # Dependencies and scripts
│── frontend/                                # Frontend code (React.js)
│   ├── src/
│   │   ├── components/                      # UI Components
│   │   │   ├── ClientInputForm.js           # Project submission form
│   │   │   ├── ProjectList.js               # Project list and management
│   │   │   ├── Navbar.js                    # Top navigation bar
│   │   │   ├── Footer.js                    # Footer component
│   │   │   ├── Login.js                     # User login form
│   │   │   ├── Signup.js                    # User signup form
│   │   ├── pages/                           # Page-level components
│   │   ├── api.js                           # API interaction
│   │   ├── App.js                           # Main React app
│   │   ├── index.js                         # Entry file
│   ├── .env                                 # Frontend environment variables
│   ├── package.json                         # Dependencies and scripts
│── database/                                # Database scripts (if any)
│── .gitignore                               # Ignore files 
│── README.md                                # Project documentation
```

---

## 📌 Installation

### Clone the Repository
```sh
git clone https://github.com/bhun0002/project-nexus.git
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
CORS_ORIGIN=http://localhost:3000

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

### 🔹 Authentication
| Method | Endpoint | Description |
|--------|---------|-------------|
| **POST** | `/api/auth/signup` | Register a new user |
| **POST** | `/api/auth/login` | Authenticate a user and start session |

### 🔹 Project Management
| Method | Endpoint | Description |
|--------|---------|-------------|
| **POST** | `/api/projects` | Create a new project |
| **GET** | `/api/projects` | Fetch all projects for the logged-in client |
| **GET** | `/api/projects/:id` | Get a specific project by ID |
| **PUT** | `/api/projects/:id` | Update project details |
| **DELETE** | `/api/projects/:id` | Soft delete a project (`isDeleted: true`) |

---

## 📌 Authentication

Project Nexus uses **session-based authentication**. Users must **log in** to submit and manage projects. Session data is stored securely in the backend.

### **Signup (`POST /api/auth/signup`)**
- Requires `name`, `email`, `password`, `confirmPassword`
- Returns success or failure response.

### **Login (`POST /api/auth/login`)**
- Requires `email`, `password`
- Returns user session data if successful.

### **Logout (`GET /api/auth/logout`)**
- Clears session and logs out user.


## 📌 Environment Variables

Backend (`backend/.env`):
```
MONGO_URI=mongodb://127.0.0.1:27017/project-nexus
PORT=5000
CORS_ORIGIN=http://localhost:3000
```

Frontend (`frontend/.env`):
```
REACT_APP_API_BASE_URL=http://localhost:5000/api
```

---

## 📌 Features

✔️ **User Authentication (Signup, Login, Logout)**  
✔️ **Submit projects with complete details**  
✔️ **Fetch and display projects dynamically**  
✔️ **Soft delete functionality (`isDeleted: true`)**  
✔️ **Update project details**  
✔️ **API-based communication between frontend and backend**  
✔️ **Session-based authentication**  

---

## 🚀 Contributing
Feel free to open an issue or a pull request for improvements.

## 📜 License
This project is open-source and available under the **MIT License**.

📌 **Developed by:** Deval Bhungaliya 
🔗 **GitHub:** [GitHub Link](https://github.com/bhun0002/project-nexus)
