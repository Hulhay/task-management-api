const {
  validateCreateTask,
  validateGetTasks,
  validateGetTaskByID,
  validateUpdateTask,
} = require("./validation");
const {
  insertTaskToDB,
  getTasksFromDB,
  getTaskByIDFromDB,
  updateTaskDB,
  deleteTaskDB,
} = require("../repository");
const { buildGetTaskResponse, buildTaskResponse } = require("./helper");
const {
  createTask,
  getTasks,
  getTaskByID,
  updateTask,
  deleteTask,
} = require("./task");

jest.mock("./validation");
jest.mock("../repository");
jest.mock("./helper");

describe("createTask", () => {
  const mockTaskData = {
    id: "fb0c9449-6b9d-4346-aefd-13a5f2c295ca",
    title: "New Task",
    description: "Task Description",
    dueDate: "2023-08-31 10:53:00",
    priority: "low",
    status: "todo",
    tags: ["tag1", "tag2"],
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should return 201 and task created", async () => {
    const id = "fb0c9449-6b9d-4346-aefd-13a5f2c295ca";
    const mockReq = {
      body: {
        title: "New Task",
        description: "Task Description",
        dueDate: "2023-08-31 10:53:00",
        priority: "low",
        status: "todo",
        tags: ["tag1", "tag2"],
      },
    };
    const mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    validateCreateTask.mockReturnValue(null);
    insertTaskToDB.mockResolvedValue({
      id: id,
      ...mockReq.body,
    });
    buildTaskResponse.mockReturnValue({
      id: id,
      ...mockReq.body,
    });

    await createTask(mockReq, mockRes);

    expect(validateCreateTask).toHaveBeenCalledWith(mockReq);
    expect(insertTaskToDB).toHaveBeenCalledWith(mockReq.body);
    expect(buildTaskResponse).toHaveBeenCalledWith({
      id: id,
      ...mockReq.body,
    });
    expect(mockRes.status).toHaveBeenCalledWith(201);
    expect(mockRes.json).toHaveBeenCalledWith({
      meta: {
        code: 201,
        message: "success",
        pagination: null,
      },
      data: mockTaskData,
    });
  });

  it("should return 422 when validation fails", async () => {
    const id = "fb0c9449-6b9d-4346-aefd-13a5f2c295ca";
    const mockReq = {
      body: {
        title: "",
        description: "",
        dueDate: "",
        priority: "",
        status: "",
        tags: [],
      },
    };
    const mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    validateCreateTask.mockReturnValue("Validation error message");

    await createTask(mockReq, mockRes);

    expect(validateCreateTask).toHaveBeenCalledWith(mockReq);
    expect(mockRes.status).toHaveBeenCalledWith(422);
    expect(mockRes.json).toHaveBeenCalledWith({
      meta: {
        code: 422,
        message: "Validation error message",
        pagination: null,
      },
      data: null,
    });
  });

  it("should return 500 when error occurs during process", async () => {
    const mockReq = {
      body: {
        title: "New Task",
        description: "Task Description",
        dueDate: "2023-08-31 10:53:00",
        priority: "low",
        status: "todo",
        tags: ["tag1", "tag2"],
      },
    };
    const mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    validateCreateTask.mockReturnValue(null);
    insertTaskToDB.mockRejectedValue(new Error("error"));

    await createTask(mockReq, mockRes);

    expect(validateCreateTask).toHaveBeenCalledWith(mockReq);
    expect(insertTaskToDB).toHaveBeenCalledWith(mockReq.body);
    expect(mockRes.status).toHaveBeenCalledWith(500);
    expect(mockRes.json).toHaveBeenCalledWith({
      meta: {
        code: 500,
        message: "failed to create new task",
        pagination: null,
      },
      data: null,
    });
  });
});

