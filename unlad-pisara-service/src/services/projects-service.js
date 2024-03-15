const asyncHandler = require("express-async-handler");
const Project = require("../models/projects-model");
const { trimAll } = require("../config/common-config")

//*Get all Projects, access private
const getProjects = asyncHandler(async (req, res) => {
  try {
    const projects = await Project.find({ user_id: req.user.id });
    res.status(200).json(projects);
  } catch (error) {
    res.status(404);
    throw error;
  }
});

//*Create Project, access private
const createProject = asyncHandler(async (req, res) => {
  const trimmedBody = trimAll(req.body);
  const { project_name, description, start_date, end_date, stages = [], tasks = [] } = trimmedBody;

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
      user_id: req.user.id,
    });

    res.status(201).json(project);
  } catch (error) {
    res.status(404);
    throw error;
  }
});

//*Update a Project, access private
const updateProject = asyncHandler(async (req, res) => {
  const trimmedBody = trimAll(req.body);
  const { project_name, description, start_date, end_date, stages = [], tasks = [] } = trimmedBody;

  try {
    if (!project_name || !description || !start_date || !end_date) {
      throw new Error("Please provide all required project details.");
    }

    const updatedProject = await Project.findByIdAndUpdate(req.params.id, {
      project_name,
      description,
      start_date,
      end_date,
      stages,
      tasks,
    }, {
      new: true,
    })

    if (!updatedProject) {
      throw new Error("Project not found");
    }
    res.status(200).json({ message: "Project updated successfully" });;
  } catch (error) {
    res.status(404);
    throw error;
  }
})

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
})

module.exports = { getProjects, createProject, updateProject, deleteProject };
