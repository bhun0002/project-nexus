require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const connectDB = require("./database/db");
const projectRoutes = require("./routes/projectRoutes");

const app = express();

// Middleware
app.use(express.json());
app.use(cors({ origin: process.env.CORS_ORIGIN || "*" })); // Use env for CORS config

// ✅ Add this route to serve a basic response at "/"
app.get("/", (req, res) => {
    res.send("🚀 Project Nexus API is Running! Use /api/projects for requests.");
});

// Connect to MongoDB
connectDB();

// Routes
app.use("/api/projects", projectRoutes);

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, { 
    useNewUrlParser: true, 
    useUnifiedTopology: true 
})
.then(() => console.log("✅ Connected to MongoDB"))
.catch(err => console.error("❌ MongoDB Connection Error:", err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});
console.log("DEBUG: MONGO_URI =", process.env.MONGO_URI); // Debugging Line