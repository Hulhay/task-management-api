const {
  insertTaskToDB,
  getTasksFromDB,
  getTaskByIDFromDB,
  updateTaskDB,
  deleteTaskDB,
} = require("../repository");
const { buildResponse, msg, buildPagination } = require("../utils");
const { buildTaskResponse, buildGetTaskResponse } = require("./helper");
const {
  validateCreateTask,
  validateGetTasks,
  validateGetTaskByID,
  validateUpdateTask,
} = require("./validation");

const createTask = async (req, res) => {
  const err = validateCreateTask(req);
  if (err) {
    return buildResponse(res, 422, err, null, null);
  }

  try {
    const response = await insertTaskToDB(req.body);
    return buildResponse(res, 201, msg.success, buildTaskResponse(response), null);
  } catch (err) {
    return buildResponse(res, 500, msg.errFailedCreateTask, null, null);
  }
};

const getTasks = async (req, res) => {
  const { params, err } = validateGetTasks(req);
  if (err) {
    return buildResponse(res, 422, err, null, null);
  }

  try {
    const { tasks, total } = await getTasksFromDB(params);

    return buildResponse(
      res,
      200,
      msg.success,
      buildGetTaskResponse(tasks),
      buildPagination(params, total)
    );
  } catch (err) {
    return buildResponse(res, 500, msg.errFailedGetTasks, null, null);
  }
};

const getTaskByID = async (req, res) => {
  const { id } = req.params;
  const err = validateGetTaskByID(id);
  if (err) {
    return buildResponse(res, 422, err, null, null);
  }

  try {
    const response = await getTaskByIDFromDB(id);
    if (!response) {
      return buildResponse(res, 404, msg.errTaskNotFound, null, null);
    }

    return buildResponse(
      res,
      200,
      msg.success,
      buildTaskResponse(response),
      null
    );
  } catch (err) {
    return buildResponse(res, 500, msg.errFailedGetTasks, null, null);
  }
};

const updateTask = async (req, res) => {
  const { id } = req.params;
  const err = validateUpdateTask(req, id);
  if (err) {
    return buildResponse(res, 422, err, null, null);
  }

  try {
    const response = await updateTaskDB(req);
    if (!response) {
      return buildResponse(res, 404, msg.errTaskNotFound, null, null);
    }

    return buildResponse(
      res,
      200,
      msg.success,
      buildTaskResponse(response),
      null
    );
  } catch (err) {
    return buildResponse(res, 500, msg.errFailedUpdateTask, null, null);
  }
};

const deleteTask = async (req, res) => {
  const { id } = req.params;
  const err = validateGetTaskByID(id);
  if (err) {
    return buildResponse(res, 422, err, null, null);
  }

  try {
    const response = await deleteTaskDB(id);
    if (!response) {
      return buildResponse(res, 404, msg.errTaskNotFound, null, null);
    }
    return buildResponse(res, 200, msg.success, null, null);
  } catch (err) {
    return buildResponse(res, 500, msg.errFailedDeleteTask, null, null);
  }
};

module.exports = { createTask, getTasks, getTaskByID, updateTask, deleteTask };
