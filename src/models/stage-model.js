const mongoose = require("mongoose");
const taskSchema = require("../models/tasks-model").schema;

const stageSchema = new mongoose.Schema({
  stage_name: { type: String, required: true },
  start_date: { type: Date, required: true },
  end_date: { type: Date },
  tasks: [taskSchema],
});

module.exports = mongoose.model("Stage", stageSchema);
