const { Task } = require("../models");
const { generateUUID, stringToDateTime } = require("../utils");

const insertTaskToDB = async (req) => {
  let { title, description, due_date, priority, status, tags } = req;

  if (priority === "") {
    priority = "low";
  }

  if (status === "") {
    status = "todo";
  }

  const task = new Task({
    id: generateUUID(),
    title: title,
    description: description,
    dueDate: stringToDateTime(due_date),
    priority: priority,
    status: status,
    tags: tags,
  });

  const response = await task.save();

  return response;
};

const getTasksFromDB = async (params) => {
  const query = {};
  if (params.keyword) {
    query.title = { $regex: params.keyword, $options: "i" };
  }
  if (params.status) {
    query.status = params.status;
  }
  if (params.priority) {
    query.priority = params.priority;
  }
  if (params.tags.length > 0) {
    query.tags = { $all: params.tags };
  }

  const tasks = await Task.find(query)
    .skip(params.size * params.page - params.size)
    .limit(params.size);

  const total = await Task.countDocuments(query);

  return { tasks, total };
};

const getTaskByIDFromDB = async (id) => {
  const response = await Task.find({ id: id });
  return response[0];
};

const updateTaskDB = async (req) => {
  const response = await Task.findOneAndUpdate(
    { id: req.params.id },
    { $set: req.body },
    { new: true }
  );
  return response;
};

const deleteTaskDB = async (id) => {
  const response = await Task.findOneAndDelete({ id: id });
  return response;
};

module.exports = {
  insertTaskToDB,
  getTasksFromDB,
  getTaskByIDFromDB,
  updateTaskDB,
  deleteTaskDB,
};