describe("getTasks", () => {
  const mockTaskData = [
    {
      id: "fb0c9449-6b9d-4346-aefd-13a5f2c295ca",
      title: "Task Title",
      description: "Task Description",
      dueDate: "2023-08-31 10:53:00",
      priority: "low",
      status: "todo",
      tags: ["tag1", "tag2"],
    },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should return 200 and task data when task is found", async () => {
    const params = { page: 1, size: 10, status: "todo" };
    const mockReq = { query: params };
    const mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    validateGetTasks.mockReturnValue({ params: params, err: null });
    getTasksFromDB.mockResolvedValue({ tasks: mockTaskData, total: 1 });
    buildGetTaskResponse.mockReturnValue(mockTaskData);

    await getTasks(mockReq, mockRes);

    expect(validateGetTasks).toHaveBeenCalledWith(mockReq);
    expect(getTasksFromDB).toHaveBeenCalledWith(params);
    expect(buildGetTaskResponse).toHaveBeenCalledWith(mockTaskData);
    expect(mockRes.status).toHaveBeenCalledWith(200);
    expect(mockRes.json).toHaveBeenCalledWith({
      meta: {
        code: 200,
        message: "success",
        pagination: {
          page: 1,
          size: 10,
          total_data: 1,
          total_page: 1,
        },
      },
      data: mockTaskData,
    });
  });

  it("should return 422 when validation fails", async () => {
    const params = { page: 1, size: 10, status: "invalid" };
    const mockReq = { query: params };
    const mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    validateGetTasks.mockReturnValue({
      params: params,
      err: "Validation error message",
    });

    await getTasks(mockReq, mockRes);

    expect(validateGetTasks).toHaveBeenCalledWith(mockReq);
    expect(mockRes.status).toHaveBeenCalledWith(422);
    expect(mockRes.json).toHaveBeenCalledWith({
      meta: {
        code: 422,
        message: "Validation error message",
        pagination: null,
      },
      data: null,
    });
  });

  it("should return 500 when error occurs during process", async () => {
    const params = { page: 1, size: 10, status: "todo" };
    const mockReq = { query: params };
    const mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    validateGetTasks.mockReturnValue({ params: params, err: null });
    getTasksFromDB.mockRejectedValue(new Error("error"));

    await getTasks(mockReq, mockRes);

    expect(validateGetTasks).toHaveBeenCalledWith(mockReq);
    expect(getTasksFromDB).toHaveBeenCalledWith(params);
    expect(mockRes.status).toHaveBeenCalledWith(500);
    expect(mockRes.json).toHaveBeenCalledWith({
      meta: {
        code: 500,
        message: "failed to get tasks",
        pagination: null,
      },
      data: null,
    });
  });
});

describe("getTaskByID", () => {
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
    jest.clearAllMocks();
  });

  it("should return 200 and task data when task is found", async () => {
    const id = "fb0c9449-6b9d-4346-aefd-13a5f2c295ca";
    const mockReq = { params: { id: id } };
    const mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    validateGetTaskByID.mockReturnValue(null);
    getTaskByIDFromDB.mockResolvedValue(mockTaskData);
    buildTaskResponse.mockReturnValue(mockTaskData);

    await getTaskByID(mockReq, mockRes);

    expect(validateGetTaskByID).toHaveBeenCalledWith(id);
    expect(getTaskByIDFromDB).toHaveBeenCalledWith(id);
    expect(buildTaskResponse).toHaveBeenCalledWith(mockTaskData);
    expect(mockRes.status).toHaveBeenCalledWith(200);
    expect(mockRes.json).toHaveBeenCalledWith({
      meta: {
        code: 200,
        message: "success",
        pagination: null,
      },
      data: mockTaskData,
    });
  });

  it("should return 422 when validation fails", async () => {
    const id = "invalid";
    const req = { params: { id: id } };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    validateGetTaskByID.mockReturnValue("Validation error message");

    await getTaskByID(req, res);

    expect(validateGetTaskByID).toHaveBeenCalledWith(id);
    expect(res.status).toHaveBeenCalledWith(422);
    expect(res.json).toHaveBeenCalledWith({
      meta: {
        code: 422,
        message: "Validation error message",
        pagination: null,
      },
      data: null,
    });
  });

  it("should return 404 when task is not found", async () => {
    const id = "fb0c9449-6b9d-4346-aefd-13a5f2c295ca";
    const mockReq = { params: { id: id } };
    const mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    validateGetTaskByID.mockReturnValue(null);
    getTaskByIDFromDB.mockResolvedValue(null);

    await getTaskByID(mockReq, mockRes);

    expect(validateGetTaskByID).toHaveBeenCalledWith(id);
    expect(getTaskByIDFromDB).toHaveBeenCalledWith(id);
    expect(mockRes.status).toHaveBeenCalledWith(404);
    expect(mockRes.json).toHaveBeenCalledWith({
      meta: {
        code: 404,
        message: "task not found",
        pagination: null,
      },
      data: null,
    });
  });

  it("should return 500 when error occurs during process", async () => {
    const id = "fb0c9449-6b9d-4346-aefd-13a5f2c295ca";
    const mockReq = { params: { id: id } };
    const mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    validateGetTaskByID.mockReturnValue(null);
    getTaskByIDFromDB.mockRejectedValue(new Error("error"));

    await getTaskByID(mockReq, mockRes);

    expect(validateGetTaskByID).toHaveBeenCalledWith(id);
    expect(getTaskByIDFromDB).toHaveBeenCalledWith(id);
    expect(mockRes.status).toHaveBeenCalledWith(500);
    expect(mockRes.json).toHaveBeenCalledWith({
      meta: {
        code: 500,
        message: "failed to get tasks",
        pagination: null,
      },
      data: null,
    });
  });
});

