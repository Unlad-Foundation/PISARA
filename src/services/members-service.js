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
        if (!project) return res.status(404).json({ message: "Project not found" });

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
        if (!project) return res.status(404).json({ message: "Project not found" });

        const member = project.members.find(member => member.user_id.equals(user_id));
        if (!member) return res.status(404).json({ message: "Member not found" });

        member.is_active = false;
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
        if (!project) return res.status(404).json({ message: "Project not found" });

        const member = project.members.find(member => member.user_id.equals(user_id));
        if (!member) return res.status(404).json({ message: "Member not found" });

        member.is_active = true;
        await project.save();
        res.status(200).json({ message: "Member activated" });
    } catch (error) {
        res.status(404);
        throw error;
    }
})

module.exports = { deactivateMember, activateMember, getProjectMembers };