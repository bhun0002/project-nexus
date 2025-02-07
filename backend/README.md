# 📌 Project Nexus - Backend

This is the **backend** module of Project Nexus, responsible for handling API requests, managing the database, and serving data to the frontend. The backend is built with **Node.js**, **Express.js**, and **MongoDB** (Mongoose ORM) and follows a structured **MVC architecture**.

## 🚀 Features
- RESTful API for project management.
- CRUD operations for projects (Create, Read, Update, Soft Delete).
- MongoDB integration with **Mongoose**.
- Environment variable support using **dotenv**.
- Uses **CORS** for secure API requests from the frontend.
- API structured with **controllers**, **routes**, and **models**.

## 📁 Project Structure
```
backend/
│── src/
│   ├── controllers/
│   │   ├── projectController.js   # Handles project-related logic
│   ├── models/
│   │   ├── project.js             # Mongoose schema for projects
│   ├── routes/
│   │   ├── projectRoutes.js       # Defines API routes
│   ├── database/
│   │   ├── db.js                  # Database connection setup
│   ├── server.js                  # Main Express server file
│   ├── .env                        # Environment variables
│── package.json                    # Dependencies and scripts
│── README.md                        # Documentation
```

## 🛠️ Installation & Setup

### 1️⃣ Prerequisites
Ensure you have **Node.js**, **MongoDB**, and **npm** installed.

### 2️⃣ Clone the Repository
```bash
git clone https://github.com/your-username/project-nexus.git
cd project-nexus/backend
```

### 3️⃣ Install Dependencies
```bash
npm install
```

### 4️⃣ Configure Environment Variables
Create a `.env` file in the **backend** directory and add:
```
MONGO_URI=mongodb://127.0.0.1:27017/project-nexus
PORT=5000
CORS_ORIGIN=http://localhost:3000
```

### 5️⃣ Run the Server
```bash
npm run dev
```
This starts the server on `http://localhost:5000`.

## 📌 API Endpoints

| Method | Endpoint | Description |
|--------|---------|-------------|
| **POST** | `/api/projects` | Create a new project |
| **GET** | `/api/projects` | Fetch all active projects |
| **GET** | `/api/projects/:id` | Get a specific project by ID |
| **PUT** | `/api/projects/:id` | Update project details |
| **DELETE** | `/api/projects/:id` | Soft delete (marks `isDeleted: true`) |

## ✨ Technologies Used
- **Node.js** - Runtime environment
- **Express.js** - Backend framework
- **MongoDB & Mongoose** - Database & ORM
- **CORS** - Secure cross-origin requests
- **dotenv** - Environment variable management

## 🚀 Contributing
Feel free to open an issue or a pull request for improvements.

## 📜 License
This project is open-source and available under the **MIT License**.
