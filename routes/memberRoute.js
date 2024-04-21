const express = require('express');
const router = express.Router();
const { body, param, validationResult } = require('express-validator');
const memberService = require('../services/memberService');
const { API_ENDPOINTS } = require('../config/endpointsConfig');
const { constants } = require('../config/constantsConfig');

router.route(API_ENDPOINTS.MEMBER.GET_BY_ID).get(getProjectMembers);
router.route(API_ENDPOINTS.MEMBER.DEACTIVATE).put(deactivateMember);
router.route(API_ENDPOINTS.MEMBER.ACTIVATE).put(activateMember);

module.exports = router;

/*
 * @desc   Get members of a project
 * @route  GET /api/member/:projectId
 * @access Private
 */
async function getProjectMembers(req, res, next) {
  await param(constants.VALIDATION.PROJECT.PARAM.PROJECT_ID)
    .isMongoId()
    .withMessage(constants.ERROR.PROJECT.INVALID_ID)
    .run(req);

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  memberService.getProjectMembers(req, res, next);
}

/*
 * @desc   Deactivate members of a project
 * @route  PUT /api/member/deactivate
 * @access Private
 */
async function deactivateMember(req, res, next) {
  await Promise.all([
    body(constants.VALIDATION.PROJECT.PROJECT_ID)
      .notEmpty()
      .withMessage(constants.ERROR.PROJECT.INVALID_ID)
      .run(req),
    body(constants.VALIDATION.PROJECT.ADD_MEMBER)
      .notEmpty()
      .withMessage(constants.ERROR.PROJECT.INVALID_USER_ID)
      .run(req),
  ]);

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  memberService.deactivateMember(req, res, next);
}

/*
 * @desc   Activate members of a project
 * @route  PUT /api/member/activate
 * @access Private
 */
async function activateMember(req, res, next) {
  await Promise.all([
    body(constants.VALIDATION.PROJECT.PROJECT_ID)
      .notEmpty()
      .withMessage(constants.ERROR.PROJECT.INVALID_ID)
      .run(req),
    body(constants.VALIDATION.PROJECT.ADD_MEMBER)
      .notEmpty()
      .withMessage(constants.ERROR.PROJECT.INVALID_USER_ID)
      .run(req),
  ]);

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  memberService.activateMember(req, res, next);
}
