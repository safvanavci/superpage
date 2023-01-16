const mongoose = require("mongoose");

const ProjectSchema = mongoose.Schema(
  {
    name: { type: String, require: true },
    creater: { type: String, require: true },
    color: { type: String, require: true },
    teams: { type: Array, require: false },
    tasks: { type: Array, require: false },
  },
  {
    timestamps: true,
  }
);

const Project = mongoose.model("projects", ProjectSchema);
module.exports = Project;
