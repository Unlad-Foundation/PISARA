const express = require("express");
const router = express.Router();
const validateToken = require("../middleware/validate-token-handler");
const {
  registerUser,
  getUser,
  updateUser,
  deleteUser,
  getUsers,
  loginUser,
  currentUser,
} = require("../services/user-service");
const { API_ENDPOINTS } = require("../config/endpoints-config");

router.route(API_ENDPOINTS.USER.REGISTER.GET).get(getUsers);
router.route(API_ENDPOINTS.USER.REGISTER.POST).post(registerUser);
router.route(API_ENDPOINTS.USER.REGISTER.GET_BY_ID).get(validateToken, getUser);
router.route(API_ENDPOINTS.USER.REGISTER.PUT).put(validateToken, updateUser);
router
  .route(API_ENDPOINTS.USER.REGISTER.DELETE)
  .delete(validateToken, deleteUser);
router.route(API_ENDPOINTS.USER.LOGIN.POST).post(loginUser);
router.route(API_ENDPOINTS.USER.LOGIN.GET).get(validateToken, currentUser);

module.exports = router;
