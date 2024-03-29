const asyncHandler = require("express-async-handler");
const Project = require("../models/projects-model");
const { trimAll } = require("../config/common-config");

//*Get all Projects, access private
const getProjects = asyncHandler(async (req, res) => {
  try {
    const projects = await Project.find({ createdBy: req.user.id }).populate({
      path: "members.user_id",
      select: "firstname lastname email role",
    })
      .populate({
        path: "createdBy",
        select: "firstname lastname role",
      })
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
    project_name,
    description,
    start_date,
    end_date,
    stages = [],
    tasks = [],
    members = [],
  } = trimmedBody;

  try {
    if (!project_name || !description || !start_date || !end_date) {
      throw new Error("Please provide all required project details.");
    }

    const projectAvailable = await Project.findOne({ project_name });
    if (projectAvailable) {
      throw new Error("Project with that name already exists!");
    }

    const project = await Project.create({
      project_name,
      description,
      start_date,
      end_date,
      stages,
      tasks,
      createdBy: req.user.id,
      members: members.map((userId) => ({ user_id: userId, is_active: true })),
    });

    res.status(201).json(project);
  } catch (error) {
    res.status(404);
    throw error;
  }
});

//*Add a member in Project, access private
const addMemberToProject = asyncHandler(async (req, res) => {
  const { user_id } = req.body;
  const { project_id } = req.params;
  try {
    let project = await Project.findById(project_id);
    if (!project) {
      res.status(404).json({ message: "Project not found" });
      return;
    }

    await project.addMember(user_id);
    project = await Project.findById(project_id).populate({
      path: "members.user_id",
      select: "firstname lastname email role",
    });
    res.status(200).json(project);
  } catch (error) {
    if (error.message === "Member already exists in the project") {
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
    project_name,
    description,
    start_date,
    end_date,
    stages = [],
    tasks = [],
  } = trimmedBody;

  try {
    const updatedProject = await Project.findByIdAndUpdate(
      req.params.id,
      {
        project_name,
        description,
        start_date,
        end_date,
        stages,
        tasks,
      },
      {
        new: true,
      }
    ).populate({
      path: "members.user_id",
      select: "firstname lastname email role",
    });

    if (!updatedProject) {
      throw new Error("Project not found");
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
      throw new Error("Project not found");
    }
    res.status(200).json({ message: "Project deleted successfully" });
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
