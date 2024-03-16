const express = require('express');
const router = express.Router();
const { deactivateMember, activateMember, getProjectMembers } = require("../services/project-member-service")

router.use(require("../middleware/validate-token-handler"));
router.route("/:project_id").get(getProjectMembers);
// router.route("").post(deactivateMember);
// router.route("").post(activateMember);

module.exports = router;