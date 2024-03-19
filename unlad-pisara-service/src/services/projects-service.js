const asyncHandler = require("express-async-handler");
const Project = require("../models/projects-model");
const ProjectMember = require("../models/project-member-model");
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
  const { project_name, description, start_date, end_date, stages = [], tasks = [], members = [] } = trimmedBody;

  try {
    if (!project_name || !description || !start_date || !end_date || !members) {
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

    // add members to the project
    const memberIds = await Promise.all(members.map(async (userId) => {
      const member = await ProjectMember.create({ project_id: project._id, user_id: userId });
      return member._id;
    }));

    project.members = memberIds;
    await project.save();

    res.status(201).json(project);
  } catch (error) {
    res.status(404);
    throw error;
  }
});

//*Add a member in Project, access private
const addMemberToProject = asyncHandler(async (req, res) => {
  const { project_id, user_id } = req.body;
  try {
    const project = await Project.findById(project_id);
    if (!project) {
      res.status(404).json({ message: "Project not found" });
      return;
    }
    await project.addMember(user_id);
    res.status(200).json({ message: "Member added successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
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

module.exports = { getProjects, createProject, updateProject, deleteProject, addMemberToProject };
