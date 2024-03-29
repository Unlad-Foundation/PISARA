const mongoose = require("mongoose");
const stageSchema = require("./stage-model");
const taskSchema = require("./tasks-model");

const projectSchema = new mongoose.Schema(
  {
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    project_name: { type: String, required: true },
    description: { type: String },
    members: [
      {
        user_id: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
          required: true,
        },
        is_active: { type: Boolean, default: true },
      },
    ],
    start_date: { type: Date, required: true },
    end_date: { type: Date },
    stages: { type: [stageSchema], required: false },
    tasks: { type: [taskSchema], required: false },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

projectSchema.virtual("membersCount").get(function () {
  return this.members.length;
});

projectSchema.methods.addMember = async function (userId) {
  const isMemberAlready = this.members.some((member) =>
    member.user_id.equals(userId)
  );
  if (isMemberAlready) {
    throw new Error("Member already exists in the project");
  }
  this.members.push({ user_id: userId, is_active: true });
  await this.save();
};

module.exports = mongoose.model("Project", projectSchema);
