const express = require('express');
const router = express.Router();
const {
  createProject,
  getProjects,
  updateProject,
  deleteProject,
  addMemberToProject,
} = require('../services/projectService');
const { API_ENDPOINTS } = require('../config/endpointsConfig');

router.route(API_ENDPOINTS.PROJECT.GET).get(getProjects);
router.route(API_ENDPOINTS.PROJECT.POST).post(createProject);
router.route(API_ENDPOINTS.PROJECT.PUT).put(updateProject);
router.route(API_ENDPOINTS.PROJECT.DELETE).delete(deleteProject);
router.route(API_ENDPOINTS.MEMBER.POST).post(addMemberToProject);

module.exports = router;
