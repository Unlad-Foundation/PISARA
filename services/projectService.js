const asyncHandler = require('express-async-handler');
const Project = require('../models/projectModel');
const { trimAll } = require('../config/commonConfig');

const getProjects = asyncHandler(async (req, res) => {
  try {
    const projects = await Project.find({ createdBy: req.user.id })
      .populate({
        path: 'members.userId',
        select: 'firstname lastname email role',
      })
      .populate({
        path: 'createdBy',
        select: 'firstname lastname role',
      });
    res.status(200).json(projects);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

const createProject = asyncHandler(async (req, res) => {
  const trimmedBody = trimAll(req.body);
  const {
    projectName,
    description,
    status,
    type,
    tags = [],
    services = [],
    startDate,
    endDate,
    image,
    members = [],
  } = trimmedBody;

  try {
    if (
      !projectName ||
      !description ||
      !status ||
      !type ||
      !tags ||
      !services ||
      !startDate ||
      !endDate
    ) {
      return res.status(400).json({ message: 'Please fill all fields' });
    }

    const projectAvailable = await Project.findOne({ projectName });
    if (projectAvailable) {
      return res.status(400).json({ message: 'Project already exists' });
    }

    const project = await Project.create({
      projectName,
      description,
      status,
      type,
      tags,
      services,
      startDate,
      endDate,
      image,
      createdBy: req.user.id,
      members: members.map((userId) => ({ userId: userId, isActive: true })),
    });

    res.status(201).json(project);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

const addMemberToProject = asyncHandler(async (req, res) => {
  const { userId } = req.body;
  const { projectId } = req.body;
  try {
    let project = await Project.findById(projectId);
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    await project.addMember(userId);
    project = await Project.findById(projectId).populate({
      path: 'members.userId',
      select: 'firstname lastname email role',
    });
    res.status(200).json(project);
  } catch (error) {
    if (error.message === 'Member already exists in the project') {
      return res.status(400).json({ message: error.message });
    } else {
      return res.status(500).json({ message: error.message });
    }
  }
});

//*Update a Project, access private
const updateProject = asyncHandler(async (req, res) => {
  const trimmedBody = trimAll(req.body);
  const {
    projectId,
    projectName,
    description,
    status,
    type,
    tags = [],
    services = [],
    startDate,
    endDate,
    image,
  } = trimmedBody;

  try {
    if (
      !projectName ||
      !description ||
      !status ||
      !type ||
      !tags ||
      !services ||
      !startDate ||
      !endDate
    ) {
      return res.status(400).json({ message: 'Please fill all fields' });
    }

    const updatedProject = await Project.findByIdAndUpdate(
      projectId,
      {
        projectName,
        description,
        status,
        type,
        tags,
        services,
        startDate,
        endDate,
        image,
      },
      {
        new: true,
      }
    ).populate({
      path: 'members.userId',
      select: 'firstname lastname email role',
    });

    if (!updatedProject) {
      return res.status(404).json({ message: 'Project not found' });
    }
    res.status(200).json(updatedProject);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

const deleteProject = asyncHandler(async (req, res) => {
  try {
    const deletedProject = await Project.findByIdAndDelete(req.params.id);
    if (!deletedProject) {
      return res.status(404).json({ message: 'Project not found' });
    }
    res.status(200).json({ message: 'Project deleted successfully' });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

module.exports = {
  getProjects,
  createProject,
  updateProject,
  deleteProject,
  addMemberToProject,
};
