import React, { useState } from "react";
import { login } from "../api";
import { useNavigate } from "react-router-dom";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
    TextField, Button, Container, Paper, Typography,
    CircularProgress, InputAdornment, IconButton
} from "@mui/material";

const Login = ({ setUser }) => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });

    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setErrors({ ...errors, [e.target.name]: "" });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setErrors({}); // Clear previous errors

        try {
            const response = await login(formData);

            // ✅ Ensure response contains user data before using it
            if (!response || !response.name || !response.email) {
                throw new Error("Invalid server response");
            }

            // ✅ Set User Data after successful login
            setUser({ name: response.name, email: response.email });

            // ✅ Redirect to Client Input Form
            navigate("/submit");

        } catch (error) {
            console.error("Login Error:", error);

            let tempErrors = {};

            // ✅ Handle backend error messages correctly
            if (error.error === "Email not found!") {
                tempErrors.email = "This email is not registered. Please sign up.";
            } else if (error.error === "Invalid credentials") {
                tempErrors.password = "Incorrect password. Try again.";
            } else {
                tempErrors.general = "Login failed. Please try again.";
            }

            setErrors(tempErrors);
        } finally {
            setLoading(false);
        }
    };

    // ✅ Handle Sign-Up Redirect
    const handleSignupRedirect = () => {
        navigate("/");
    };

    return (
        <Container maxWidth="sm">
            <Paper elevation={3} style={{ padding: 30, marginTop: 40 }}>
                <Typography variant="h4" align="center" gutterBottom>
                    Login
                </Typography>
                <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 15 }}>

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

                    {/* ✅ Updated Password Field with Visibility Toggle */}
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

                    {/* General Form Error Message */}
                    {errors.general && <Typography color="error" align="center">{errors.general}</Typography>}

                    <Button type="submit" variant="contained" color="primary" fullWidth disabled={loading} style={{ marginTop: 15 }}>
                        {loading ? <CircularProgress size={24} color="inherit" /> : "Login"}
                    </Button>

                    {/* ✅ Sign-Up Link for New Users */}
                    <Typography align="center" style={{ marginTop: 10 }}>
                        Don't have an account?{" "}
                        <Button 
                            color="primary" 
                            style={{ fontWeight: "bold", textTransform: "none" }} 
                            onClick={handleSignupRedirect}
                        >
                            Sign up here
                        </Button>
                    </Typography>
                </form>
            </Paper>
        </Container>
    );
};

export default Login;
