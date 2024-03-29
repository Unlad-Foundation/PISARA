const express = require('express');
const router = express.Router();
const { deactivateMember, activateMember, getProjectMembers } = require("../services/members-service");
const { API_ENDPOINTS } = require("../config/endpoints-config");

router.use(require("../middleware/validate-token-handler"))
router.route(API_ENDPOINTS.PROJECT_MEMBER.GET).get(getProjectMembers);
router.route(API_ENDPOINTS.PROJECT_MEMBER.DEACTIVATE).put(deactivateMember);
router.route(API_ENDPOINTS.PROJECT_MEMBER.ACTIVATE).put(activateMember);

module.exports = router;