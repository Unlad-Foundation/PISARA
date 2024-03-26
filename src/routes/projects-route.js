const express = require("express");
const router = express.Router();
const { createProject, getProjects, updateProject, deleteProject, addMemberToProject } = require("../services/projects-service");
const { API_ENDPOINTS } = require("../config/endpoints-config");

router.use(require("../middleware/validate-token-handler"));
router.route(API_ENDPOINTS.PROJECT.GET).get(getProjects);
router.route(API_ENDPOINTS.PROJECT.POST).post(createProject);
router.route(API_ENDPOINTS.PROJECT.GET_UPDATE_DELETE_BY_ID).put(updateProject).delete(deleteProject);
router.route(API_ENDPOINTS.PROJECT.ADD_MEMBER).post(addMemberToProject);

module.exports = router;
