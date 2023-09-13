const moment = require("moment");
const { msg, dateTimeFormat, validateUUID } = require("../../utils");
const { taskStatus, taskPriority } = require("../../models");

const validateCreateTask = (req) => {
  const { title, description, due_date, priority, status, tags } = req.body;

  if (!title) {
    return msg.errEmptyTitle;
  }

  if (title.length > 100) {
    return msg.errLongTitle;
  }

  if (description.length > 1000) {
    return msg.errLongDescription;
  }

  if (due_date && !moment(due_date, dateTimeFormat).isValid()) {
    return msg.errDateTimeFormat;
  }

  if (priority && !taskPriority.includes(priority)) {
    return msg.errInvalidPriority;
  }

  if (status && !taskStatus.includes(status)) {
    return msg.errInvalidStatus;
  }

  let errTag = false;
  tags.forEach((tag) => {
    if (tag.length > 50) {
      errTag = true;
    }
  });
  if (errTag) {
    return msg.errLongTag;
  }

  return "";
};

const validateGetTasks = (req) => {
  const params = {
    page: 1,
    size: 10,
    keyword: req.query.keyword,
    priority: req.query.priority,
    status: req.query.status,
    tags: [],
  };
  let err = "";

  if (req.query.page > 1) {
    params.page = req.query.page;
  }

  if (req.query.size > 0 && req.query.size < 10) {
    params.size = req.query.size;
  }

  if (params.keyword && params.keyword.length < 3) {
    err = msg.errKeywordLT3;
    return { params, err };
  }

  if (params.priority && !taskPriority.includes(params.priority)) {
    err = msg.errInvalidPriority;
    return { params, err };
  }

  if (params.status && !taskStatus.includes(params.status)) {
    err = msg.errInvalidStatus;
    return { params, err };
  }

  if (req.query.tags) {
    const tagsArr = req.query.tags.split(",");
    params.tags = tagsArr;
  }

  return { params, err };
};

const validateGetTaskByID = (id) => {
  if (!validateUUID(id)) {
    return msg.errInvalidUUIDFormat;
  }

  return "";
};

const validateUpdateTask = (req, id) => {
  const { title, description, due_date, priority, status, tags } = req.body;

  const err = validateGetTaskByID(id);
  if (err) {
    return err;
  }

  if (title !== undefined) {
    if (title.length === 0) {
      return msg.errEmptyTitle;
    }
    if (title.length > 100) {
      return msg.errLongTitle;
    }
  }

  if (description) {
    if (description.length > 1000) {
      return msg.errLongDescription;
    }
  }

  if (due_date && !moment(due_date, dateTimeFormat).isValid()) {
    return msg.errDateTimeFormat;
  }

  if (priority && !taskPriority.includes(priority)) {
    return msg.errInvalidPriority;
  }

  if (status && !taskStatus.includes(status)) {
    return msg.errInvalidStatus;
  }

  if (tags) {
    let errTag = false;
    tags.forEach((tag) => {
      if (tag.length > 50) {
        errTag = true;
      }
    });
    if (errTag) {
      return msg.errLongTag;
    }
  }

  return "";
};

module.exports = {
  validateCreateTask,
  validateGetTasks,
  validateGetTaskByID,
  validateUpdateTask,
};