describe("updateTask", () => {
  const mockTaskData = {
    id: "fb0c9449-6b9d-4346-aefd-13a5f2c295ca",
    title: "Task Title",
    description: "Task Description",
    dueDate: "2023-08-31 10:53:00",
    priority: "low",
    status: "completed",
    tags: ["tag1", "tag2"],
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should return 200 and update success", async () => {
    const id = "fb0c9449-6b9d-4346-aefd-13a5f2c295ca";
    const mockReq = {
      params: { id: id },
      body: {
        title: "Task Title",
        description: "Task Description",
        dueDate: "2023-08-31 10:53:00",
        priority: "low",
        status: "completed",
        tags: ["tag1", "tag2"],
      },
    };
    const mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    validateUpdateTask.mockReturnValue(null);
    updateTaskDB.mockResolvedValue({
      id: id,
      ...mockReq.body,
    });
    buildTaskResponse.mockReturnValue({
      id: id,
      ...mockReq.body,
    });

    await updateTask(mockReq, mockRes);

    expect(validateUpdateTask).toHaveBeenCalledWith(mockReq, id);
    expect(updateTaskDB).toHaveBeenCalledWith(mockReq);
    expect(buildTaskResponse).toHaveBeenCalledWith({
      id: id,
      ...mockReq.body,
    });
    expect(mockRes.status).toHaveBeenCalledWith(200);
    expect(mockRes.json).toHaveBeenCalledWith({
      meta: {
        code: 200,
        message: "success",
        pagination: null,
      },
      data: mockTaskData,
    });
  });

  it("should return 422 when validation fails", async () => {
    const id = "fb0c9449-6b9d-4346-aefd-13a5f2c295ca";
    const mockReq = {
      params: { id: id },
      body: {
        title: "Task Title",
        description: "Task Description",
        dueDate: "2023-08-31 10:53:00",
        priority: "low",
        status: "completed",
        tags: ["tag1", "tag2"],
      },
    };
    const mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    validateUpdateTask.mockReturnValue("Validation error message");

    await updateTask(mockReq, mockRes);

    expect(validateUpdateTask).toHaveBeenCalledWith(mockReq, id);
    expect(mockRes.status).toHaveBeenCalledWith(422);
    expect(mockRes.json).toHaveBeenCalledWith({
      meta: {
        code: 422,
        message: "Validation error message",
        pagination: null,
      },
      data: null,
    });
  });

  it("should return 404 when task not found", async () => {
    const id = "fb0c9449-6b9d-4346-aefd-13a5f2c295ca";
    const mockReq = {
      params: { id: id },
      body: {
        title: "Task Title",
        description: "Task Description",
        dueDate: "2023-08-31 10:53:00",
        priority: "low",
        status: "completed",
        tags: ["tag1", "tag2"],
      },
    };
    const mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    validateUpdateTask.mockReturnValue(null);
    updateTaskDB.mockResolvedValue(null);

    await updateTask(mockReq, mockRes);

    expect(validateUpdateTask).toHaveBeenCalledWith(mockReq, id);
    expect(updateTaskDB).toHaveBeenCalledWith(mockReq);
    expect(mockRes.status).toHaveBeenCalledWith(404);
    expect(mockRes.json).toHaveBeenCalledWith({
      meta: {
        code: 404,
        message: "task not found",
        pagination: null,
      },
      data: null,
    });
  });

  it("should return 500 when error occurs during process", async () => {
    const id = "fb0c9449-6b9d-4346-aefd-13a5f2c295ca";
    const mockReq = {
      params: { id: id },
      body: {
        title: "Task Title",
        description: "Task Description",
        dueDate: "2023-08-31 10:53:00",
        priority: "low",
        status: "completed",
        tags: ["tag1", "tag2"],
      },
    };
    const mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    validateUpdateTask.mockReturnValue(null);
    updateTaskDB.mockRejectedValue(new Error("error"));

    await updateTask(mockReq, mockRes);

    expect(validateUpdateTask).toHaveBeenCalledWith(mockReq, id);
    expect(updateTaskDB).toHaveBeenCalledWith(mockReq);
    expect(mockRes.status).toHaveBeenCalledWith(500);
    expect(mockRes.json).toHaveBeenCalledWith({
      meta: {
        code: 500,
        message: "failed to update task",
        pagination: null,
      },
      data: null,
    });
  });
});

