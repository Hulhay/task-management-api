const mockingoose = require("mockingoose");
const {
  insertTaskToDB,
  getTasksFromDB,
  getTaskByIDFromDB,
  updateTaskDB,
  deleteTaskDB,
} = require("./task");
const { Task } = require("../models");

describe("insertTaskToDB", () => {
  const mockTaskData = {
    id: "fb0c9449-6b9d-4346-aefd-13a5f2c295ca",
    title: "Task Title",
    description: "Task Description",
    dueDate: "2023-08-31 10:53:00",
    priority: "low",
    status: "todo",
    tags: ["tag1", "tag2"],
  };

  beforeEach(() => {
    mockingoose.resetAll();
  });

  it("should insert a task", async () => {
    mockingoose(Task).toReturn(mockTaskData, "save");

    const req = {
      title: "Task Title",
      description: "Task Description",
      due_date: "2023-08-31 10:53:00",
      priority: "low",
      status: "completed",
      tags: ["tag1", "tag2"],
    };

    const response = await insertTaskToDB(req);
    expect(response.id).toEqual("fb0c9449-6b9d-4346-aefd-13a5f2c295ca");
    expect(response).toHaveProperty(
      "id",
      "title",
      "description",
      "dueDate",
      "priority",
      "status",
      "tags"
    );
  });

  it("should insert task with default priority and status", async () => {
    mockingoose(Task).toReturn(mockTaskData, "save");
    const req = {
      title: "Task Title",
      description: "Task Description",
      due_date: "2023-08-31 10:53:00",
      priority: "",
      status: "",
      tags: ["tag1", "tag2"],
    };

    const response = await insertTaskToDB(req);
    expect(response.id).toEqual("fb0c9449-6b9d-4346-aefd-13a5f2c295ca");
    expect(response.priority).toBe("low");
    expect(response.status).toBe("todo");
    expect(response).toHaveProperty(
      "id",
      "title",
      "description",
      "dueDate",
      "priority",
      "status",
      "tags"
    );
  });
});

describe("getTasksFromDB", () => {
  const mockTaskData = [
    {
      id: "fb0c9449-6b9d-4346-aefd-13a5f2c295ca",
      title: "Task Title",
      description: "Task Description",
      dueDate: "2023-08-31 10:53:00",
      priority: "high",
      status: "todo",
      tags: ["tag1", "tag2"],
    },
  ];

  beforeEach(() => {
    mockingoose.resetAll();
  });

  it("should return tasks with matching keyword", async () => {
    const params = {
      page: 1,
      size: 10,
      keyword: "Task",
      priority: undefined,
      status: undefined,
      tags: [],
    };

    mockingoose(Task).toReturn(mockTaskData, "find");
    mockingoose(Task).toReturn(1, "countDocuments");

    const result = await getTasksFromDB(params);

    expect(result.tasks[0]).toHaveProperty(
      "id",
      "title",
      "description",
      "dueDate",
      "priority",
      "status",
      "tags"
    );
    expect(result.tasks[0].id).toBe("fb0c9449-6b9d-4346-aefd-13a5f2c295ca");
    expect(result.total).toBe(1);
  });

  it("should return tasks with matching priority", async () => {
    const params = {
      page: 1,
      size: 10,
      keyword: "",
      priority: "high",
      status: undefined,
      tags: [],
    };

    mockingoose(Task).toReturn(mockTaskData, "find");
    mockingoose(Task).toReturn(1, "countDocuments");

    const result = await getTasksFromDB(params);

    expect(result.tasks[0]).toHaveProperty(
      "id",
      "title",
      "description",
      "dueDate",
      "priority",
      "status",
      "tags"
    );
    expect(result.tasks[0].id).toBe("fb0c9449-6b9d-4346-aefd-13a5f2c295ca");
    expect(result.total).toBe(1);
  });

  it("should return tasks with matching status", async () => {
    const params = {
      page: 1,
      size: 10,
      keyword: "",
      priority: undefined,
      status: "low",
      tags: [],
    };

    mockingoose(Task).toReturn(mockTaskData, "find");
    mockingoose(Task).toReturn(1, "countDocuments");

    const result = await getTasksFromDB(params);

    expect(result.tasks[0]).toHaveProperty(
      "id",
      "title",
      "description",
      "dueDate",
      "priority",
      "status",
      "tags"
    );
    expect(result.tasks[0].id).toBe("fb0c9449-6b9d-4346-aefd-13a5f2c295ca");
    expect(result.total).toBe(1);
  });

  it("should return tasks with matching tags", async () => {
    const params = {
      page: 1,
      size: 10,
      keyword: "",
      priority: undefined,
      status: undefined,
      tags: ["tag1"],
    };

    mockingoose(Task).toReturn(mockTaskData, "find");
    mockingoose(Task).toReturn(1, "countDocuments");

    const result = await getTasksFromDB(params);

    expect(result.tasks[0]).toHaveProperty(
      "id",
      "title",
      "description",
      "dueDate",
      "priority",
      "status",
      "tags"
    );
    expect(result.tasks[0].id).toBe("fb0c9449-6b9d-4346-aefd-13a5f2c295ca");
    expect(result.total).toBe(1);
  });

  it("should return empty tasks", async () => {
    const params = {
      page: 1,
      size: 10,
      keyword: "not-found",
      priority: undefined,
      status: undefined,
      tags: [],
    };

    mockingoose(Task).toReturn([], "find");
    mockingoose(Task).toReturn(0, "countDocuments");

    const result = await getTasksFromDB(params);

    expect(result.tasks).toEqual([]);
    expect(result.total).toBe(0);
  });
});

