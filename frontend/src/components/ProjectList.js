import React, { useState, useEffect } from "react";
import { fetchProjects } from "../api";
import { Container, Paper, Typography, List, ListItem, ListItemText } from "@mui/material";

const ProjectList = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    fetchProjects()
      .then((data) => {
        // Sort projects by createdAt in descending order (newest first)
        const sortedProjects = data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        setProjects(sortedProjects);
      })
      .catch(console.error);
  }, []);

  return (
    <Container maxWidth="md">
      <Paper elevation={3} style={{ padding: "20px", marginTop: "20px" }}>
        <Typography variant="h4">Project List</Typography>
        <List>
          {projects.map((project, index) => (
            <ListItem key={index} divider>
              <ListItemText
                primary={`${project.projectName} (by ${project.clientName})`}
                secondary={
                  <>
                    <Typography variant="body2" color="textPrimary">
                      {project.projectDescription}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      Client Email: {project.clientEmail}
                    </Typography>
                  </>
                }
              />
            </ListItem>
          ))}
        </List>
      </Paper>
    </Container>
  );
};

export default ProjectList;