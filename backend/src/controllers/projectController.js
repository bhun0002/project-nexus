
const Project = require("../models/project"); // ✅ Ensure correct case

// Create a new project
exports.createProject = async (req, res) => {
    try {
        const newProject = new Project(req.body);
        const savedProject = await newProject.save();
        res.status(201).json(savedProject);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Get all projects (Only active projects, sorted by newest first)
// exports.getAllProjects = async (req, res) => {
//     try {
//         const projects = await Project.find({ isDeleted: false });
//         res.json(projects);
//     } catch (err) {
//         res.status(500).json({ error: err.message });
//     }
// };

exports.getAllProjects = async (req, res) => {
    try {
        const projects = await Project.find({
            $or: [{ isDeleted: false }, { isDeleted: { $exists: false } }]
        }).sort({ createdAt: -1 });

        res.json(projects);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

//  Fetch single project by ID
exports.getProjectById = async (req, res) => {
    try {
        const project = await Project.findOne({ _id: req.params.id, isDeleted: false });  // ✅ Exclude deleted projects
        if (!project) {
            return res.status(404).json({ error: "Project not found" });
        }
        res.status(200).json(project);
    } catch (error) {
        console.error("Error fetching project:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

// Update a project by ID
exports.updateProject = async (req, res) => {
    try {
        const updatedProject = await Project.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedProject) return res.status(404).json({ error: "Project not found" });
        res.json(updatedProject);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Delete a project by ID
exports.deleteProject = async (req, res) => {
    try {
        const deletedProject = await Project.findByIdAndDelete(req.params.id);
        if (!deletedProject) return res.status(404).json({ error: "Project not found" });
        res.json({ message: "Project deleted successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
