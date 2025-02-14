import React, { useState, useEffect } from "react";
import {
    TextField, Button, Radio, RadioGroup, FormControlLabel,
    FormControl, FormLabel, Select, MenuItem, Typography,
    Container, Paper, Box, Grid, Link
} from "@mui/material";
import { useNavigate } from "react-router-dom"; // ✅ Navigation hook
import { Logout, ArrowBack } from "@mui/icons-material"; // ✅ Icons for Logout & Navigation

const ClientInputForm = ({ user }) => {
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

    // ✅ Ensure user details are set when available
    useEffect(() => {
        if (user) {
            setFormData((prev) => ({
                ...prev,
                clientName: user.name,
                clientEmail: user.email
            }));
        }
    }, [user]);

    // ✅ Handle input changes
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

            alert("Project submitted successfully!");
            navigate("/projects");  // ✅ Redirect after submission

        } catch (error) {
            console.error("Error submitting form:", error);
            alert("Submission failed.");
        }
    };

    // ✅ Logout Function
    const handleLogout = () => {
        sessionStorage.removeItem("loggedInUser");  // ✅ Clear session storage
        navigate("/login");  // ✅ Redirect to login page
    };


    return (
        <Container maxWidth="md">
            <Paper elevation={3} sx={{ padding: "30px", marginTop: "20px", borderRadius: "10px" }}>


                {/* 🔹 Top Navigation: Back & Logout */}
                <Box display="flex" justifyContent="space-between" alignItems="center" marginBottom={2}>
                    <Button
                        variant="contained"
                        color="secondary"
                        startIcon={<ArrowBack />}
                        onClick={() => navigate("/projects")}
                    >
                        My Projects
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

                <Typography variant="h4" gutterBottom>
                    Software Development Project Request
                </Typography>
                <Typography variant="body1" paragraph>
                    Thank you for your interest in working with Algonquin College Students.
                    This form is to gather project details for evaluation. Kindly fill in all
                    required fields to proceed.
                </Typography>

                <form onSubmit={handleSubmit}>
                    {/* ✅ Two-column layout for better UX */}
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <TextField fullWidth label="Client Name" name="clientName" value={formData.clientName} disabled margin="normal" />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField fullWidth label="Client Email Address" type="email" name="clientEmail" value={formData.clientEmail} disabled margin="normal" />
                        </Grid>
                    </Grid>

                    <TextField fullWidth label="Client Company" name="clientCompany" value={formData.clientCompany} onChange={handleChange} required margin="normal" />
                    <TextField fullWidth label="Project Name" name="projectName" value={formData.projectName} onChange={handleChange} required margin="normal" />

                    {/* ✅ Detailed Description Section */}
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

                    {/* ✅ Commitment Section */}
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

                    {/* ✅ Purchasing Required Section */}
                    <FormControl component="fieldset" margin="normal">
                        <FormLabel>Is there any purchasing required for this project?</FormLabel>
                        <RadioGroup row name="purchasingRequired" value={formData.purchasingRequired} onChange={handleChange}>
                            <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                            <FormControlLabel value="No" control={<Radio />} label="No" />
                        </RadioGroup>
                    </FormControl>

                    {/* Adding a margin to separate the NDA section into a new row */}
                    <div style={{ marginTop: "10px" }}></div>

                    {/* ✅ Students Sign an NDA */}
                    <FormControl component="fieldset" margin="normal">
                        <FormLabel>Will you require that the students sign an NDA? *</FormLabel>
                        <RadioGroup row name="ndaRequired" value={formData.ndaRequired} onChange={handleChange}>
                            <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                            <FormControlLabel value="Maybe" control={<Radio />} label="Maybe - I am undecided" />
                            <FormControlLabel value="No" control={<Radio />} label="No" />
                        </RadioGroup>
                    </FormControl>

                    {/* ✅ Showcase Approval with Explanation */}
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

                    {/* ✅ Semester Selection */}
                    <FormControl fullWidth margin="normal">
                        <FormLabel>What semester are you looking to get started in?</FormLabel>
                        <Select name="semester" value={formData.semester} onChange={handleChange}>
                            <MenuItem value="As soon as possible">As soon as possible</MenuItem>
                            <MenuItem value="Winter Term">Winter Term (Jan - Apr)</MenuItem>
                            <MenuItem value="Spring Term">Spring Term (May - Aug)</MenuItem>
                            <MenuItem value="Fall Term">Fall Term (Sep - Dec)</MenuItem>
                            <MenuItem value="Other">Other</MenuItem>
                        </Select>
                    </FormControl>

                    {/* ✅ Buttons */}
                    <Box display="flex" justifyContent="space-between" mt={3}>
                        {/* <Button variant="outlined" color="secondary" onClick={() => navigate("/projects")}>
                            View My Projects
                        </Button> */}
                        <Button type="submit" variant="contained" color="primary">
                            Submit Project
                        </Button>
                    </Box>
                </form>
            </Paper>
        </Container>
    );
};

export default ClientInputForm;
