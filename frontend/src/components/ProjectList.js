import React, { useState, useEffect } from "react";
import { fetchProjects, updateProject, deleteProject } from "../api";
import { useNavigate } from "react-router-dom";
import {
    Container, Paper, Typography, List, ListItem, ListItemText,
    Button, TextField, Grid, Box, Tooltip
} from "@mui/material";

const ProjectList = ({ user }) => {
    const [projects, setProjects] = useState([]);
    const [editProject, setEditProject] = useState(null);
    const [updatedData, setUpdatedData] = useState({ projectName: "", projectDescription: "" });
    const navigate = useNavigate();

    
    useEffect(() => {
        // ✅ Restore user from sessionStorage if missing
        let currentUser = user;
        if (!currentUser) {
            const storedUser = sessionStorage.getItem("loggedInUser");
            if (storedUser) {
                currentUser = JSON.parse(storedUser);
            }
        }

        // ✅ If user is still undefined, redirect to login
        if (!currentUser || !currentUser.email) {
            console.error("Client is not authorized. Redirecting to login.");
            navigate("/login");
            return;
        }

        // ✅ Fetch projects for the logged-in user
        fetchProjects(currentUser.email)
            .then(setProjects)
            .catch(console.error);
    }, [user, navigate]);


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
            setProjects((prevProjects) => prevProjects.filter((p) => p._id !== id));
        } catch (error) {
            console.error("Error deleting project:", error);
        }
    };

    return (
        <Container maxWidth="md">
            <Paper elevation={3} sx={{ padding: 4, marginTop: 4 }}>
                <Typography variant="h4" align="center" gutterBottom>
                    Project List
                </Typography>
                <List>
                    {projects.map((project) => (
                        <ListItem key={project._id} divider sx={{ padding: 2 }}>
                            {editProject === project._id ? (
                                <Box sx={{ width: "100%" }}>
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
                                    <Grid container spacing={2} sx={{ marginTop: 1 }}>
                                        <Grid item xs={6}>
                                            <Button fullWidth onClick={() => handleUpdate(project._id)} variant="contained" color="primary">
                                                Save
                                            </Button>
                                        </Grid>
                                        <Grid item xs={6}>
                                            <Button fullWidth onClick={() => setEditProject(null)} variant="contained" color="secondary">
                                                Cancel
                                            </Button>
                                        </Grid>
                                    </Grid>
                                </Box>
                            ) : (
                                <Grid container alignItems="center" spacing={2} sx={{ width: "100%" }}>
                                    {/* Left Section - Project Info */}
                                    <Grid item xs={12} sm={7}>
                                        <ListItemText
                                            primary={<Typography variant="h6">{project.projectName}</Typography>}
                                            secondary={
                                                <>
                                                    <Tooltip title={project.projectDescription} arrow>
                                                        <Typography
                                                            variant="body2"
                                                            color="textSecondary"
                                                            noWrap
                                                            sx={{
                                                                maxWidth: "100%",
                                                                overflow: "hidden",
                                                                textOverflow: "ellipsis",
                                                                whiteSpace: "nowrap",
                                                            }}
                                                        >
                                                            {project.projectDescription.length > 100
                                                                ? `${project.projectDescription.substring(0, 100)}...`
                                                                : project.projectDescription}
                                                        </Typography>
                                                    </Tooltip>
                                                    <Typography
                                                        variant="body2"
                                                        sx={{
                                                            fontWeight: "bold",
                                                            marginTop: 1,
                                                            color: "gray",
                                                            display: "flex",
                                                            alignItems: "center",
                                                            gap: "6px",
                                                        }}
                                                    >
                                                        Client:
                                                        <Tooltip title={`${project.clientName} (${project.clientEmail})`} arrow>
                                                            <span
                                                                style={{
                                                                    fontWeight: "normal",
                                                                    maxWidth: "250px",
                                                                    whiteSpace: "nowrap",
                                                                    overflow: "hidden",
                                                                    textOverflow: "ellipsis",
                                                                    display: "inline-block",
                                                                    cursor: "pointer",
                                                                }}
                                                            >
                                                                {project.clientName} ({project.clientEmail})
                                                            </span>
                                                        </Tooltip>
                                                    </Typography>
                                                </>
                                            }
                                        />
                                    </Grid>

                                    {/* Right Section - Buttons */}
                                    <Grid item xs={12} sm={5} sx={{ display: "flex", justifyContent: "flex-end", gap: "8px" }}>
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            size="small"
                                            onClick={() => navigate(`/project/${project._id}`)}
                                        >
                                            View Details
                                        </Button>
                                        <Button
                                            variant="contained"
                                            color="info"
                                            size="small"
                                            onClick={() => {
                                                setEditProject(project._id);
                                                setUpdatedData({ projectName: project.projectName, projectDescription: project.projectDescription });
                                            }}
                                        >
                                            Edit
                                        </Button>
                                        <Button
                                            variant="contained"
                                            color="error"
                                            size="small"
                                            onClick={() => handleDelete(project._id)}
                                        >
                                            Delete
                                        </Button>
                                    </Grid>
                                </Grid>
                            )}
                        </ListItem>
                    ))}
                </List>
            </Paper>
        </Container>
    );
};

export default ProjectList;
