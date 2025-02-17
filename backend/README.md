# 📌 Project Nexus - Backend

This is the **backend** module of Project Nexus, responsible for handling API requests, managing the database, and serving data to the frontend. The backend is built with **Node.js**, **Express.js**, and **MongoDB** (Mongoose ORM) and follows a structured **MVC architecture**.

## 🚀 Features
- RESTful API for project management.
- CRUD operations for projects (Create, Read, Update, Soft Delete).
- **MongoDB Database Integration** using Mongoose
- **Session-based authentication**
- **Environment variable support** with dotenv.
- **CORS enabled** for frontend-backend communication
- **Structured codebase** for scalability 

## 📁 Project Structure
```
backend/
│── src/
│   ├── controllers/
│   │   ├── authController.js       # Handles authentication
│   │   ├── projectController.js    # Handles project operations
│   ├── models/
│   │   ├── User.js                 # Mongoose schema for users
│   │   ├── project.js              # Mongoose schema for projects
│   ├── routes/
│   │   ├── authRoutes.js           # Authentication routes
│   │   ├── projectRoutes.js        # Project routes
│   ├── database/
│   │   ├── db.js                   # Database connection setup
│   ├── middleware/
│   │   ├── authMiddleware.js       # Authentication middleware (if applicable)
│   ├── server.js                   # Main Express server file
│   ├── .env                        # Environment variables
│── package.json                    # Dependencies and scripts
│── README.md                       # Documentation
```


## 🛠️ Installation & Setup

### 1️⃣ Prerequisites
Ensure you have the following installed on your system:
- **Node.js** (`v16+ recommended`)
- **MongoDB** (Running locally on `127.0.0.1:27017`)
- **npm** (Node Package Manager)

### 2️⃣ Clone the Repository
```bash
git clone https://github.com/bhun0002/project-nexus.git
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

📌 **Developed by:** Deval Bhungaliya 
🔗 **GitHub:** [GitHub Link](https://github.com/bhun0002/project-nexus)
