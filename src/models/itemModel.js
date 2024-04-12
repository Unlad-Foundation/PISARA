const mongoose = require("mongoose");

const itemSchema = new mongoose({
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  projectId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Project",
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: String,
  assignees: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  start_date: Date,
  end_date: Date,
  status: {
    type: String,
    default: "open",
  },
  priority: {
    type: String,
    default: "normal",
  },
  type: {
    type: String,
    default: "task",
  },
  tags: [String],
  attachments: {
    type: String,
    link: String,
    createdAt: Date,
  },
  images: {
    type: String,
    link: String,
    createdAt: Date,
  },
  comments: [
    {
      user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      message: String,
      createdAt: {
        type: Date,
        default: Date.now,
      },
      updatedAt: {
        type: Date,
        default: Date.now,
      },
    },
  ],
  children: [{ type: mongoose.Schema.Types.ObjectId, ref: "Item" }],
});

itemSchema.set("autoIndex", true);

module.exports = mongoose.model("Item", itemSchema);
