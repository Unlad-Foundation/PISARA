const asyncHandler = require("express-async-handler");
const ProjectMember = require("../models/project-member-model");

//* Get project members, access private
const getProjectMembers = asyncHandler(async (req, res) => {
    const { project_id } = req.params;
    try {
        const members = await ProjectMember.find({ project_id });
        res.status(200).json(members);
    } catch (error) {
        res.status(404);
        throw error;
    }
});

//* Deactivate a member, access private
const deactivateMember = asyncHandler(async (req, res) => {
    const { project_id, user_id } = req.body;
    try {
        const member = await ProjectMember.findOne({ project_id, user_id });
        if (!member) {
            throw new Error("Member not found");
        }
        member.is_active = false;
        await member.save();
        res.status(200).json(member);
    } catch (error) {
        res.status(404);
        throw error;
    }
})

//* Activate a member, access private
const activateMember = asyncHandler(async (req, res) => {
    const { project_id, user_id } = req.body;
    try {
        const member = await ProjectMember.findOne({ project_id, user_id });
        if (!member) {
            throw new Error("Member not found");
        }
        member.is_active = true;
        await member.save();
        res.status(200).json(member);
    } catch (error) {
        res.status(404);
        throw error;
    }
})

module.exports = { deactivateMember, activateMember, getProjectMembers };