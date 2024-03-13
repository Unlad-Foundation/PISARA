const mongoose = require('mongoose');

const projectMemberSchema = new mongoose.Schema({
    project_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Project",
        required: true,
    },
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    is_active: {
        type: Boolean,
        default: true,
    }
})

module.exports = mongoose.model('ProjectMember', projectMemberSchema);