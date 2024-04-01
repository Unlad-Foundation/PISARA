const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  stage_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Stage",
    required: true,
  },
  task_name: { type: String, required: true },
  assigned_to: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  progress: { type: String, required: true },
  weight: { type: Number, required: true },
  start_date: { type: Date, required: true },
  end_date: { type: Date },
  actual_end_date: { type: Date },
  aging: { type: Number },
  days_to_complete: { type: Number },
  status: {
    type: String,
    enum: ["pending", "in_progress", "completed"],
    required: true,
  },
});

module.exports = mongoose.model("Tasks", taskSchema);
