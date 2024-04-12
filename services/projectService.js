const projectRepository = require('../repository/projectRepository');
const { trimAll } = require('../config/commonConfig');

const projectService = {
  getProjects: getProjects,
  createProject: createProject,
  addMemberToProject: addMemberToProject,
  updateProject: updateProject,
  deleteProject: deleteProject,
};

module.exports = projectService;

async function getProjects(req, res) {
  try {
    const projects = await projectRepository.getProjects(req.user.id);
    res.status(200).json(projects);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

async function createProject(req, res) {
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

    const projectAvailable = await projectRepository.findOne(projectName);
    if (projectAvailable) {
      return res.status(400).json({ message: 'Project already exists' });
    }

    const project = await projectRepository.createProject({
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
}

async function addMemberToProject(req, res) {
  const { userId } = req.body;
  const { projectId } = req.body;
  try {
    let project = await projectRepository.findById(projectId);
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    await project.addMember(userId);
    project = await projectRepository.addMember(projectId);
    res.status(200).json(project);
  } catch (error) {
    if (error.message === 'Member already exists in the project') {
      return res.status(400).json({ message: error.message });
    } else {
      return res.status(500).json({ message: error.message });
    }
  }
}

async function updateProject(req, res) {
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

    const updatedProject = await projectRepository.updateProject(projectId, {
      projectName,
      description,
      status,
      type,
      tags,
      services,
      startDate,
      endDate,
      image,
    });

    if (!updatedProject) {
      return res.status(404).json({ message: 'Project not found' });
    }
    res.status(200).json(updatedProject);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

async function deleteProject(req, res) {
  try {
    const deletedProject = await projectRepository.deleteProject(req.params.id);
    if (!deletedProject) {
      return res.status(404).json({ message: 'Project not found' });
    }
    res.status(200).json({ message: 'Project deleted successfully' });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}
