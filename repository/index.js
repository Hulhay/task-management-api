const {
  insertTaskToDB,
  getTasksFromDB,
  getTaskByIDFromDB,
  updateTaskDB,
  deleteTaskDB,
} = require("./task");
const { insertUserToDB, getUserByEmailFromDB } = require("./user");
const {
  insertLogoutLogToDB,
  getLogoutLogByAuthIdentifier,
} = require("./logout_log");

module.exports = {
  insertTaskToDB,
  getTasksFromDB,
  getTaskByIDFromDB,
  updateTaskDB,
  deleteTaskDB,
  insertUserToDB,
  getUserByEmailFromDB,
  insertLogoutLogToDB,
  getLogoutLogByAuthIdentifier,
};
