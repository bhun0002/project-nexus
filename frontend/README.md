# 📌 Project Nexus - Frontend


The frontend of **Project Nexus** is a React-based web application that allows users to submit, view, update, and soft delete projects. It interacts with the backend API to manage project data.


## 🚀 **Features**
- **Submit Projects:** Users can submit project details through a form.
- **View Projects:** Projects are displayed in a list format.
- **Update Projects:** Users can edit project details.
- **Soft Delete Projects:** Projects are marked as deleted instead of being permanently removed.
- **Environment-Based API URL:** Uses `.env` to manage API endpoints.

## 📂 **Project Structure**

```
frontend/
│-- src/
│   │-- components/
│   │   ├── ClientInputForm.js
│   │   ├── Footer.js
│   │   ├── Navbar.js
│   │   ├── ProjectList.js
│   │-- api.js
│   │-- App.js
│   │-- index.js
│-- public/
│-- .env
│-- package.json
│-- README.md
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
| Method | Endpoint                  | Description |
|--------|----------------------------|-------------|
| GET    | `/api/projects`            | Fetch all active projects |
| POST   | `/api/projects`            | Create a new project |
| PUT    | `/api/projects/:id`        | Update a project |
| DELETE | `/api/projects/:id`        | Soft delete a project |



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

- **`ClientInputForm.js`** - Handles project submission via form input.
- **`ProjectList.js`** - Displays a list of projects and allows editing/deletion.
- **`Navbar.js`** - Provides navigation for the app.
- **`Footer.js`** - Displays the footer section.

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


## 📜 License

This project is licensed under the **MIT License**.



📌 **Developed by:** Deval Bhungaliya 
🔗 **GitHub:** [GitHub Link](https://github.com/bhun0002/project-nexus)
