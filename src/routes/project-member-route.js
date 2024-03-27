const express = require('express');
const router = express.Router();
const validateToken = require("../middleware/validate-token-handler");
const { deactivateMember, activateMember, getProjectMembers } = require("../services/project-member-service");
const { API_ENDPOINTS } = require("../config/endpoints-config");

router.route(API_ENDPOINTS.PROJECT_MEMBER.GET).get(validateToken, getProjectMembers);
// router.route("").post(deactivateMember);
// router.route("").post(activateMember);

module.exports = router;