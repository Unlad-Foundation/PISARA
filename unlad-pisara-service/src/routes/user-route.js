const express = require("express");
const router = express.Router();
const validateToken = require("../middleware/validate-token-handler");
const { registerUser, getUser, updateUser, deleteUser, getUsers, loginUser, currentUser } = require("../services/user-service");

router.route("/users/register").post(registerUser);
router.route("/users/:id").get(validateToken, getUser).put(validateToken, updateUser).delete(validateToken, deleteUser);
router.route("/users/login").post(loginUser);
router.route("/users").get(getUsers);
router.route("/current").get(validateToken, currentUser).post(validateToken, currentUser);

module.exports = router;
