import axios from "axios";  // ✅ Ensure axios is imported

// ✅ Use environment variable for API base URL
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || "http://localhost:5000/api";

// ✅ Signup Function (Register New User)
export const signup = async (userData) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/auth/signup`, userData);
        return response.data;
    } catch (error) {
        console.error("Error signing up:", error.response?.data || error.message);
        throw error.response?.data || { error: "Signup failed" };
    }
};

// ✅ Login Function (Authenticate User)
export const login = async (credentials) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/auth/login`, credentials);
        return response.data;
    } catch (error) {
        console.error("Error logging in:", error.response?.data || error.message);
        throw error.response?.data || { error: "Login failed" };
    }
};

// ✅ Fetch all projects (Only active projects)
export const fetchProjects = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/projects`);
        return response.data;
    } catch (error) {
        console.error("Error fetching projects:", error.response?.data || error.message);
        throw error.response?.data || { error: "Error fetching projects" };
    }
};

// ✅ Create a new project
export const createProject = async (projectData) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/projects`, projectData);
        return response.data;
    } catch (error) {
        console.error("Error creating project:", error.response?.data || error.message);
        throw error.response?.data || { error: "Error creating project" };
    }
};

// ✅ Update project details
export const updateProject = async (id, updatedData) => {
    try {
        const response = await axios.put(`${API_BASE_URL}/projects/${id}`, updatedData);
        return response.data;
    } catch (error) {
        console.error("Error updating project:", error.response?.data || error.message);
        throw error.response?.data || { error: "Error updating project" };
    }
};

// ✅ Soft delete project (Update `isDeleted` flag to true)
export const deleteProject = async (id) => {
    try {
        const response = await axios.delete(`${API_BASE_URL}/projects/${id}`);
        return response.data;
    } catch (error) {
        console.error("Error deleting project:", error.response?.data || error.message);
        throw error.response?.data || { error: "Error deleting project" };
    }
};
