const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema({
  clientName: { type: String, required: true },
  clientEmail: { type: String, required: true },
  clientCompany: { type: String, required: true },
  projectName: { type: String, required: true },
  projectDescription: { type: String, required: true },
  timeCommitment: { type: String, required: true },
  purchasingRequired: { type: String, required: true },
  ndaRequired: { type: String, required: true },
  showcaseApproval: { type: String, required: true },
  semester: { type: String, required: true }
}, { timestamps: true }); // ✅ Adds createdAt and updatedAt

module.exports = mongoose.model("Project", projectSchema);
