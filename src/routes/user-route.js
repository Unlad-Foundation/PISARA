const express = require("express");
const router = express.Router();
const validateToken = require("../middleware/validate-token-handler");
const userService = require("../services/user-service");
const { API_ENDPOINTS } = require("../config/endpoints-config");

router.route(API_ENDPOINTS.USER.REGISTER.GET).get(userService.getUser);
router.route(API_ENDPOINTS.USER.REGISTER.POST).post(userService.registerUser);
router.route(API_ENDPOINTS.USER.REGISTER.GET_BY_ID).get(validateToken, userService.getUser);
router.route(API_ENDPOINTS.USER.REGISTER.PUT).put(validateToken, userService.updateUser);
router
  .route(API_ENDPOINTS.USER.REGISTER.DELETE)
  .delete(validateToken, userService.deleteUser);
router.route(API_ENDPOINTS.USER.LOGIN.POST).post(userService.loginUser);
router.route(API_ENDPOINTS.USER.LOGIN.GET).get(validateToken, userService.currentUser);

module.exports = router;
