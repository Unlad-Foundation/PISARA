const Project = require('../models/projectModel');

const memberRepository = {
  getProjectMembers: getProjectMembers,
  findById: findById,
};

module.exports = memberRepository;

async function getProjectMembers(id) {
  try {
    return await Project.findById(id)
      .populate({
        path: 'members.userId',
        select: 'firstname lastname email role',
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