describe("getTaskByIDFromDB", () => {
  const mockTaskData = [
    {
      id: "fb0c9449-6b9d-4346-aefd-13a5f2c295ca",
      title: "Task Title",
      description: "Task Description",
      dueDate: "2023-08-31 10:53:00",
      priority: "high",
      status: "todo",
      tags: ["tag1", "tag2"],
    },
  ];

  beforeEach(() => {
    mockingoose.resetAll();
  });

  it("should return task by ID", async () => {
    mockingoose(Task).toReturn(mockTaskData, "find");

    const id = "fb0c9449-6b9d-4346-aefd-13a5f2c295ca";
    const result = await getTaskByIDFromDB(id);
    expect(result.id).toBe("fb0c9449-6b9d-4346-aefd-13a5f2c295ca");
    expect(result).toHaveProperty(
      "id",
      "title",
      "description",
      "dueDate",
      "priority",
      "status",
      "tags"
    );
  });

  it("should return empty for non exist ID", async () => {
    mockingoose(Task).toReturn([], "find");
    const id = "not-found-id";

    const result = await getTaskByIDFromDB(id);
    expect(result).toEqual(undefined);
  });
});

describe("updateTaskDB", () => {
  beforeEach(() => {
    mockingoose.resetAll();
  });

  it("should update a task", async () => {
    const mockTaskDataBefore = {
      id: "fb0c9449-6b9d-4346-aefd-13a5f2c295ca",
      title: "Task Title Before",
      description: "Task Description",
      dueDate: "2023-08-31 10:53:00",
      priority: "low",
      status: "todo",
      tags: ["tag1", "tag2"],
    };

    const mockTaskDataAfter = {
      id: "fb0c9449-6b9d-4346-aefd-13a5f2c295ca",
      title: "Task Title After",
      description: "Task Description",
      dueDate: "2023-08-31 10:53:00",
      priority: "low",
      status: "todo",
      tags: ["tag1", "tag2"],
    };

    mockingoose(Task).toReturn(mockTaskDataAfter, "findOneAndUpdate");

    const req = {
      params: { id: "fb0c9449-6b9d-4346-aefd-13a5f2c295ca" },
      body: {
        title: "Task Title After",
      },
    };

    const response = await updateTaskDB(req);
    expect(response.title).toEqual(mockTaskDataAfter.title);
    expect(response.title).not.toEqual(mockTaskDataBefore.title);
    expect(response).toHaveProperty(
      "id",
      "title",
      "description",
      "dueDate",
      "priority",
      "status",
      "tags"
    );
  });
});

describe("deleteTaskDB", () => {
  beforeEach(() => {
    mockingoose.resetAll();
  });

  it("should delete a task", async () => {
    const mockTaskData = {
      id: "fb0c9449-6b9d-4346-aefd-13a5f2c295ca",
      title: "Task Title",
      description: "Task Description",
      dueDate: "2023-08-31 10:53:00",
      priority: "low",
      status: "todo",
      tags: ["tag1", "tag2"],
    };

    mockingoose(Task).toReturn(mockTaskData, "findOneAndDelete");

    const response = await deleteTaskDB("fb0c9449-6b9d-4346-aefd-13a5f2c295ca");
    expect(response).toHaveProperty(
      "id",
      "title",
      "description",
      "dueDate",
      "priority",
      "status",
      "tags"
    );
  });
});
