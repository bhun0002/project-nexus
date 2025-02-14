const express = require("express");
const router = express.Router();
const projectController = require("../controllers/projectController");

/**
 * @route   POST /api/projects
 * @desc    Create a new project
 * @access  Public
 */
router.post("/", projectController.createProject);

/**
 * @route   GET /api/projects
 * @desc    Get all projects for a specific client (filtered by email)
 * @access  Public
 */
router.get("/", projectController.getAllProjects);

/**
 * @route   GET /api/projects/:id
 * @desc    Get a single project by its ID
 * @access  Public
 */
router.get("/:id", projectController.getProjectById);

/**
 * @route   PUT /api/projects/:id
 * @desc    Update a project by its ID
 * @access  Public
 */
router.put("/:id", projectController.updateProject);

/**
 * @route   DELETE /api/projects/:id
 * @desc    Soft delete a project by setting `isDeleted` flag to true
 * @access  Public
 */
router.delete("/:id", projectController.deleteProject);

module.exports = router;