# **Frontend README - Project Nexus**

## **Project Overview**
The frontend of **Project Nexus** is a React-based web application that allows users to submit, view, update, and soft delete projects. It interacts with the backend API to manage project data.

---

## **Getting Started**

### **1. Prerequisites**
Ensure you have the following installed:
- **Node.js** (v14 or later recommended)
- **npm** or **yarn**

### **2. Installation**
Clone the repository and navigate to the frontend directory:

```sh
git clone https://github.com/your-repo/project-nexus.git
cd project-nexus/frontend
```

Install dependencies:
```sh
npm install
```
or
```sh
yarn install
```

### **3. Environment Configuration**
Create a `.env` file in the root of the frontend directory and configure the API base URL:

```
REACT_APP_API_BASE_URL=http://localhost:5000/api
```

---

## **Running the Application**
Start the development server:

```sh
npm start
```
or
```sh
yarn start
```

The app will run at **http://localhost:3000**

---

## **Project Structure**
```
frontend/
│── public/                  # Static files
│── src/
│   ├── components/          # React UI components
│   ├── pages/               # Page components
│   ├── api.js               # API calls to backend
│   ├── App.js               # Main application file
│   ├── index.js             # Entry point for React
│   └── .env                 # Environment variables
├── package.json             # Dependencies & scripts
└── README.md                # Documentation
```

---

## **Features**
- **Submit Projects:** Users can submit project details through a form.
- **View Projects:** Projects are displayed in a list format.
- **Update Projects:** Users can edit project details.
- **Soft Delete Projects:** Projects are marked as deleted instead of being permanently removed.
- **Environment-Based API URL:** Uses `.env` to manage API endpoints.

---

## **API Endpoints Used**
| Method | Endpoint                  | Description |
|--------|----------------------------|-------------|
| GET    | `/api/projects`            | Fetch all active projects |
| POST   | `/api/projects`            | Create a new project |
| PUT    | `/api/projects/:id`        | Update a project |
| DELETE | `/api/projects/:id`        | Soft delete a project |

---

## **Deployment**
To build the project for production:
```sh
npm run build
```
or
```sh
yarn build
```
This generates an optimized build in the `/build` directory.

---

## **Troubleshooting**
1. **Missing Dependencies:** Run `npm install` or `yarn install`.
2. **Backend Not Running:** Ensure the backend is started (`npm run dev` in `/backend`).
3. **API Not Connecting:** Check `.env` file and confirm the correct API URL.

---

## **Contributing**
1. Fork the repository.
2. Create a new branch: `git checkout -b feature-branch`
3. Make changes and commit: `git commit -m "Your message"`
4. Push changes: `git push origin feature-branch`
5. Submit a pull request.

---

## **License**
This project is licensed under the MIT License.
