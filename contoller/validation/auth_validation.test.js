const { msg } = require("../../utils");
const { validateRegister, validateLogin } = require("./auth_validation");

describe("validateRegister", () => {
  it("should return empty error", () => {
    const req = {
      name: "dev",
      email: "dev@mail.com",
      password: "dev12345",
    };

    const result = validateRegister(req);
    expect(result).toBe("");
  });

  it("should return error empty name", () => {
    const req = {
      name: "",
      email: "dev@mail.com",
      password: "dev12345",
    };

    const result = validateRegister(req);
    expect(result).toBe(msg.errEmptyName);
  });

  it("should return error empty email", () => {
    const req = {
      name: "dev",
      email: "",
      password: "dev12345",
    };

    const result = validateRegister(req);
    expect(result).toBe(msg.errEmptyEmail);
  });

  it("should return error invalid email", () => {
    const req = {
      name: "dev",
      email: "invalid",
      password: "dev12345",
    };

    const result = validateRegister(req);
    expect(result).toBe(msg.errEmailFormat);
  });

  it("should return error empty password", () => {
    const req = {
      name: "dev",
      email: "dev@mail.com",
      password: "",
    };

    const result = validateRegister(req);
    expect(result).toBe(msg.errEmptyPassword);
  });

  it("should return error short password", () => {
    const req = {
      name: "dev",
      email: "dev@mail.com",
      password: "dev",
    };

    const result = validateRegister(req);
    expect(result).toBe(msg.errShortPassword);
  });
});

describe("validateLogin", () => {
  it("should return empty error", () => {
    const req = {
      email: "dev@mail.com",
      password: "dev12345",
    };

    const result = validateLogin(req);
    expect(result).toBe("");
  });

  it("should return error empty email", () => {
    const req = {
      email: "",
      password: "dev12345",
    };

    const result = validateLogin(req);
    expect(result).toBe(msg.errEmptyEmail);
  });

  it("should return error invalid email", () => {
    const req = {
      email: "invalid",
      password: "dev12345",
    };

    const result = validateLogin(req);
    expect(result).toBe(msg.errEmailFormat);
  });

  it("should return error empty password", () => {
    const req = {
      email: "dev@mail.com",
      password: "",
    };

    const result = validateLogin(req);
    expect(result).toBe(msg.errEmptyPassword);
  });
});