describe("deleteTask", () => {
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
    jest.clearAllMocks();
  });

  it("should return 200 and delete task", async () => {
    const id = "fb0c9449-6b9d-4346-aefd-13a5f2c295ca";
    const mockReq = { params: { id: id } };
    const mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    validateGetTaskByID.mockReturnValue(null);
    deleteTaskDB.mockResolvedValue(mockTaskData);

    await deleteTask(mockReq, mockRes);

    expect(validateGetTaskByID).toHaveBeenCalledWith(id);
    expect(deleteTaskDB).toHaveBeenCalledWith(id);
    expect(mockRes.status).toHaveBeenCalledWith(200);
    expect(mockRes.json).toHaveBeenCalledWith({
      meta: {
        code: 200,
        message: "success",
        pagination: null,
      },
      data: null,
    });
  });

  it("should return 422 when validation fails", async () => {
    const id = "invalid-id";
    const mockReq = { params: { id: id } };
    const mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    validateGetTaskByID.mockReturnValue("Validation error message");

    await deleteTask(mockReq, mockRes);

    expect(validateGetTaskByID).toHaveBeenCalledWith(id);
    expect(mockRes.status).toHaveBeenCalledWith(422);
    expect(mockRes.json).toHaveBeenCalledWith({
      meta: {
        code: 422,
        message: "Validation error message",
        pagination: null,
      },
      data: null,
    });
  });

  it("should return 404 when task not found", async () => {
    const id = "fb0c9449-6b9d-4346-aefd-13a5f2c295ca";
    const mockReq = { params: { id: id } };
    const mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    validateGetTaskByID.mockReturnValue(null);
    deleteTaskDB.mockResolvedValue(null);

    await deleteTask(mockReq, mockRes);

    expect(validateGetTaskByID).toHaveBeenCalledWith(id);
    expect(deleteTaskDB).toHaveBeenCalledWith(id);
    expect(mockRes.status).toHaveBeenCalledWith(404);
    expect(mockRes.json).toHaveBeenCalledWith({
      meta: {
        code: 404,
        message: "task not found",
        pagination: null,
      },
      data: null,
    });
  });

  it("should return 500 when error occur during process", async () => {
    const id = "fb0c9449-6b9d-4346-aefd-13a5f2c295ca";
    const mockReq = { params: { id: id } };
    const mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    validateGetTaskByID.mockReturnValue(null);
    deleteTaskDB.mockRejectedValue(new Error("error"));

    await deleteTask(mockReq, mockRes);

    expect(validateGetTaskByID).toHaveBeenCalledWith(id);
    expect(deleteTaskDB).toHaveBeenCalledWith(id);
    expect(mockRes.status).toHaveBeenCalledWith(500);
    expect(mockRes.json).toHaveBeenCalledWith({
      meta: {
        code: 500,
        message: "failed to delete task",
        pagination: null,
      },
      data: null,
    });
  });
});
