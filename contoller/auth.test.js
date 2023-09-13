const bcrypt = require("bcrypt");
const {
  getUserByEmailFromDB,
  insertUserToDB,
  insertLogoutLogToDB,
} = require("../repository");
const { validateRegister, validateLogin } = require("./validation");
const { register, login, logout } = require("./auth");

jest.mock("./validation");
jest.mock("../repository");

describe("register", () => {
  const mockUserData = {
    id: "fb0c9449-6b9d-4346-aefd-13a5f2c295ca",
    name: "dev",
    email: "dev@mail.com",
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should return 201 and user created", async () => {
    const id = "fb0c9449-6b9d-4346-aefd-13a5f2c295ca";
    const mockReq = {
      body: {
        name: "dev",
        email: "dev@mail.com",
        password: "dev12345",
      },
    };
    const mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    validateRegister.mockReturnValue(null);
    getUserByEmailFromDB.mockResolvedValue(null);
    insertUserToDB.mockResolvedValue({ id: id, ...mockReq.body });

    bcrypt.hash = jest.fn().mockResolvedValue("encryptedPassword");

    await register(mockReq, mockRes);

    expect(validateRegister).toHaveBeenCalledWith(mockReq.body);
    expect(getUserByEmailFromDB).toHaveBeenCalledWith("dev@mail.com");
    expect(bcrypt.hash).toHaveBeenCalledWith("dev12345", 10);
    expect(insertUserToDB).toHaveBeenCalledWith({
      name: "dev",
      email: "dev@mail.com",
      password: "encryptedPassword",
    });
    expect(mockRes.status).toHaveBeenCalledWith(201);
    expect(mockRes.json).toHaveBeenCalledWith({
      meta: {
        code: 201,
        message: "success",
        pagination: null,
      },
      data: mockUserData,
    });
  });

  it("should return 422 when validation fails", async () => {
    const id = "fb0c9449-6b9d-4346-aefd-13a5f2c295ca";
    const mockReq = {
      body: {
        name: "",
        email: "",
        password: "",
      },
    };
    const mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    validateRegister.mockReturnValue("Validation error message");

    await register(mockReq, mockRes);

    expect(validateRegister).toHaveBeenCalledWith(mockReq.body);
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

  it("should return 422 when email already exists", async () => {
    const id = "fb0c9449-6b9d-4346-aefd-13a5f2c295ca";
    const mockReq = {
      body: {
        name: "dev",
        email: "dev@mail.com",
        password: "dev12345",
      },
    };
    const mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    validateRegister.mockReturnValue(null);
    getUserByEmailFromDB.mockResolvedValue(mockUserData);

    bcrypt.hash = jest.fn().mockResolvedValue("encryptedPassword");

    await register(mockReq, mockRes);

    expect(validateRegister).toHaveBeenCalledWith(mockReq.body);
    expect(getUserByEmailFromDB).toHaveBeenCalledWith("dev@mail.com");
    expect(bcrypt.hash).toHaveBeenCalledWith("dev12345", 10);
    expect(mockRes.status).toHaveBeenCalledWith(422);
    expect(mockRes.json).toHaveBeenCalledWith({
      meta: {
        code: 422,
        message: "email already exists",
        pagination: null,
      },
      data: null,
    });
  });

  it("should return 500 when error occurs during process", async () => {
    const id = "fb0c9449-6b9d-4346-aefd-13a5f2c295ca";
    const mockReq = {
      body: {
        name: "dev",
        email: "dev@mail.com",
        password: "dev12345",
      },
    };
    const mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    validateRegister.mockReturnValue(null);
    getUserByEmailFromDB.mockResolvedValue(null);
    insertUserToDB.mockRejectedValue(new Error("error"));

    bcrypt.hash = jest.fn().mockResolvedValue("encryptedPassword");

    await register(mockReq, mockRes);

    expect(validateRegister).toHaveBeenCalledWith(mockReq.body);
    expect(getUserByEmailFromDB).toHaveBeenCalledWith("dev@mail.com");
    expect(bcrypt.hash).toHaveBeenCalledWith("dev12345", 10);
    expect(insertUserToDB).toHaveBeenCalledWith({
      name: "dev",
      email: "dev@mail.com",
      password: "encryptedPassword",
    });
    expect(mockRes.status).toHaveBeenCalledWith(500);
    expect(mockRes.json).toHaveBeenCalledWith({
      meta: {
        code: 500,
        message: "failed to register",
        pagination: null,
      },
      data: null,
    });
  });
});

describe("login", () => {
  const mockUserData = {
    id: "fb0c9449-6b9d-4346-aefd-13a5f2c295ca",
    name: "dev",
    email: "dev@mail.com",
    password: "encrypted",
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should return 200 and login success", async () => {
    const id = "fb0c9449-6b9d-4346-aefd-13a5f2c295ca";
    const mockReq = {
      body: {
        email: "dev@mail.com",
        password: "dev12345",
      },
    };
    const mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    validateLogin.mockReturnValue(null);
    getUserByEmailFromDB.mockResolvedValue(mockUserData);

    bcrypt.compare = jest.fn().mockResolvedValue(true);

    await login(mockReq, mockRes);

    expect(validateLogin).toHaveBeenCalledWith(mockReq.body);
    expect(getUserByEmailFromDB).toHaveBeenCalledWith("dev@mail.com");
    expect(bcrypt.compare).toHaveBeenCalledWith("dev12345", "encrypted");
    expect(mockRes.status).toHaveBeenCalledWith(200);
  });

  it("should return 422 when validation fails", async () => {
    const mockReq = {
      body: {
        email: "",
        password: "",
      },
    };
    const mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    validateLogin.mockReturnValue("Validation error message");

    await login(mockReq, mockRes);

    expect(validateLogin).toHaveBeenCalledWith(mockReq.body);
    expect(mockRes.status).toHaveBeenCalledWith(422);
  });

  it("should return 404 when email not found", async () => {
    const id = "fb0c9449-6b9d-4346-aefd-13a5f2c295ca";
    const mockReq = {
      body: {
        email: "dev@mail.com",
        password: "dev12345",
      },
    };
    const mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    validateLogin.mockReturnValue(null);
    getUserByEmailFromDB.mockResolvedValue(null);

    await login(mockReq, mockRes);

    expect(validateLogin).toHaveBeenCalledWith(mockReq.body);
    expect(getUserByEmailFromDB).toHaveBeenCalledWith("dev@mail.com");
    expect(mockRes.status).toHaveBeenCalledWith(404);
  });

  it("should return 422 when wrong password", async () => {
    const mockReq = {
      body: {
        email: "dev@mail.com",
        password: "dev12345",
      },
    };
    const mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    validateLogin.mockReturnValue(null);
    getUserByEmailFromDB.mockResolvedValue(mockUserData);

    bcrypt.compare = jest.fn().mockResolvedValue(false);

    await login(mockReq, mockRes);

    expect(validateLogin).toHaveBeenCalledWith(mockReq.body);
    expect(getUserByEmailFromDB).toHaveBeenCalledWith("dev@mail.com");
    expect(bcrypt.compare).toHaveBeenCalledWith("dev12345", "encrypted");
    expect(mockRes.status).toHaveBeenCalledWith(422);
  });

  it("should return 500 when error occurs during process", async () => {
    const id = "fb0c9449-6b9d-4346-aefd-13a5f2c295ca";
    const mockReq = {
      body: {
        email: "dev@mail.com",
        password: "dev12345",
      },
    };
    const mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    validateLogin.mockReturnValue(null);
    getUserByEmailFromDB.mockRejectedValue(new Error("error"));

    await login(mockReq, mockRes);

    expect(validateLogin).toHaveBeenCalledWith(mockReq.body);
    expect(getUserByEmailFromDB).toHaveBeenCalledWith("dev@mail.com");
    expect(mockRes.status).toHaveBeenCalledWith(500);
  });
});

describe("logout", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should return 200 and success logout", async () => {
    const mockAuthIdentifier = "02438385-61ce-4e32-b488-d2dcaaa309c0";
    const mockReq = {
      tokenData: {
        authIdentifier: mockAuthIdentifier,
      },
    };
    const mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await logout(mockReq, mockRes);

    expect(insertLogoutLogToDB).toHaveBeenCalledWith(mockAuthIdentifier);
    expect(mockRes.status).toHaveBeenCalledWith(200);
  });

  it("should return 500 when error occurs during process", async () => {
    const mockAuthIdentifier = "02438385-61ce-4e32-b488-d2dcaaa309c0";
    const mockReq = {
      tokenData: {
        authIdentifier: mockAuthIdentifier,
      },
    };
    const mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    insertLogoutLogToDB.mockRejectedValue(new Error("error"));

    await logout(mockReq, mockRes);

    expect(mockRes.status).toHaveBeenCalledWith(500);
  });
});
