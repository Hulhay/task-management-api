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
  };
};

const buildGetTaskResponse = (tasks) => {
  return tasks.map((task) => {
    return buildTaskResponse(task);
  });
};

module.exports = { buildTaskResponse, buildGetTaskResponse };
