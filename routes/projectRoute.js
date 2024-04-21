const express = require('express');
const router = express.Router();
const { body, param, validationResult } = require('express-validator');
const { constants } = require('../config/constantsConfig');
const projectService = require('../services/projectService');
const { API_ENDPOINTS } = require('../config/endpointsConfig');

router.route(API_ENDPOINTS.PROJECT.GET).get(getProjects);
router.route(API_ENDPOINTS.PROJECT.POST).post(createProject);
router.route(API_ENDPOINTS.PROJECT.PUT).put(updateProject);
router.route(API_ENDPOINTS.PROJECT.DELETE).delete(deletedProject);
router.route(API_ENDPOINTS.MEMBER.POST).post(addMemberToProject);

module.exports = router;

/*
 * @desc   Create project
 * @route  POST /api/project/create
 * @access Private
 */
async function createProject(req, res, next) {
  await body(constants.VALIDATION.PROJECT.PROJECT_NAME)
    .notEmpty()
    .withMessage(constants.ERROR.PROJECT.REQUIRED_FIELDS)
    .run(req);

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  projectService.createProject(req, res, next);
}

/*
 * @desc   Update project
 * @route  POST /api/project/update
 * @access Private
 */
async function updateProject(req, res, next) {
  await Promise.all([
    body(constants.VALIDATION.PROJECT.PROJECT_NAME)
      .notEmpty()
      .withMessage(constants.ERROR.PROJECT.REQUIRED_FIELDS)
      .run(req),
    body(constants.VALIDATION.PROJECT.PROJECT_ID)
      .notEmpty()
      .withMessage(constants.ERROR.PROJECT.INVALID_ID)
      .run(req),
  ]);

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  projectService.updateProject(req, res, next);
}

/*
 * @desc   Remove projects
 * @route  DELETE /api/project/remove
 * @access Private
 */
async function deletedProject(req, res, next) {
  await param(constants.VALIDATION.PROJECT.ID)
    .isMongoId()
    .withMessage(constants.ERROR.PROJECT.INVALID_ID)
    .run(req);

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  projectService.deleteProject(req, res, next);
}

/*
 * @desc   Add member to project
 * @route  POST /api/member/adduser
 * @access Private
 */
async function addMemberToProject(req, res, next) {
  await Promise.all([
    body(constants.VALIDATION.PROJECT.ADD_MEMBER)
      .notEmpty()
      .withMessage(constants.ERROR.PROJECT.INVALID_USER_ID)
      .run(req),
    body(constants.VALIDATION.PROJECT.PROJECT_ID)
      .notEmpty()
      .withMessage(constants.ERROR.PROJECT.INVALID_ID)
      .run(req),
  ]);

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  projectService.addMemberToProject(req, res, next);
}

/*
 * @desc   Get projects
 * @route  GET /api/project/:id
 * @access Private
 */
async function getProjects(req, res, next) {
  await projectService.getProjects(req, res, next);
}
