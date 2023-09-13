const mongoose = require("mongoose");

const taskStatus = ["todo", "in-progress", "completed"];
const taskPriority = ["low", "medium", "high"];

const taskSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  dueDate: {
    type: Date,
  },
  priority: {
    type: String,
    enum: taskPriority,
    default: "low",
  },
  status: {
    type: String,
    enum: taskStatus,
    default: "todo",
    required: true,
  },
  tags: {
    type: [String],
  },
  createdAt: {
    type: Date,
  },
  updatedAt: {
    type: Date,
  },
});

const Task = mongoose.model("Task", taskSchema);

module.exports = { Task, taskStatus, taskPriority };
