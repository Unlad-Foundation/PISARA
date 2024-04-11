const express = require('express');
const router = express.Router();
const {
  createProject,
  getProjects,
  updateProject,
  deleteProject,
  addMemberToProject,
} = require('../services/projects-service');
const { API_ENDPOINTS } = require('../config/endpoints-config');

router.route(API_ENDPOINTS.PROJECT.GET_BY_ID).get(getProjects);
router.route(API_ENDPOINTS.PROJECT.POST).post(createProject);
router.route(API_ENDPOINTS.PROJECT.PUT).put(updateProject);
router.route(API_ENDPOINTS.PROJECT.DELETE).delete(deleteProject);
router.route(API_ENDPOINTS.MEMBER).post(addMemberToProject);

module.exports = router;
