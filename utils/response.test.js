const { buildResponse, buildPagination } = require("./response");

describe("buildResponse", () => {
  let mockRes;

  beforeEach(() => {
    mockRes = {
      status: jest.fn(() => mockRes),
      json: jest.fn(),
    };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should build response struct", () => {
    const code = 200;
    const message = "Success";
    const data = { id: 1, name: "Example" };
    const pagination = {
      page: 1,
      size: 10,
      total_data: 35,
      total_page: 4,
    };

    buildResponse(mockRes, code, message, data, pagination);

    expect(mockRes.status).toHaveBeenCalledWith(code);
    expect(mockRes.json).toHaveBeenCalledWith({
      meta: {
        code,
        message,
        pagination,
      },
      data,
    });
  });
});

describe("buildPagination", () => {
  it("should build pagination struct", () => {
    const params = {
      page: 1,
      size: 10,
    };
    const total = 35;
    const pagination = buildPagination(params, total);
    expect(pagination).toEqual({
      page: 1,
      size: 10,
      total_data: 35,
      total_page: 4,
    });
  });
});
