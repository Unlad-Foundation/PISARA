const Project = require('../models/projectModel');
const { constants } = require('../config/constantsConfig');

const memberRepository = {
  getProjectMembers: getProjectMembers,
  findById: findById,
};

module.exports = memberRepository;

async function getProjectMembers(id) {
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

async function findById(id) {
  try {
    return await Project.findById(id);
  } catch (error) {
    return error;
  }
}
