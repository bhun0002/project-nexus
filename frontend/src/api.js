import axios from "axios";  // ✅ Ensure axios is imported
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || "http://localhost:5000/api"; // Default if env is missing

export const fetchProjects = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/projects`);
    if (!response.ok) {
      throw new Error("Failed to fetch projects");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching projects:", error);
    return [];
  }
};

export const createProject = async (projectData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/projects`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(projectData),
    });

    if (!response.ok) {
      throw new Error("Failed to create project");
    }
    return await response.json();
  } catch (error) {
    console.error("Error creating project:", error);
    throw error;
  }
};

// ✅ Soft delete by updating `isDeleted` to true
export const deleteProject = async (id) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/projects/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting project:", error);
    throw error;
  }
};

// ✅ Updating Project Data
export const updateProject = async (id, updatedData) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/projects/${id}`, updatedData);
    return response.data;
  } catch (error) {
    console.error("Error updating project:", error);
    throw error;
  }
};