const express = require("express");
const router = express.Router();
const {
  deactivateMember,
  activateMember,
  getProjectMembers,
} = require("../services/members-service");
const { API_ENDPOINTS } = require("../config/endpoints-config");

router.use(require("../middleware/validate-token-handler"));
router.route(API_ENDPOINTS.MEMBER.GET_BY_ID).get(getProjectMembers);
router.route(API_ENDPOINTS.MEMBER.PUT_DEACTIVATE).put(deactivateMember);
router.route(API_ENDPOINTS.MEMBER.PUT_ACTIVATE).put(activateMember);

module.exports = router;
