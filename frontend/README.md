# 📌 Project Nexus - Frontend

The frontend of **Project Nexus** is a React-based web application that allows users to submit, view, update, and soft delete projects. It interacts with the backend API to manage project data.

## 🚀 **Features**

- **User Authentication:** Users can **sign up** and **log in** to manage their projects.
- **Project Submission:** Users can submit project details through a **structured form**.
- **Project List Display:** Projects are displayed with modern **card-based UI**.
- **Project Editing:** Users can edit project details.
- **Soft Delete Feature:** Instead of permanently deleting, projects are marked as **deleted**.
- **Navigation & Routing:** Seamless navigation using **React Router**.
- **Environment-Based API URL:** Uses `.env` to manage API endpoints.
- **Logout Feature:** Users can log out, which clears the session and redirects them to the login page.

## 📂 **Project Structure**

```
frontend/
│-- src/
│   │-- components/
│   │   ├── ClientInputForm.js      # Handles project submission
│   │   ├── Footer.js               # Footer section
│   │   ├── Navbar.js               # Navigation bar
│   │   ├── ProjectList.js          # Displays projects
│   │   ├── ProjectDetails.js       # Individual project details
│   │   ├── Login.js                # User login page
│   │   ├── Signup.js               # User signup page
│   │-- pages/
│   │   ├── Home.js                 # Homepage
│   │   ├── Dashboard.js            # User dashboard
│   │-- api.js                      # API interaction functions
│   │-- App.js                       # Main App component
│   │-- index.js                     # Entry point
│-- public/
│-- .env                             # Environment variables
│-- package.json                     # Dependencies
│-- README.md                        # Documentation
│-- .gitignore                        # Ignored files
```

## 🛠️ Installation & Setup

### 1️⃣ Prerequisites
Ensure you have the following installed:
- **Node.js** (v14 or later recommended)
- **npm** or **yarn**

### 2️⃣ Clone the Repository
Clone the repository and navigate to the frontend directory:

```sh
git clone https://github.com/your-repo/project-nexus.git
cd project-nexus/frontend
```

### 3️⃣ Install Dependencies
```sh
npm install
```
or
```sh
yarn install
```

### 4️⃣ Configure Environment Variables
Create a `.env` file in the root of the frontend directory and configure the API base URL:

```
REACT_APP_API_BASE_URL=http://localhost:5000/api
```

### 5️⃣ Run the Application

Start the development server:

```sh
npm start
```
or
```sh
yarn start
```
The app will run at **http://localhost:3000**

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



## 🚀 Deployment
To build the project for production:
```sh
npm run build
```
or
```sh
yarn build
```
This generates an optimized build in the `/build` directory.



## 📜 Components Breakdown

- **`ClientInputForm.js`** - Handles project submission.
- **`ProjectList.js`** - Displays a list of projects in a **modern card UI** with edit/delete options.
- **`ProjectDetails.js`** - Shows detailed project information.
- **`Navbar.js`** - Provides navigation and a **Logout** button.
- **`Login.js`** - Handles user authentication (Login form).
- **`Signup.js`** - Handles new user registration.

## 🔐 Authentication (Handled in `authController.js`)
- **Signup (`/api/auth/signup`)** - Allows users to create an account.
- **Login (`/api/auth/login`)** - Authenticates users and maintains session.
- **Logout** - Clears user session and redirects to login.

## **Troubleshooting**
1. **Missing Dependencies:** Run `npm install` or `yarn install`.
2. **Backend Not Running:** Ensure the backend is started (`npm run dev` in `/backend`).
3. **API Not Connecting:** Check `.env` file and confirm the correct API URL.

## ✨ Technologies Used

- **React.js** (Hooks, Functional Components)
- **Material-UI** (UI Components)
- **React Router** (Client-side routing)
- **Axios & Fetch API** (API calls)
- **Environment Variables** (`.env` for configuration)

## 📌 Development Commands

| Command           | Description                             |
|------------------|-------------------------------------|
| `npm install`    | Install dependencies               |
| `npm start`      | Run development server             |
| `npm run build`  | Build the project for production   |


## 🚀 Contributing
1. Fork the repository.
2. Create a new branch: `git checkout -b feature-branch`
3. Make changes and commit: `git commit -m "Your message"`
4. Push changes: `git push origin feature-branch`
5. Submit a pull request.


## 🚀 Contributing
Feel free to open an issue or a pull request for improvements.

## 📜 License
This project is open-source and available under the **MIT License**.

📌 **Developed by:** Deval Bhungaliya 
🔗 **GitHub:** [GitHub Link](https://github.com/bhun0002/project-nexus)
