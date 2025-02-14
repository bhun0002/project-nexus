import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchProjectById } from "../api"; // ✅ Use new API function
import {
    TextField, Typography, Container, Paper, Button
} from "@mui/material";

const ProjectDetail = () => {
    const { id } = useParams(); // ✅ Get project ID from URL
    const [project, setProject] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        fetchProjectById(id)
            .then(setProject)
            .catch((error) => {
                console.error("Error fetching project details:", error);
                alert("Project not found");
                navigate("/projects");
            });
    }, [id, navigate]);

    if (!project) {
        return <Typography>Loading...</Typography>;
    }

    return (
        <Container maxWidth="md">
            <Paper elevation={3} style={{ padding: "20px", marginTop: "20px" }}>
                <Typography variant="h4" gutterBottom>
                    Project Details
                </Typography>
                <form>
                    <TextField fullWidth label="Client Name" value={project.clientName} disabled margin="normal" />
                    <TextField fullWidth label="Client Email" value={project.clientEmail} disabled margin="normal" />
                    <TextField fullWidth label="Client Company" value={project.clientCompany} disabled margin="normal" />
                    <TextField fullWidth label="Project Name" value={project.projectName} disabled margin="normal" />
                    <TextField fullWidth label="Project Description" value={project.projectDescription} disabled multiline rows={4} margin="normal" />

                    <TextField fullWidth label="Time Commitment" value={project.timeCommitment} disabled margin="normal" />
                    <TextField fullWidth label="Purchasing Required" value={project.purchasingRequired} disabled margin="normal" />
                    <TextField fullWidth label="NDA Required" value={project.ndaRequired} disabled margin="normal" />
                    <TextField fullWidth label="Showcase Approval" value={project.showcaseApproval} disabled margin="normal" />
                    <TextField fullWidth label="Semester" value={project.semester} disabled margin="normal" />

                    <Button variant="contained" color="primary" style={{ marginTop: "20px" }} onClick={() => navigate("/projects")}>
                        Back to Projects
                    </Button>
                </form>
            </Paper>
        </Container>
    );
};

export default ProjectDetail;
