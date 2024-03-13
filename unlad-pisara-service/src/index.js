const express = require("express");
const cookieParser = require("cookie-parser");
const connectDb = require("./config/db-connection.js");
require("dotenv").config();

const PORT = process.env.PORT || 8000;
const app = express();

connectDb();

app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(require("./config/cors-config.js"));
app.use(require("./config/session-config.js"));

app.use("/api", require("./routes/users/signup-route.js"));
app.use("/api", require("./routes/users/signin-route.js"));
app.use("/api", require("./routes/admin/projects-route.js"));
// app.use("/api", require("./routes/admin/member-route.js"));
// app.use("/api", require("./routes/admin/stage-route.js"));
// app.use("/api", require("./routes/admin/task-route.js"));
// app.use("/api", require("./routes/admin/notification-route.js"));

app.use(require("./middleware/error-handler.js"));

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
