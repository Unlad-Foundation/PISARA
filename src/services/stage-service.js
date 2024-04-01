const asyncHandler = require("express-async-handler");
const Stage = require("../models/stage-model");
const Project = require("../models/projects-model");
const { trimAll } = require("../config/common-config");

//*Get all stages, access private
const getStages = asyncHandler(async (req, res) => {
  try {
    const projects = await Project.find().populate("stages");
    const stages = projects.map((project) => project.stages).flat();
    res.status(200).json(stages);
  } catch (error) {
    res.status(404);
    throw error;
  }
});

//*Create a new stage, access private
const createStage = asyncHandler(async (req, res) => {
  const trimmedBody = trimAll(req.body);
  const {
    stage_name,
    start_date,
    end_date,
    project_id,
    tasks = [],
  } = trimmedBody;

  try {
    if (!stage_name || !start_date || !end_date || !project_id)
      return res.status(400).json({
        message:
          "Please provide all required stage details including the bucketId.",
      });
    const project = await Project.findById(project_id);
    if (!project) {
      return res.status(404).json({ message: "Project not found." });
    }

    const existingStage = project.stages.find(
      (stage) => stage.stage_name === stage_name
    );
    if (existingStage) {
      return res
        .status(409)
        .json({ message: "Stage with that name already exists!" });
    }

    const stage = new Stage({
      stage_name,
      start_date,
      end_date,
      tasks,
    });

    project.stages.push(stage);
    await project.save();
    res.status(200).json(stage);
  } catch (error) {
    res.status(400);
    throw error;
  }
});

module.exports = { createStage, getStages };
