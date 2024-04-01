const express = require("express");
const router = express.Router();
const { createStage, getStages } = require("../services/stage-service");
const { API_ENDPOINTS } = require("../config/endpoints-config");

router.use(require("../middleware/validate-token-handler"));
router.route(API_ENDPOINTS.STAGE.GET).get(getStages);
router.route(API_ENDPOINTS.STAGE.POST).post(createStage);

module.exports = router;
