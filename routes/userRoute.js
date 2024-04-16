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

// validate user data
async function getUsers(req, res, next) {
  await userService.getUsers(req, res, next);
}

async function currentUser(req, res, next) {
  await userService.currentUser(req, res, next);
}

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

module.exports = router;
