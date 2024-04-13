const Project = require('../models/projectModel');
const { constants } = require('../config/constantsConfig');

const projectRepository = {
  getProjects: getProjects,
  findOne: findOne,
  createProject: createProject,
  findById: findById,
  updateProject: updateProject,
  deleteProject: deleteProject,
  addMember: addMember,
};

module.exports = projectRepository;

async function getProjects(id) {
  try {
    return await Project.find({ createdBy: id })
      .populate({
        path: constants.POPULATE.PROJECT.PATH,
        select: constants.POPULATE.PROJECT.SELECT,
      })
      .populate({
        path: constants.POPULATE.USER.PATH,
        select: constants.POPULATE.USER.SELECT,
      })
      .lean()
      .exec();
  } catch (error) {
    return error;
  }
}

async function findOne(name) {
  try {
    return await Project.findOne({ projectName: name }).lean().exec();
  } catch (error) {
    return error;
  }
}

async function createProject(params) {
  try {
    return await Project.create(params);
  } catch (error) {
    return error;
  }
}

async function findById(id) {
  try {
    return await Project.findById(id).lean().exec();
  } catch (error) {
    return error;
  }
}

async function addMember(id) {
  try {
    return await Project.findById(id)
      .populate({
        path: constants.POPULATE.PROJECT.PATH,
        select: constants.POPULATE.PROJECT.SELECT,
      })
      .lean()
      .exec();
  } catch (error) {
    return error;
  }
}

async function updateProject(id, params) {
  try {
    return await Project.findByIdAndUpdate(id, params, { new: true })
      .populate({
        path: constants.POPULATE.PROJECT.PATH,
        select: constants.POPULATE.PROJECT.SELECT,
      })
      .lean()
      .exec();
  } catch (error) {
    return error;
  }
}

async function deleteProject(id) {
  try {
    return await Project.findByIdAndDelete(id).lean().exec();
  } catch (error) {
    return error;
  }
}
