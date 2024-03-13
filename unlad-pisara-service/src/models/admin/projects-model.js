const mongoose = require("mongoose");
const stageSchema = require("./stage-model")
const taskSchema = require("./tasks-model")

const projectSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  project_name: { type: String, required: true },
  description: { type: String },
  start_date: { type: Date, required: true },
  end_date: { type: Date },
  stages: { type: [stageSchema], required: false },
  tasks: { type: [taskSchema], required: false },
});

module.exports = mongoose.model("Project", projectSchema);
