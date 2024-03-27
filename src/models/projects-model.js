const mongoose = require("mongoose");
const stageSchema = require("./stage-model")
const taskSchema = require("./tasks-model")
const ProjectMember = require("./project-member-model")

const projectSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  project_name: { type: String, required: true },
  description: { type: String },
  members: [{ type: mongoose.Schema.Types.ObjectId, ref: "ProjectMember" }],
  start_date: { type: Date, required: true },
  end_date: { type: Date },
  stages: { type: [stageSchema], required: false },
  tasks: { type: [taskSchema], required: false },
});

projectSchema.methods.addMember = async function(userId) {
  const isAlreadyMember = this.members.some(member => member.equals(userId));
  if (isAlreadyMember) {
    throw new Error("User is already a member of this project.");
  }

  const member = await ProjectMember.create({ project_id: this._id, user_id: userId });
  this.members.push(member._id);
  await this.save();
  return this.populate({
    path: 'members',
    populate: { path: 'user_id', model: 'User' }
  });
};

module.exports = mongoose.model("Project", projectSchema);
