const express = require("express");
const { createProject, getProjects, updateProject, deleteProject } = require("../../controllers/admin/projects-controller");

const router = express.Router();

router.use(require("../middleware/validate-token-handler"));
router.route("/project").get(getProjects);
router.route("/project").post(createProject);
router.route("/project/:id").put(updateProject).delete(deleteProject);

module.exports = router;
