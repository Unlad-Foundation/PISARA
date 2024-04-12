const express = require('express');
const router = express.Router();
const { API_ENDPOINTS } = require('../config/endpointsConfig.js');
const { MSG } = require('../config/commonConfig.js');

router.get(API_ENDPOINTS.MAIN.DEFAULT, (req, res) => {
  res.send({
    status: res.statusCode,
    message: MSG.WELCOME,
    timestamp: new Date().toISOString(),
  });
});

module.exports = router;
