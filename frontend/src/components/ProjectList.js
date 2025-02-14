import React, { useState, useEffect } from "react";
import { fetchProjects, updateProject, deleteProject } from "../api";
import { useNavigate } from "react-router-dom";  // ✅ Import for navigation
import { Container, Paper, Typography, List, ListItem, ListItemText, Button, TextField } from "@mui/material";

const ProjectList = () => {
    const [projects, setProjects] = useState([]);
    const [editProject, setEditProject] = useState(null);
    const [updatedData, setUpdatedData] = useState({ projectName: "", projectDescription: "" });
    const navigate = useNavigate();  // ✅ Hook for navigation

    useEffect(() => {
        fetchProjects().then(setProjects).catch(console.error);
    }, []);

    const handleUpdate = async (id) => {
        try {
            const updatedProject = await updateProject(id, updatedData);
            setProjects((prevProjects) => prevProjects.map((p) => (p._id === id ? updatedProject : p)));
            setEditProject(null);
        } catch (error) {
            console.error("Error updating project:", error);
        }
    };

    const handleDelete = async (id) => {
        try {
            await deleteProject(id);
            setProjects((prevProjects) => prevProjects.filter((p) => p._id !== id)); // ✅ Hide from frontend after soft delete
        } catch (error) {
            console.error("Error deleting project:", error);
        }
    };

    return (
        <Container maxWidth="md">
            <Paper elevation={3} style={{ padding: "20px", marginTop: "20px" }}>
                <Typography variant="h4">Project List</Typography>
                <List>
                    {projects.map((project) => (
                        <ListItem key={project._id} divider>
                            {editProject === project._id ? (
                                <div style={{ width: "100%" }}>
                                    <TextField
                                        fullWidth
                                        label="Project Name"
                                        value={updatedData.projectName}
                                        onChange={(e) => setUpdatedData({ ...updatedData, projectName: e.target.value })}
                                        margin="normal"
                                    />
                                    <TextField
                                        fullWidth
                                        label="Project Description"
                                        value={updatedData.projectDescription}
                                        onChange={(e) => setUpdatedData({ ...updatedData, projectDescription: e.target.value })}
                                        margin="normal"
                                    />
                                    <Button onClick={() => handleUpdate(project._id)} variant="contained" color="primary">
                                        Save
                                    </Button>
                                    <Button onClick={() => setEditProject(null)} variant="contained" color="secondary" style={{ marginLeft: "10px" }}>
                                        Cancel
                                    </Button>
                                </div>
                            ) : (
                                <div style={{ display: "flex", justifyContent: "space-between", width: "100%" }}>
                                    <ListItemText
                                        primary={project.projectName}
                                        secondary={`${project.projectDescription} - ${project.clientName} (${project.clientEmail})`}
                                    />
                                    <div>
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            onClick={() => navigate(`/project/${project._id}`)} // ✅ Navigate to Project Detail Page
                                            style={{ marginRight: "10px" }}
                                        >
                                            View Details
                                        </Button>
                                        <Button
                                            onClick={() => {
                                                setEditProject(project._id);
                                                setUpdatedData({ projectName: project.projectName, projectDescription: project.projectDescription });
                                            }}
                                            variant="contained"
                                            color="primary"
                                            style={{ marginRight: "10px" }}
                                        >
                                            Edit
                                        </Button>
                                        <Button onClick={() => handleDelete(project._id)} variant="contained" color="secondary">
                                            Delete
                                        </Button>
                                    </div>
                                </div>
                            )}
                        </ListItem>
                    ))}
                </List>
            </Paper>
        </Container>
    );
};

export default ProjectList;
