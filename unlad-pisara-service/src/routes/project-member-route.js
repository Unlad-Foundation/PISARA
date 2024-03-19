const express = require('express');
const router = express.Router();
const { deactivateMember, activateMember, getProjectMembers } = require("../services/project-member-service");
const { API_ENDPOINTS } = require("../config/endpoints-config");

router.use(require("../middleware/validate-token-handler"));
router.route(API_ENDPOINTS.PROJECT_MEMBER.GET).get(getProjectMembers);
// router.route("").post(deactivateMember);
// router.route("").post(activateMember);

module.exports = router;