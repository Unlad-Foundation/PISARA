const express = require('express');
const router = express.Router();
const memberService = require('../services/memberService');
const { API_ENDPOINTS } = require('../config/endpointsConfig');

router.route(API_ENDPOINTS.MEMBER.GET_BY_ID).get(memberService.getProjectMembers);
router.route(API_ENDPOINTS.MEMBER.DEACTIVATE).put(memberService.deactivateMember);
router.route(API_ENDPOINTS.MEMBER.ACTIVATE).put(memberService.activateMember);

module.exports = router;
