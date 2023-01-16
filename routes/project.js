const Project = require("../models/Project.js");
const User = require("../models/User.js");
const router = require("express").Router();

router.post("/projects", async (req, res) => {
  try {
    const { name, creater, color, teams, tasks } = req.body;

    const newProject = new Project({
      name,
      creater,
      color,
      teams,
      tasks,
    });

    await newProject.save();
    res.status(200).json("New project created");
  } catch (error) {
    res.status(400).json(error);
  }
});

router.post("/add-team", async (req, res) => {
  try {
    const project = await Project.findById(req.body.projectId);
    const user = await User.findById(req.body.userId);
    project.teams.push({
      id: req.body.userId,
      name: user.name,
      username: user.username,
      image: user.image,
    });
    await project.save();
    res.status(200).json("succes");
  } catch (error) {
    res.status(400).json(error);
  }
});

router.post("/add-task", async (req, res) => {
  try {
    const { id, title, content, tag, person, status, date, owner } = req.body;
    const project = await Project.findById(id);
    project.tasks.push({
      id: project.tasks.length + 1,
      title,
      content,
      tag,
      person,
      status,
      date,
      owner,
    });
    await project.save();
    res.status(200).json("succes");
  } catch (error) {
    res.status(400).json(error);
  }
});

router.get("/get-all-projects", async (req, res) => {
  try {
    const projects = await Project.find(req.query);
    res.status(200).json(projects);
  } catch (error) {
    res.status(400).json(error);
  }
});

router.put("/update-status", async (req, res) => {
  const id = req.body.id;
  const taskId = req.body.taskId;
  const newStatus = req.body.newStatus;

  try {
    const project = await Project.findById(id);
    const taskIndex = project.tasks.findIndex((task) => task.id === taskId);

    project.tasks[taskIndex] = {
      ...project.tasks[taskIndex],
      status: newStatus,
    };

    await project.save();
    res.status(200).json("Item updated successfully.");
  } catch (error) {
    res.status(500).json(error);
  }
});

router.put("/delete-task", async (req, res) => {
  const { id, taskId } = req.body;
  try {
    const project = await Project.findById(id);
    const task = await project.tasks.find((item) => item.id === taskId);
    const index = await project.tasks.indexOf(task);
    project.tasks.splice(index, 1);
    await project.save();
    res.status(200).json("Item deleted.");
  } catch (error) {
    res.status(500).json(error);
  }
});

router.put("/delete-user", async (req, res) => {
  const { projectId, userId } = req.body;
  try {
    const project = await Project.findById(projectId);
    const user = await project.teams.find((item) => item.id === userId);
    const index = await project.teams.indexOf(user);
    project.teams.splice(index, 1);
    await project.save();
    res.status(200).json("User deleted.");
  } catch (error) {
    res.status(500).json(error);
  }
});

router.delete("/delete-project", async (req, res) => {
  try {
    await Project.findByIdAndDelete(req.query.id);
    res.status(200).json("Item deleted successfully.");
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
