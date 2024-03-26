const express = require("express");
const router = express.Router();
const validateToken = require("../middleware/validate-token-handler");
const { registerUser, getUser, updateUser, deleteUser, getUsers, loginUser, currentUser } = require("../services/user-service");
const { API_ENDPOINTS } = require("../config/endpoints-config");

router.route(API_ENDPOINTS.USER_REGISTER.GET).get(getUsers);
router.route(API_ENDPOINTS.USER_REGISTER.POST).post(registerUser);
router.route(API_ENDPOINTS.USER_REGISTER.GET_UPDATE_DELETE_BY_ID).get(validateToken, getUser).put(validateToken, updateUser).delete(validateToken, deleteUser);
router.route(API_ENDPOINTS.USER_LOGIN.POST).post(loginUser);
router.route(API_ENDPOINTS.USER_LOGIN.GET).get(validateToken, currentUser).post(validateToken, currentUser);

module.exports = router;
