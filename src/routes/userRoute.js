const express = require('express');
const router = express.Router();
const userService = require('../services/userService');
const { API_ENDPOINTS } = require('../config/endpointsConfig');

router.route(API_ENDPOINTS.USER.GET).get(userService.getUsers);
router.route(API_ENDPOINTS.USER.POST).post(userService.registerUser);
router.route(API_ENDPOINTS.USER.GET_BY_ID).get(userService.getUser);
router.route(API_ENDPOINTS.USER.PUT).put(userService.updateUser);
router.route(API_ENDPOINTS.USER.DELETE).delete(userService.deleteUser);
router.route(API_ENDPOINTS.USER.LOGIN).post(userService.loginUser);
router.route(API_ENDPOINTS.USER.CHECKLOGIN).get(userService.currentUser);

module.exports = router;
