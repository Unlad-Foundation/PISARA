const asyncHandler = require('express-async-handler');
const Project = require('../models/projectModel');

const getProjectMembers = asyncHandler(async (req, res) => {
  const { projectId } = req.params;
  try {
    const project = await Project.findById(projectId).populate({
      path: 'members.userId',
      select: 'firstname lastname email role',
    });
    if (!project) return res.status(404).json({ message: 'Project not found' });

    res.status(200).json(project.members);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

const deactivateMember = asyncHandler(async (req, res) => {
  const { projectId, userId } = req.body;
  try {
    const project = await Project.findById(projectId);
    if (!project) return res.status(404).json({ message: 'Project not found' });

    const member = project.members.find((member) => member.userId.equals(userId));
    if (!member) return res.status(404).json({ message: 'Member not found' });

    member.isActive = false;
    await project.save();
    res.status(200).json({ message: 'Member deactivated' });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

const activateMember = asyncHandler(async (req, res) => {
  const { projectId, userId } = req.body;
  try {
    const project = await Project.findById(projectId);
    if (!project) return res.status(404).json({ message: 'Project not found' });

    const member = project.members.find((member) => member.userId.equals(userId));
    if (!member) return res.status(404).json({ message: 'Member not found' });

    member.isActive = true;
    await project.save();
    res.status(200).json({ message: 'Member activated' });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

module.exports = { deactivateMember, activateMember, getProjectMembers };