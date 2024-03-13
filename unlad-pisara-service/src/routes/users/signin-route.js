const express = require("express");
const router = express.Router();
const { currentUser, loginUser, getUsers } = require("../../controllers/users/signin-controller");
const validateToken = require("../../middleware/validate-token-handler");

router.route("/users/login").post(loginUser);
router.route("/users").get(getUsers);
router.route("/current").get(validateToken, currentUser).post(validateToken, currentUser);

module.exports = router;
