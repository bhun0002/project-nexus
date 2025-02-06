const express = require("express");
const router = express.Router();
const projectController = require("../controllers/projectController");

// Create a new project
router.post("/", projectController.createProject);

// Get all projects
router.get("/", projectController.getAllProjects);

// // Get all projects sorted by newest first
// router.get("/", async (req, res) => {
//     try {
//         const projects = await Project.find().sort({ createdAt: -1 }); // Sort by newest first
//         res.json(projects);
//     } catch (error) {
//         res.status(500).json({ error: "Error fetching projects" });
//     }
// });

// Get a single project by ID
router.get("/:id", projectController.getProjectById);

// Update a project by ID
router.put("/:id", projectController.updateProject);

// Delete a project by ID
router.delete("/:id", projectController.deleteProject);

module.exports = router;
