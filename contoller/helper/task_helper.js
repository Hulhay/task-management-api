const { formatDateString, dateTimeFormat } = require("../../utils");

const buildTaskResponse = (task) => {
  return {
    id: task.id,
    title: task.title,
    description: task.description,
    due_date: formatDateString(task.dueDate, dateTimeFormat),
    priority: task.priority,
    status: task.status,
    tags: task.tags,
    created_at: formatDateString(task.createdAt, dateTimeFormat),
    updated_at: formatDateString(task.updatedAt, dateTimeFormat),
  };
};

const buildGetTaskResponse = (tasks) => {
  return tasks.map((task) => {
    return buildTaskResponse(task);
  });
};

module.exports = { buildTaskResponse, buildGetTaskResponse };
