import React, { useState } from "react";
import { signup } from "../api";
import { useNavigate } from "react-router-dom";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
    TextField, Button, Container, Paper, Typography,
    CircularProgress, InputAdornment, IconButton
} from "@mui/material";



const Signup = ({ setUser }) => {  // ✅ Receive setUser from App.js
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        contactNumber: "",
        password: "",
        confirmPassword: ""
    });

    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);


    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setErrors({ ...errors, [e.target.name]: "" }); // Clear field error on typing
    };

    const validateForm = () => {
        let tempErrors = {};
        if (!formData.name.trim()) tempErrors.name = "Full Name is required";
        if (!formData.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) tempErrors.email = "Enter a valid email";
        if (!formData.contactNumber.match(/^\d{10}$/)) tempErrors.contactNumber = "Enter a valid 10-digit phone number";
        if (formData.password.length < 6) tempErrors.password = "Password must be at least 6 characters";
        if (formData.password !== formData.confirmPassword) tempErrors.confirmPassword = "Passwords do not match";

        setErrors(tempErrors);
        return Object.keys(tempErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        setLoading(true);
        try {
            const response = await signup(formData);
            alert(response.message); // Success Message


            setUser({ name: formData.name, email: formData.email });
            navigate("/submit");   // ✅ Immediate navigation after success


        } catch (error) {
            console.error("Signup Error:", error);

            let tempErrors = {};

            // ✅ Highlight email field if the email is already registered
            if (error.error === "Email already registered") {
                // tempErrors.email = "This email is already registered. Try logging in.";
                alert("Email already registered. Redirecting to login...");
                navigate("/login");
            } else {
                tempErrors.general = "Error signing up! Please try again.";
            }

            setErrors(tempErrors);
        } finally {
            setLoading(false);
        }
    };

    // ✅ Handle Login Redirect Using useNavigate
    const handleLoginRedirect = () => {
        navigate("/login");
    };

    return (
        <Container maxWidth="sm">
            <Paper elevation={3} style={{ padding: 30, marginTop: 40 }}>
                <Typography variant="h4" align="center" gutterBottom>
                    Create an Account
                </Typography>
                <Typography variant="subtitle1" align="center" color="textSecondary" gutterBottom>
                    Fill in the details to register and submit your project.
                </Typography>
                <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 15 }}>

                    <TextField
                        label="Full Name"
                        name="name"
                        variant="outlined"
                        fullWidth
                        value={formData.name}
                        onChange={handleChange}
                        error={!!errors.name}
                        helperText={errors.name}
                    />

                    <TextField
                        label="Email"
                        name="email"
                        type="email"
                        variant="outlined"
                        fullWidth
                        value={formData.email}
                        onChange={handleChange}
                        error={!!errors.email}
                        helperText={errors.email}
                    />

                    <TextField
                        label="Contact Number"
                        name="contactNumber"
                        variant="outlined"
                        fullWidth
                        value={formData.contactNumber}
                        onChange={handleChange}
                        error={!!errors.contactNumber}
                        helperText={errors.contactNumber}
                    />

                    {/* <TextField
                        label="Password"
                        name="password"
                        type="password"
                        variant="outlined"
                        fullWidth
                        value={formData.password}
                        onChange={handleChange}
                        error={!!errors.password}
                        helperText={errors.password}
                    /> */}

                    {/* <TextField
                        label="Confirm Password"
                        name="confirmPassword"
                        type="password"
                        variant="outlined"
                        fullWidth
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        error={!!errors.confirmPassword}
                        helperText={errors.confirmPassword}
                    /> */}


                      {/* Updated Password Field with slotProps.input */}
                      <TextField
                        label="Password"
                        name="password"
                        type={showPassword ? "text" : "password"}
                        variant="outlined"
                        fullWidth
                        value={formData.password}
                        onChange={handleChange}
                        error={!!errors.password}
                        helperText={errors.password}
                        slotProps={{
                            input: {
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            },
                        }}
                    />

                    {/* Updated Confirm Password Field with slotProps.input */}
                    <TextField
                        label="Confirm Password"
                        name="confirmPassword"
                        type={showConfirmPassword ? "text" : "password"}
                        variant="outlined"
                        fullWidth
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        error={!!errors.confirmPassword}
                        helperText={errors.confirmPassword}
                        slotProps={{
                            input: {
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton onClick={() => setShowConfirmPassword(!showConfirmPassword)} edge="end">
                                            {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            },
                        }}
                    />

                    {/* General Form Error Message */}
                    {errors.general && <Typography color="error" align="center">{errors.general}</Typography>}

                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        fullWidth
                        disabled={loading}
                        style={{ marginTop: 15 }}
                    >
                        {loading ? <CircularProgress size={24} color="inherit" /> : "Sign Up"}
                    </Button>

                    {/* ✅ Login Button Instead of Link */}
                    <Typography align="center" style={{ marginTop: 10 }}>
                        Already have an account?{" "}
                        <Button
                            color="primary"
                            style={{ fontWeight: "bold", textTransform: "none" }}
                            onClick={handleLoginRedirect}
                        >
                            Log in here
                        </Button>
                    </Typography>
                </form>
            </Paper>
        </Container>
    );
};

export default Signup;
