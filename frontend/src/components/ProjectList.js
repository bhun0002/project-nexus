import React, { useState, useEffect } from "react";
import { fetchProjects, updateProject, deleteProject } from "../api";
import { useNavigate } from "react-router-dom";
import {
    Container, Paper, Typography, Card, CardContent, CardActions,
    Button, TextField, Grid, Box, Tooltip, IconButton
} from "@mui/material";
import { Edit, Delete, Visibility, Logout, ArrowBack } from "@mui/icons-material";

const ProjectList = ({ user }) => {
    const [projects, setProjects] = useState([]);
    const [editProject, setEditProject] = useState(null);
    const [updatedData, setUpdatedData] = useState({ projectName: "", projectDescription: "" });
    const navigate = useNavigate();

    useEffect(() => {
        let currentUser = user;
        if (!currentUser) {
            const storedUser = sessionStorage.getItem("loggedInUser");
            if (storedUser) {
                currentUser = JSON.parse(storedUser);
            }
        }

        if (!currentUser || !currentUser.email) {
            console.error("Client is not authorized. Redirecting to login.");
            navigate("/login");
            return;
        }

        fetchProjects(currentUser.email)
            .then(setProjects)
            .catch(console.error);
    }, [user, navigate]);

    const handleLogout = () => {
        sessionStorage.removeItem("loggedInUser");  // ✅ Clear session storage
        navigate("/login");  // ✅ Redirect to login page
    };

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
        <Container maxWidth="lg">
            <Paper elevation={3} sx={{ padding: 4, marginTop: 4, borderRadius: "10px" }}>
                
                {/* 🔹 Top Navigation: Back & Logout */}
                <Box display="flex" justifyContent="space-between" marginBottom={2}>
                    <Button
                        variant="contained"
                        color="secondary"
                        startIcon={<ArrowBack />}
                        onClick={() => navigate("/submit")}
                    >
                        Back to Project Submission
                    </Button>

                    <Button
                        variant="contained"
                        color="error"
                        startIcon={<Logout />}
                        onClick={handleLogout}
                    >
                        Logout
                    </Button>
                </Box>

                <Typography variant="h4" align="center" gutterBottom>
                    My Projects
                </Typography>

                <Grid container spacing={3} justifyContent="center">
                    {projects.map((project) => (
                        <Grid item xs={12} sm={6} md={4} key={project._id}>
                            <Card elevation={4} sx={{ borderRadius: "10px" }}>
                                <CardContent>
                                    <Typography variant="h6">{project.projectName}</Typography>
                                    <Tooltip title={project.projectDescription} arrow>
                                        <Typography
                                            variant="body2"
                                            color="textSecondary"
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
                                        }}
                                    >
                                        Client: {project.clientName} ({project.clientEmail})
                                    </Typography>
                                </CardContent>

                                <CardActions sx={{ display: "flex", justifyContent: "space-between" }}>
                                    <IconButton
                                        color="primary"
                                        onClick={() => navigate(`/project/${project._id}`)}
                                    >
                                        <Visibility />
                                    </IconButton>

                                    <IconButton
                                        color="info"
                                        onClick={() => {
                                            setEditProject(project._id);
                                            setUpdatedData({ projectName: project.projectName, projectDescription: project.projectDescription });
                                        }}
                                    >
                                        <Edit />
                                    </IconButton>

                                    <IconButton
                                        color="error"
                                        onClick={() => handleDelete(project._id)}
                                    >
                                        <Delete />
                                    </IconButton>
                                </CardActions>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Paper>
        </Container>
    );
};

export default ProjectList;
