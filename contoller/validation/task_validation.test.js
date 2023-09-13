const { msg } = require("../../utils");
const {
  validateCreateTask,
  validateGetTasks,
  validateGetTaskByID,
  validateUpdateTask,
} = require("./task_validation");

describe("validateCreatetask", () => {
  it("should return empty error", () => {
    const req = {
      body: {
        title: "Valid Title",
        description: "Valid Description",
        due_date: "2023-08-31 23:59:59",
        priority: "high",
        status: "todo",
        tags: ["tag1", "tag2"],
      },
    };
    const result = validateCreateTask(req);
    expect(result).toBe("");
  });

  it("should return error empty title", () => {
    const req = {
      body: {
        description: "Valid Description",
        due_date: "2023-08-31 23:59:59",
        priority: "high",
        status: "todo",
        tags: ["tag1", "tag2"],
      },
    };
    const result = validateCreateTask(req);
    expect(result).toBe(msg.errEmptyTitle);
  });

  it("should return error too long title", () => {
    const req = {
      body: {
        title:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam vestibulum tristique turpis, ut consequat quam ultrices in. Integer hendrerit fringilla magna, at bibendum enim posuere at. Donec dapibus ultrices dictum. Vivamus et metus a risus interdum ullamcorper sed non urna. Quisque venenatis, ligula quis volutpat hendrerit, nisl leo malesuada dolor, nec tincidunt ex justo id odio odio",
        description: "Valid Description",
        due_date: "2023-08-31 23:59:59",
        priority: "high",
        status: "todo",
        tags: ["tag1", "tag2"],
      },
    };
    const result = validateCreateTask(req);
    expect(result).toBe(msg.errLongTitle);
  });

  it("should return error date time format", () => {
    const req = {
      body: {
        title: "Valid Title",
        description: "Valid Description",
        due_date: "2023-31-08 23:59:59",
        priority: "high",
        status: "todo",
        tags: ["tag1", "tag2"],
      },
    };
    const result = validateCreateTask(req);
    expect(result).toBe(msg.errDateTimeFormat);
  });

  it("should return error invalid priority", () => {
    const req = {
      body: {
        title: "Valid Title",
        description: "Valid Description",
        due_date: "2023-08-31 23:59:59",
        priority: "invalid",
        status: "todo",
        tags: ["tag1", "tag2"],
      },
    };
    const result = validateCreateTask(req);
    expect(result).toBe(msg.errInvalidPriority);
  });

  it("should return error invalid status", () => {
    const req = {
      body: {
        title: "Valid Title",
        description: "Valid Description",
        due_date: "2023-08-31 23:59:59",
        priority: "low",
        status: "invalid",
        tags: ["tag1", "tag2"],
      },
    };
    const result = validateCreateTask(req);
    expect(result).toBe(msg.errInvalidStatus);
  });

  it("should return error too long tag", () => {
    const req = {
      body: {
        title: "Valid Title",
        description: "Valid Description",
        due_date: "2023-08-31 23:59:59",
        priority: "low",
        status: "todo",
        tags: [
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam vestibulum tristique turpis, ut consequat quam ultrices in. Integer hendrerit fringilla magna, at bibendum enim posuere at. Donec dapibus ultrices dictum. Vivamus et metus a risus interdum ullamcorper sed non urna. Quisque venenatis, ligula quis volutpat hendrerit, nisl leo malesuada dolor, nec tincidunt ex justo id odio odio",
        ],
      },
    };
    const result = validateCreateTask(req);
    expect(result).toBe(msg.errLongTag);
  });
});

describe("validateGetTasks", () => {
  it("should return empty error", () => {
    const req = {
      query: {
        page: 2,
        size: 5,
        keyword: "task",
        priority: "low",
        status: "todo",
        tags: "tag1",
      },
    };
    const { err } = validateGetTasks(req);
    expect(err).toBe("");
  });

  it("should return error on keyword", () => {
    const req = {
      query: {
        page: 2,
        size: 5,
        keyword: "t",
        priority: "low",
        status: "todo",
        tags: "tag1",
      },
    };
    const { err } = validateGetTasks(req);
    expect(err).toBe(msg.errKeywordLT3);
  });

  it("should return error invalid priority", () => {
    const req = {
      query: {
        page: 2,
        size: 5,
        keyword: "task",
        priority: "invalid",
        status: "todo",
        tags: "tag1",
      },
    };
    const { err } = validateGetTasks(req);
    expect(err).toBe(msg.errInvalidPriority);
  });

  it("should return error invalid status", () => {
    const req = {
      query: {
        page: 2,
        size: 5,
        keyword: "task",
        priority: "low",
        status: "invalid",
        tags: "tag1",
      },
    };
    const { err } = validateGetTasks(req);
    expect(err).toBe(msg.errInvalidStatus);
  });
});

