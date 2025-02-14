const Project = require("../models/project"); // ✅ Ensure correct case for model import

/**
 * @desc    Create a new project
 * @route   POST /api/projects
 * @access  Public
 */
exports.createProject = async (req, res) => {
    try {
        const newProject = new Project(req.body);
        const savedProject = await newProject.save();
        res.status(201).json(savedProject);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

/**
 * @desc    Fetch all projects for a logged-in client (filtered by email)
 * @route   GET /api/projects?email=client@example.com
 * @access  Public
 */
exports.getAllProjects = async (req, res) => {
    try {
        // ✅ Extract email from query parameters
        const clientEmail = req.query.email;

        // ✅ Ensure email is provided; otherwise, return an unauthorized error
        if (!clientEmail) {
            return res.status(401).json({ error: "Unauthorized: Client email is required." });
        }

        // ✅ Query the database for projects matching the client's email and not deleted
        const projects = await Project.find({
            clientEmail: clientEmail, // ✅ Ensure filtering is done by client email
            $or: [{ isDeleted: false }, { isDeleted: { $exists: false } }] // ✅ Exclude deleted projects
        }).sort({ createdAt: -1 });

        // ✅ Return the filtered projects as JSON
        res.json(projects);
    } catch (err) {
        console.error("❌ Error fetching projects:", err);
        res.status(500).json({ error: err.message });
    }
};


/**
 * @desc    Fetch a single project by its ID
 * @route   GET /api/projects/:id
 * @access  Public
 */
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

/**
 * @desc    Update an existing project by ID
 * @route   PUT /api/projects/:id
 * @access  Public
 */
exports.updateProject = async (req, res) => {
    try {
        const updatedProject = await Project.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedProject) return res.status(404).json({ error: "Project not found" });
        res.json(updatedProject);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


/**
 * @desc    Soft delete a project by marking `isDeleted` as true
 * @route   DELETE /api/projects/:id
 * @access  Public
 */
exports.deleteProject = async (req, res) => {
    try {
        const project = await Project.findByIdAndUpdate(
            req.params.id,
            { isDeleted: true }, // ✅ Instead of deleting, update the `isDeleted` flag
            { new: true } // ✅ Return the updated document
        );

        if (!project) {
            return res.status(404).json({ error: "Project not found" });
        }

        res.json({ message: "Project marked as deleted" });
    } catch (error) {
        console.error("❌ Error deleting project:", error);
        res.status(500).json({ error: "Error deleting project" });
    }
}; 

// // Delete a project by ID
// exports.deleteProject = async (req, res) => {
//     try {
//         const deletedProject = await Project.findByIdAndDelete(req.params.id);
//         if (!deletedProject) return res.status(404).json({ error: "Project not found" });
//         res.json({ message: "Project deleted successfully" });
//     } catch (err) {
//         res.status(500).json({ error: err.message });
//     }
// };
