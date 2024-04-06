const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);

const projectSchema = new mongoose.Schema(
  {
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    projectName: { type: String, required: true },
    description: { type: String },
    status: {
      type: String,
      default: "draft",
    },
    type: {
      type: String,
      default: "ext",
    },
    tags: [String],
    services: [String],
    startDate: Date,
    endDate: Date,
    image: {
      type: String,
      default: "https://pisara-mockup.vercel.app/assets/Logo-DBBuCobH.png",
    },
    members: [
      {
        userId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
          required: true,
        },
        isActive: { type: Boolean, default: true },
      },
    ],
    sprints: [{ type: mongoose.Schema.Types.ObjectId, ref: "Sprint" }],
    projectCounter: {
      type: Number,
      default: 1,
    },
  },
  { timestamps: true }
);

projectSchema.set("autoIndex", true);
projectSchema.plugin(AutoIncrement, {
  inc_field: "projectItemCounter",
  disable_hooks: true,
});

projectSchema.virtual("membersCount").get(function () {
  return this.members.length;
});

projectSchema.methods.addMember = async function (userId) {
  const isMemberAlready = this.members.some((member) =>
    member.userId.equals(userId)
  );
  if (isMemberAlready) {
    throw new Error("Member already exists in the project");
  }
  this.members.push({ userId: userId, isActive: true });
  await this.save();
};

module.exports = mongoose.model("Project", projectSchema);
