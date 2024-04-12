const express = require('express');
const router = express.Router();
const {
  deactivateMember,
  activateMember,
  getProjectMembers,
} = require('../services/memberService');
const { API_ENDPOINTS } = require('../config/endpointsConfig');

router.route(API_ENDPOINTS.MEMBER.GET_BY_ID).get(getProjectMembers);
router.route(API_ENDPOINTS.MEMBER.DEACTIVATE).put(deactivateMember);
router.route(API_ENDPOINTS.MEMBER.ACTIVATE).put(activateMember);

module.exports = router;
