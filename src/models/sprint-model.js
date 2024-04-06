const mongoose = require("mongoose");

const sprintSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    default: "open",
  },
  description: String,
  startDate: Date,
  endDate: Date,
  items: [{ type: mongoose.Schema.Types.ObjectId, ref: "Item" }],
});

module.exports = mongoose.model("Sprint", sprintSchema);
