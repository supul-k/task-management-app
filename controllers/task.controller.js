const Task = require("../models/task");

class TaskController {
  async createTask(req, res) {
    try {
      const { taskName, taskDescription } = req.body;
      const task = await Task.create({ taskName, taskDescription });
      res.status(201).json(task);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async getTasks(req, res) {
    try {
      const tasks = await Task.findAll();
      res.status(200).json(tasks);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async getTaskById(req, res) {
    try {
      const { id } = req.params;
      const task = await Task.findByPk(id);
      res.status(200).json(task);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async updateTask(req, res) {
    try {
      const { id } = req.params;
      const { taskName, taskDescription } = req.body;
      const task = await Task.findByPk(id);
      task.taskName = taskName;
      task.taskDescription = taskDescription;
      await task.save();
      res.status(200).json(task);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async deleteTask(req, res) {
    try {
      const { id } = req.params;
      const task = await Task.findByPk(id);
      await task.destroy();
      res.status(204).end();
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
}

module.exports = new TaskController();
