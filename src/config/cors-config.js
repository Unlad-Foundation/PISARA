const cors = require("cors");
const { origin } = require("./constants-config")

const corsOptions = {
  origin: [origin.ORIGIN],
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
  credentials: true,
};

module.exports = cors(corsOptions);
