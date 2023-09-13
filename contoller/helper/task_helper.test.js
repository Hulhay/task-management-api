const { buildGetTaskResponse, buildTaskResponse } = require("./task_helper");

describe("buildTaskResponse", () => {
  it("should build response task struct", () => {
    const mockTask = {
      id: "fb0c9449-6b9d-4346-aefd-13a5f2c295ca",
      title: "Task Title",
      description: "Task Description",
      dueDate: "2023-08-31 10:53:00",
      priority: "high",
      status: "todo",
      tags: ["tag1", "tag2"],
    };

    const response = buildTaskResponse(mockTask);
    expect(response).toEqual({
      id: "fb0c9449-6b9d-4346-aefd-13a5f2c295ca",
      title: "Task Title",
      description: "Task Description",
      due_date: "2023-08-31 10:53:00",
      priority: "high",
      status: "todo",
      tags: ["tag1", "tag2"],
    });
  });
});

describe("buildGetTaskResponse", () => {
  it("should build an array of response task struct", () => {
    const mockTasks = [
      {
        id: "7d3a8669-e8b8-47c5-a8a6-d6a2f1edb17f",
        title: "Task Title",
        description: "Task Description",
        dueDate: "2023-08-31 10:53:00",
        priority: "high",
        status: "todo",
        tags: ["tag1"],
      },
      {
        id: "fb0c9449-6b9d-4346-aefd-13a5f2c295ca",
        title: "Task Title",
        description: "Task Description",
        dueDate: "2023-08-31 12:53:00",
        priority: "high",
        status: "todo",
        tags: ["tag2"],
      },
    ];

    const response = buildGetTaskResponse(mockTasks);
    expect(response).toEqual([
      {
        id: "7d3a8669-e8b8-47c5-a8a6-d6a2f1edb17f",
        title: "Task Title",
        description: "Task Description",
        due_date: "2023-08-31 10:53:00",
        priority: "high",
        status: "todo",
        tags: ["tag1"],
      },
      {
        id: "fb0c9449-6b9d-4346-aefd-13a5f2c295ca",
        title: "Task Title",
        description: "Task Description",
        due_date: "2023-08-31 12:53:00",
        priority: "high",
        status: "todo",
        tags: ["tag2"],
      },
    ]);
  });

  it("should handle an empty tasks array", () => {
    const emptyTasks = [];

    const response = buildGetTaskResponse(emptyTasks);
    expect(response).toEqual([]);
  });
});
