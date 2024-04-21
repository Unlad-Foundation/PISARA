const express = require('express');
const router = express.Router();
const userService = require('../services/userService');
const { constants } = require('../config/constantsConfig');
const { API_ENDPOINTS } = require('../config/endpointsConfig');
const { body, param, validationResult } = require('express-validator');

router.route(API_ENDPOINTS.USER.GET).get(getUsers);
router.route(API_ENDPOINTS.USER.POST).post(registerUser);
router.route(API_ENDPOINTS.USER.GET_BY_ID).get(getUser);
router.route(API_ENDPOINTS.USER.PUT).put(updateUser);
router.route(API_ENDPOINTS.USER.DELETE).delete(deleteUser);
router.route(API_ENDPOINTS.USER.LOGIN).post(loginUser);
router.route(API_ENDPOINTS.USER.CHECKLOGIN).get(currentUser);

/*
 * @desc   Get user
 * @route  GET /api/user/:id
 * @access Private
 */
async function getUser(req, res, next) {
  await param(constants.VALIDATION.USER.ID)
    .isMongoId()
    .withMessage(constants.ERROR.USER.INVALID_ID)
    .run(req);

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  userService.getUser(req, res, next);
}

/*
 * @desc   Create user
 * @route  POST /api/user/create
 * @access Public
 */
async function registerUser(req, res, next) {
  await Promise.all([
    body(constants.VALIDATION.USER.EMAIL)
      .isEmail()
      .withMessage(constants.ERROR.USER.INVALID_EMAIL)
      .run(req),
    body(constants.VALIDATION.USER.EMAIL, constants.VALIDATION.USER.PASSWORD)
      .notEmpty()
      .withMessage(constants.ERROR.USER.REQUIRED_FIELDS)
      .run(req),
  ]);

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  userService.registerUser(req, res, next);
}

/*
 * @desc   Update user
 * @route  PUT /api/user/update
 * @access Private
 */
async function updateUser(req, res, next) {
  await Promise.all([
    body(constants.VALIDATION.USER.EMAIL)
      .isEmail()
      .withMessage(constants.ERROR.USER.INVALID_EMAIL)
      .run(req),
    body(constants.VALIDATION.USER.EMAIL, constants.VALIDATION.USER.PASSWORD)
      .notEmpty()
      .withMessage(constants.ERROR.USER.REQUIRED_FIELDS)
      .run(req),
  ]);

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  userService.updateUser(req, res, next);
}

/*
 * @desc   Remove user
 * @route  DELETE /api/user/remove
 * @access Private
 */
async function deleteUser(req, res, next) {
  await param(constants.VALIDATION.USER.ID)
    .isMongoId()
    .withMessage(constants.ERROR.USER.INVALID_ID)
    .run(req);

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  userService.deleteUser(req, res, next);
}

/*
 * @desc   Login user
 * @route  DELETE /api/user/login
 * @access Public
 */
async function loginUser(req, res, next) {
  await Promise.all([
    body(constants.VALIDATION.USER.EMAIL)
      .isEmail()
      .withMessage(constants.ERROR.USER.INVALID_EMAIL)
      .run(req),
    body(constants.VALIDATION.USER.EMAIL, constants.VALIDATION.USER.PASSWORD)
      .notEmpty()
      .withMessage(constants.ERROR.USER.REQUIRED_FIELDS)
      .run(req),
  ]);

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  userService.loginUser(req, res, next);
}

/*
 * @desc   Get all user
 * @route  GET /api/user/get/all
 * @access Public
 */
async function getUsers(req, res, next) {
  await userService.getUsers(req, res, next);
}

/*
 * @desc   Check login
 * @route  GET /api/user/login
 * @access Private
 */
async function currentUser(req, res, next) {
  await userService.currentUser(req, res, next);
}

module.exports = router;
