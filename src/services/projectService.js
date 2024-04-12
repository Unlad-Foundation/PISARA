const asyncHandler = require('express-async-handler');
const Project = require('../models/projectModel');
const { trimAll } = require('../config/commonConfig');

//*Get all Projects, access private
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
    res.status(404);
    throw error;
  }
});

//*Create Project, access private
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
      throw new Error('Please provide all required project details.');
    }

    const projectAvailable = await Project.findOne({ projectName });
    if (projectAvailable) {
      throw new Error('Project with that name already exists!');
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
    res.status(404);
    throw error;
  }
});

//*Add a member in Project, access private
const addMemberToProject = asyncHandler(async (req, res) => {
  const { userId } = req.body;
  const { projectId } = req.body;
  try {
    let project = await Project.findById(projectId);
    if (!project) {
      res.status(404).json({ message: 'Project not found' });
      return;
    }

    await project.addMember(userId);
    project = await Project.findById(projectId).populate({
      path: 'members.userId',
      select: 'firstname lastname email role',
    });
    res.status(200).json(project);
  } catch (error) {
    if (error.message === 'Member already exists in the project') {
      res.status(400).json({ message: error.message });
    } else {
      res.status(500).json({ message: error.message });
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
      throw new Error('Project not found');
    }
    res.status(200).json(updatedProject);
  } catch (error) {
    res.status(404);
    throw error;
  }
});

//*Delete a Project, access private
const deleteProject = asyncHandler(async (req, res) => {
  try {
    const deletedProject = await Project.findByIdAndDelete(req.params.id);
    if (!deletedProject) {
      throw new Error('Project not found');
    }
    res.status(200).json({ message: 'Project deleted successfully' });
  } catch (error) {
    res.status(400);
    throw error;
  }
});

module.exports = {
  getProjects,
  createProject,
  updateProject,
  deleteProject,
  addMemberToProject,
};
