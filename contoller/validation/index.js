const {
  validateCreateTask,
  validateGetTasks,
  validateGetTaskByID,
  validateUpdateTask,
} = require("./task_validation");
const { validateRegister, validateLogin } = require("./auth_validation");

module.exports = {
  validateCreateTask,
  validateGetTasks,
  validateGetTaskByID,
  validateUpdateTask,
  validateRegister,
  validateLogin,
};
