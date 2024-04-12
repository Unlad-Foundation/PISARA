const Project = require('../models/projectModel');

const projectRepository = {
  getProjects: getProjects,
};

module.exports = projectRepository;

async function getProjects(id) {
  try {
    return await Project.find({ createdBy: id })
      .populate({
        path: 'members.userId',
        select: 'firstname lastname email role',
      })
      .populate({
        path: 'createdBy',
        select: 'firstname lastname role',
      });
  } catch (error) {
    return error;
  }
}
