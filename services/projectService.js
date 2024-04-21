const projectRepository = require('../repository/projectRepository');
const { trimAll } = require('../config/commonConfig');
const { constants } = require('../config/constantsConfig');

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
    const projectAvailable = await projectRepository.findOne(projectName);
    if (projectAvailable) {
      return res.status(400).json({ message: constants.ERROR.PROJECT.ALREADY_EXISTS });
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
    res.status(201).json({ message: constants.SUCCESS.PROJECT.CREATE, project });
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
      return res.status(404).json({ message: constants.ERROR.PROJECT.NOT_FOUND });
    }

    const isMemberAlready = project.members.some((member) => member.userId.equals(userId));
    if (isMemberAlready) {
      return res.status(400).json({ message: constants.ERROR.PROJECT.MEMBER_EXISTS });
    }

    project.members.push({ userId: userId, isActive: true });

    const updatedProject = await projectRepository.updateProject(projectId, {
      members: project.members,
    });

    res.status(200).json(updatedProject);
  } catch (error) {
    return res.status(500).json({ message: error.message });
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
      return res.status(404).json({ message: constants.ERROR.PROJECT.NOT_FOUND });
    }

    res.status(200).json({ updatedProject });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

async function deleteProject(req, res) {
  try {
    const deletedProject = await projectRepository.deleteProject(req.params.id);
    if (!deletedProject) {
      return res.status(404).json({ message: constants.ERROR.PROJECT.NOT_FOUND });
    }
    res.status(200).json({ message: constants.SUCCESS.PROJECT.DELETE });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}
