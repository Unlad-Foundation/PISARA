const mongoose = require("mongoose");

const stageSchema = new mongoose.Schema({
    stage_name: { type: String, required: true },
    start_date: { type: Date, required: true },
    end_date: { type: Date },
});

module.exports = stageSchema;