const express = require("express");
const router = express.Router();
const validateToken = require("../middleware/validate-token-handler");
const { registerUser, getUser, updateUser, deleteUser, } = require("../../controllers/users/signup-controller");

router.route("/users/register").post(registerUser);
router.route("/users/:id").get(validateToken, getUser).put(validateToken, updateUser).delete(validateToken, deleteUser);

module.exports = router;
