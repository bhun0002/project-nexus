const express = require("express");
const router = express.Router();
const projectController = require("../controllers/projectController");
const Project = require("../models/project"); // ✅ Fix: Import Project model

// Create a new project
router.post("/", projectController.createProject);

// // Get all projects
// router.get("/", projectController.getAllProjects);

// ✅ Get all projects (Filter by client email if provided)
router.get("/", async (req, res) => {
    try {
        const { clientEmail } = req.query; // Get email from query params

        let query = {
            $or: [{ isDeleted: false }, { isDeleted: { $exists: false } }]
        };

        if (clientEmail) {
            query.clientEmail = clientEmail;  // ✅ Filter by client email if provided
        }

        const projects = await Project.find(query).sort({ createdAt: -1 });

        res.json(projects);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


// Get a single project by ID
router.get("/:id", projectController.getProjectById);

// Update a project by ID
router.put("/:id", projectController.updateProject);

// // Delete a project by ID
// router.delete("/:id", projectController.deleteProject);


router.delete("/:id", async (req, res) => {
    try {
        const project = await Project.findByIdAndUpdate(
            req.params.id,
            { isDeleted: true },  // Instead of deleting, update isDelete flag
            { new: true }  // Return updated document
        );

        if (!project) {
            return res.status(404).json({ error: "Project not found" });
        }

        res.json({ message: "Project marked as deleted" });
    } catch (error) {
        console.error("Delete error:", error);
        res.status(500).json({ error: "Error deleting project" });
    }
});

module.exports = router;
