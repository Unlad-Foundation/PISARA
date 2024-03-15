const express = require("express");
const router = express.Router();
const { createProject, getProjects, updateProject, deleteProject } = require("../services/projects-service");

router.use(require("../middleware/validate-token-handler"));
router.route("/project").get(getProjects);
router.route("/project").post(createProject);
router.route("/project/:id").put(updateProject).delete(deleteProject);

module.exports = router;