describe("validateGetTaskByID", () => {
  it("should return empty error", () => {
    const id = "fb0c9449-6b9d-4346-aefd-13a5f2c295ca";
    const result = validateGetTaskByID(id);
    expect(result).toBe("");
  });

  it("should return invalid format", () => {
    const id = "invalid";
    const result = validateGetTaskByID(id);
    expect(result).toBe(msg.errInvalidUUIDFormat);
  });
});

describe("validateUpdateTask", () => {
  it("should return empty error", () => {
    const id = "fb0c9449-6b9d-4346-aefd-13a5f2c295ca";
    const req = {
      body: {
        title: "Valid Title",
        description: "Valid Description",
        due_date: "2023-08-31 23:59:59",
        priority: "high",
        status: "todo",
        tags: ["tag1", "tag2"],
      },
    };
    const result = validateUpdateTask(req, id);
    expect(result).toBe("");
  });

  it("should return error invalid id", () => {
    const id = "invalid";
    const req = {
      body: {
        title: "Valid Title",
        description: "Valid Description",
        due_date: "2023-08-31 23:59:59",
        priority: "high",
        status: "todo",
        tags: ["tag1", "tag2"],
      },
    };
    const result = validateUpdateTask(req, id);
    expect(result).toBe(msg.errInvalidUUIDFormat);
  });

  it("should return error empty title", () => {
    const id = "fb0c9449-6b9d-4346-aefd-13a5f2c295ca";
    const req = {
      body: {
        title: "",
        description: "Valid Description",
        due_date: "2023-08-31 23:59:59",
        priority: "high",
        status: "todo",
        tags: ["tag1", "tag2"],
      },
    };
    const result = validateUpdateTask(req, id);
    expect(result).toBe(msg.errEmptyTitle);
  });

  it("should return error too long title", () => {
    const id = "fb0c9449-6b9d-4346-aefd-13a5f2c295ca";
    const req = {
      body: {
        title:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam vestibulum tristique turpis, ut consequat quam ultrices in. Integer hendrerit fringilla magna, at bibendum enim posuere at. Donec dapibus ultrices dictum. Vivamus et metus a risus interdum ullamcorper sed non urna. Quisque venenatis, ligula quis volutpat hendrerit, nisl leo malesuada dolor, nec tincidunt ex justo id odio odio",
        description: "Valid Description",
        due_date: "2023-08-31 23:59:59",
        priority: "high",
        status: "todo",
        tags: ["tag1", "tag2"],
      },
    };
    const result = validateUpdateTask(req, id);
    expect(result).toBe(msg.errLongTitle);
  });

  it("should return error invalid date time format", () => {
    const id = "fb0c9449-6b9d-4346-aefd-13a5f2c295ca";
    const req = {
      body: {
        title: "Valid Title",
        description: "Valid Description",
        due_date: "2023-31-08 23:59:59",
        priority: "high",
        status: "todo",
        tags: ["tag1", "tag2"],
      },
    };
    const result = validateUpdateTask(req, id);
    expect(result).toBe(msg.errDateTimeFormat);
  });

  it("should return error invalid priority", () => {
    const id = "fb0c9449-6b9d-4346-aefd-13a5f2c295ca";
    const req = {
      body: {
        title: "Valid Title",
        description: "Valid Description",
        due_date: "2023-08-31 23:59:59",
        priority: "invalid",
        status: "todo",
        tags: ["tag1", "tag2"],
      },
    };
    const result = validateUpdateTask(req, id);
    expect(result).toBe(msg.errInvalidPriority);
  });

  it("should return error invalid status", () => {
    const id = "fb0c9449-6b9d-4346-aefd-13a5f2c295ca";
    const req = {
      body: {
        title: "Valid Title",
        description: "Valid Description",
        due_date: "2023-08-31 23:59:59",
        priority: "high",
        status: "invalid",
        tags: ["tag1", "tag2"],
      },
    };
    const result = validateUpdateTask(req, id);
    expect(result).toBe(msg.errInvalidStatus);
  });

  it("should return error too long tag", () => {
    const id = "fb0c9449-6b9d-4346-aefd-13a5f2c295ca";
    const req = {
      body: {
        title: "Valid Title",
        description: "Valid Description",
        due_date: "2023-08-31 23:59:59",
        priority: "high",
        status: "todo",
        tags: [
          "tag1",
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam vestibulum tristique turpis, ut consequat quam ultrices in. Integer hendrerit fringilla magna, at bibendum enim posuere at. Donec dapibus ultrices dictum. Vivamus et metus a risus interdum ullamcorper sed non urna. Quisque venenatis, ligula quis volutpat hendrerit, nisl leo malesuada dolor, nec tincidunt ex justo id odio odio",
        ],
      },
    };
    const result = validateUpdateTask(req, id);
    expect(result).toBe(msg.errLongTag);
  });
});
