const asyncHandler = require("express-async-handler");
const Project = require("../models/projects-model");

//* Get project members, access private
const getProjectMembers = asyncHandler(async (req, res) => {
  const { projectId } = req.params;
  try {
    const project = await Project.findById(projectId).populate({
      path: "members.userId",
      select: "firstname lastname email role",
    });
    if (!project) return res.status(404).json({ message: "Project not found" });

    res.status(200).json(project.members);
  } catch (error) {
    res.status(404);
    throw error;
  }
});

//* Deactivate a member, access private
const deactivateMember = asyncHandler(async (req, res) => {
  const { projectId, userId } = req.body;
  try {
    const project = await Project.findById(projectId);
    if (!project) return res.status(404).json({ message: "Project not found" });

    const member = project.members.find((member) =>
      member.userId.equals(userId)
    );
    if (!member) return res.status(404).json({ message: "Member not found" });

    member.isActive = false;
    await project.save();
    res.status(200).json({ message: "Member deactivated" });
  } catch (error) {
    res.status(404);
    throw error;
  }
});

//* Activate a member, access private
const activateMember = asyncHandler(async (req, res) => {
  const { projectId, userId } = req.body;
  try {
    const project = await Project.findById(projectId);
    if (!project) return res.status(404).json({ message: "Project not found" });

    const member = project.members.find((member) =>
      member.userId.equals(userId)
    );
    if (!member) return res.status(404).json({ message: "Member not found" });

    member.isActive = true;
    await project.save();
    res.status(200).json({ message: "Member activated" });
  } catch (error) {
    res.status(404);
    throw error;
  }
});

module.exports = { deactivateMember, activateMember, getProjectMembers };
