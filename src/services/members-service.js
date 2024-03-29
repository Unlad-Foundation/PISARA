const asyncHandler = require("express-async-handler");
const Project = require("../models/projects-model");

//* Get project members, access private
const getProjectMembers = asyncHandler(async (req, res) => {
    const { project_id } = req.params;
    try {
        const project = await Project.findById(project_id).populate({
            path: "members.user_id",
            select: "firstname lastname email role",
        });
        if (!project) {
            res.status(404).json({ message: "Project not found" });
            return;
        }
        res.status(200).json(project.members);
    } catch (error) {
        res.status(404);
        throw error;
    }
});

//* Deactivate a member, access private
const deactivateMember = asyncHandler(async (req, res) => {
    const { project_id, user_id } = req.params;
    try {
        const project = await Project.findById(project_id);
        if (!project) {
            res.status(404).json({ message: "Project not found" });
            return;
        }
        const memberIndex = project.members.findIndex(member => member.user_id.equals(user_id));
        if (memberIndex === -1) {
            res.status(404).json({ message: "Member not found" });
            return;
        }
        project.members[memberIndex].is_active = false;
        await project.save();
        res.status(200).json({ message: "Member deactivated" });
    } catch (error) {
        res.status(404);
        throw error;
    }
})

//* Activate a member, access private
const activateMember = asyncHandler(async (req, res) => {
    const { project_id, user_id } = req.params;
    try {
        const project = await Project.findById(project_id);
        if (!project) {
            res.status(404).json({ message: "Project not found" });
            return;
        }
        const memberIndex = project.members.findIndex(member => member.user_id.equals(user_id));
        if (memberIndex === -1) {
            res.status(404).json({ message: "Member not found" });
            return;
        }
        project.members[memberIndex].is_active = true;
        await project.save();
        res.status(200).json({ message: "Member activated" });
    } catch (error) {
        res.status(404);
        throw error;
    }
})

module.exports = { deactivateMember, activateMember, getProjectMembers };