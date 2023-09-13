const { getHealth } = require("./health");
const {
  createTask,
  getTasks,
  getTaskByID,
  updateTask,
  deleteTask,
} = require("./task");
const { register, login, logout } = require("./auth");

module.exports = {
  getHealth,
  createTask,
  getTasks,
  getTaskByID,
  updateTask,
  deleteTask,
  register,
  login,
  logout,
};
