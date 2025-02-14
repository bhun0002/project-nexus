import React, { useState, useEffect } from "react";
import {
    TextField, Button, Radio, RadioGroup, FormControlLabel,
    FormControl, FormLabel, Select, MenuItem, Typography,
    Container, Paper, Box 
} from "@mui/material";


import { useNavigate } from "react-router-dom"; // ✅ Import useNavigate for navigation

const ClientInputForm = ({ user }) => {  // ✅ Receive user details as props
    const navigate = useNavigate();

    // ✅ Initialize form state with user details
    const [formData, setFormData] = useState({
        clientName: user?.name || "",
        clientEmail: user?.email || "",
        clientCompany: "",
        projectName: "",
        projectDescription: "",
        timeCommitment: "Yes",
        purchasingRequired: "No",
        ndaRequired: "No",
        showcaseApproval: "Yes",
        semester: "Winter Term",
    });

    // ✅ Ensure that user details are set when available
    useEffect(() => {
        if (user) {
            setFormData((prev) => ({
                ...prev,
                clientName: user.name,
                clientEmail: user.email
            }));
        }
    }, [user]);

    // ✅ Handle input change events
    const handleChange = (event) => {
        setFormData({ ...formData, [event.target.name]: event.target.value });
    };

    // ✅ Handle form submission
    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || "http://localhost:5000";

            const response = await fetch(`${API_BASE_URL}/projects`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                throw new Error("Failed to submit project");
            }

            // ✅ Show confirmation and redirect to projects page
            alert("Project submitted successfully!");
            navigate("/projects");  // ✅ Redirect after successful submission

        } catch (error) {
            console.error("Error submitting form:", error);
            alert("Submission failed.");
        }
    };

    return (
        <Container maxWidth="md">
            <Paper elevation={3} style={{ padding: "20px", marginTop: "20px" }}>
                {/* ✅ "My Projects" Button at the Top */}
                <Box display="flex" justifyContent="flex-end" marginBottom={2}>
                    <Button
                        variant="contained"
                        color="secondary"
                        onClick={() => navigate("/projects")}
                    >
                        My Projects
                    </Button>
                </Box>

                <Typography variant="h4" gutterBottom>
                    Software Development Project Request
                </Typography>
                <Typography variant="body1" paragraph>
                    Thank you for your interest in working with Algonquin College Students.
                    This form is to gather project details for evaluation. Kindly fill in all
                    required fields to proceed.
                </Typography>
                <form onSubmit={handleSubmit}>

                    {/* ✅ Read-Only Client Name & Email */}
                    <TextField fullWidth label="Client Name" name="clientName" value={formData.clientName} disabled margin="normal" />
                    <TextField fullWidth label="Client Email Address" type="email" name="clientEmail" value={formData.clientEmail} disabled margin="normal" />

                    <TextField fullWidth label="Client Company" name="clientCompany" value={formData.clientCompany} onChange={handleChange} required margin="normal" />
                    <TextField fullWidth label="Project Name" name="projectName" value={formData.projectName} onChange={handleChange} required margin="normal" />

                    <FormControl fullWidth margin="normal">
                        <TextField
                            label="Description of Project *"
                            name="projectDescription"
                            value={formData.projectDescription}
                            onChange={handleChange}
                            multiline
                            rows={4}
                            required
                            margin="normal"
                            placeholder="Provide a brief description (3-5 sentences) about your project..."
                            variant="outlined"
                        />
                        <Typography variant="body2" color="textSecondary" style={{ marginTop: "5px" }}>
                            We do not need full requirements; this description will be used to advertise
                            your project to students during the matching process. Please specify whether
                            this builds on an existing product or is a new development. If technology
                            is known, please include those details. Full requirements will be gathered
                            by the student team.
                        </Typography>
                    </FormControl>

                    <FormControl component="fieldset" margin="normal">
                        <FormLabel>Do you have time to dedicate to student questions and communication requirements? *</FormLabel>
                        <Typography variant="body2" color="textSecondary">
                            Successful projects in the past have dedicated 1-2 hours weekly to communicate
                            with students and clarify requirements. It is recommended to book a 30-minute
                            recurring meeting for Q&A and progress updates. If you cannot commit, consider
                            assigning a secondary contact and specify details below.
                        </Typography>
                        <RadioGroup row name="timeCommitment" value={formData.timeCommitment} onChange={handleChange}>
                            <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                            <FormControlLabel value="No" control={<Radio />} label="No" />
                            <FormControlLabel value="Other" control={<Radio />} label="Other" />
                        </RadioGroup>
                    </FormControl>

                    <FormControl component="fieldset" margin="normal">
                        <FormLabel>Is there any purchasing required for this project?</FormLabel>
                        <RadioGroup row name="purchasingRequired" value={formData.purchasingRequired} onChange={handleChange}>
                            <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                            <FormControlLabel value="No" control={<Radio />} label="No" />
                        </RadioGroup>
                    </FormControl>

                    {/* Adding a margin to separate the NDA section into a new row */}
                    <div style={{ marginTop: "10px" }}></div>

                    <FormControl component="fieldset" margin="normal">
                        <FormLabel>Will you require that the students sign an NDA? *</FormLabel>
                        <RadioGroup row name="ndaRequired" value={formData.ndaRequired} onChange={handleChange}>
                            <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                            <FormControlLabel value="Maybe" control={<Radio />} label="Maybe - I am undecided" />
                            <FormControlLabel value="No" control={<Radio />} label="No" />
                        </RadioGroup>
                    </FormControl>

                    <FormControl component="fieldset" margin="normal">
                        <FormLabel>Would you allow your project to be showcased at our Re/ACTION event at the end of the semester? *</FormLabel>
                        <Typography variant="body2" color="textSecondary">
                            Every semester, the student teams have an opportunity to showcase their work
                            publicly during Applied Research Day
                            (<a href="https://www.algonquincollege.com/applied-research/applied-research-day/"
                                target="_blank" rel="noopener noreferrer">Visit Here</a>).
                            Students are asked to create a poster summarizing the project and are given a
                            booth to demo the project to other students, faculty, and industry attendees.
                        </Typography>
                        <RadioGroup row name="showcaseApproval" value={formData.showcaseApproval} onChange={handleChange}>
                            <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                            <FormControlLabel value="No" control={<Radio />} label="No" />
                            <FormControlLabel value="Need Info" control={<Radio />} label="I would like more information before deciding" />
                        </RadioGroup>
                    </FormControl>

                    <FormControl fullWidth margin="normal">
                        <FormLabel>What semester are you looking to get started in?</FormLabel>
                        <Select name="semester" value={formData.semester} onChange={handleChange}>
                            <MenuItem value="As soon as possible">As soon as possible</MenuItem>
                            <MenuItem value="Winter Term">Winter Term (Jan to Apr)</MenuItem>
                            <MenuItem value="Spring Term">Spring Term (May to Aug)</MenuItem>
                            <MenuItem value="Fall Term">Fall Term (Sep to Dec)</MenuItem>
                            <MenuItem value="Other">Other</MenuItem>
                        </Select>
                    </FormControl>

                    <Button type="submit" variant="contained" color="primary" fullWidth style={{ marginTop: "20px" }}>
                        SUBMIT PROJECT
                    </Button>
                </form>
            </Paper>
        </Container>
    );
};

export default ClientInputForm;
